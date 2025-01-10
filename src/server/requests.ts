import { connectDB } from "@/server/db/config.js";
import Request from "@/server/db/models/request";

import { RequestStatus, ItemRequest, EditStatusRequest } from "@/lib/types/request";
import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";
import paginate from "@/lib/utils/pagination";
import { generateId, sortItemRequests } from "@/lib/utils/requests";

import {
  isValidId,
    isValidStatus,
    validateCreateItemRequest,
    validateEditStatusRequest,
  } from "@/lib/validation/requests";
import { InvalidInputError, InvalidPaginationError } from "@/lib/errors/inputExceptions";
import { BatchError, BatchStatus, EditedContent, DeletedContent, BatchResult } from "@/lib/types/batchResult";

/** Modification based on @server/mock/requests.ts, mainly on
 * 
 *  1- modify: All function - enable async functions & change return type = Promise<T> 
 *  2- modify: All function - validation before DB connection
 *  3- modify: getItemRequests - filter before sorting to improve query performance
 *  4- modify: function editStatusRequest() => batch edit enabled, return type BatchResult<EditStatusRequest>
 *  5- new   : function deleteRequest() => batch delete
 * 
 */


export async function getItemRequests(
    status: string | null,
    page: number
): Promise<ItemRequest[]> {

        if (status && !isValidStatus(status)) {
            throw new InvalidInputError("status value");
        }

        if (page < 1 || PAGINATION_PAGE_SIZE < 1) {
            throw new InvalidPaginationError(page, PAGINATION_PAGE_SIZE);
        }

        await connectDB();

        const query: any = {};
        if (status && isValidStatus(status)) {
            query.status = status;
        }

        // Filter before sorting to improve performance;
        const filteredRequests = await Request.find(query);
        const sortedRequests = sortItemRequests(filteredRequests);
        const paginatedRequests = paginate(
            sortedRequests, 
            page, 
            PAGINATION_PAGE_SIZE
            ).data;

        return paginatedRequests;

}


export async function createNewRequest(request: any): Promise<ItemRequest> {     
    const validatedRequest = validateCreateItemRequest(request);
    if (!validatedRequest) {
      throw new InvalidInputError("created item request");
    }

    await connectDB();

    // Fetch all existing requests in DB, for generating id;
    const itemRequests = await Request.find({});
    const date = new Date();

    // Create new entry
    const newRequest = new Request({
      id: generateId(itemRequests),
      requestorName: validatedRequest.requestorName,
      itemRequested: validatedRequest.itemRequested,
      requestCreatedDate: date,
      lastEditedDate: date,
      status: RequestStatus.PENDING,
    });

    // Save new record to DB;
    const savedRequest = await newRequest.save();
    return savedRequest;
  }


  export async function editStatusRequest(request: any): Promise<BatchResult> {

    // Validate request body format 
    if (!request.updates || !Array.isArray(request.updates)) {
      throw new InvalidInputError("request body format");
    }


    // Implement edit operation for each edit request inside array 
    const editRequests:EditStatusRequest[] = request.updates

    const failedRequests: EditedContent = {
      status: BatchStatus.FAILED,
      body: [],
      error: BatchError.INVALID_INPUT,
    }
    const succeedRequests: EditedContent = {
      status: BatchStatus.SUCCEED,
      body: [],
    }
    const totalCount = editRequests.length;
    let failedCount = 0;
    let succeedCount = 0;

    await connectDB();

    // Loop thourgh requests in {id , status} format 
    for (const request of editRequests) {

      // Validate request input, if failed, update failed result object
      const validatedRequest = validateEditStatusRequest(request);
      if (!validatedRequest) {
        failedCount += 1;
        failedRequests.body.push(request);
        continue;
      }
  
      // Find request is, if not found, update failed result object 
      const editedItemRequest = await Request.findOne({id: request.id});
      if (!editedItemRequest) {
        failedCount += 1;
        failedRequests.body.push(request);
        continue;
      }

      // Modify found record and update success result object 
      editedItemRequest.status = validatedRequest.status;
      editedItemRequest.lastEditedDate = new Date();
      succeedCount += 1;
      succeedRequests.body.push(request);

    }

    // Construct returned object 
    const batchEditResult: BatchResult = {
      totalCount: totalCount,
      failedCount: failedCount,
      succeedCount: succeedCount,
      content: [failedRequests, succeedRequests],
    }

    return batchEditResult;



  }


  export async function deleteRequest(request: any) : Promise<BatchResult> {
    if (!request.ids || !Array.isArray(request.ids)) {
      throw new InvalidInputError("request body format");
    }

    // Implement delete operation for each id inside array 
    const deleteIDs: number[] = request.ids;

    const failedRequests: DeletedContent = {
      status: BatchStatus.FAILED,
      body: [],
      error: BatchError.INVALID_INPUT,
    }
    const succeedRequests: DeletedContent = {
      status: BatchStatus.SUCCEED,
      body: [],
    }
    const totalCount = deleteIDs.length;
    let failedCount = 0;
    let succeedCount = 0;
    for (const id of deleteIDs) {
      if (!isValidId(id)) {
        failedCount += 1;
        failedRequests.body.push(id);
        continue;
      }

      // Find request id, if not found, update failed result object 
      const deletedItemRequest = await Request.findByIdAndDelete(id);
      if (!deletedItemRequest) {
        failedCount += 1;
        failedRequests.body.push(id);
        
      } else {
        succeedCount += 1;
        succeedRequests.body.push(id);
      }


    }

    // Construct returned object 
    const batchDeleteResult: BatchResult = {
      totalCount: totalCount,
      failedCount: failedCount,
      succeedCount: succeedCount,
      content: [failedRequests, succeedRequests],
    }

    return batchDeleteResult;

  }