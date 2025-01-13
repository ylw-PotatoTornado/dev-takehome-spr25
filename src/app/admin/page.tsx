"use client";

import Dropdown from "@/components/atoms/Dropdown";
import Pagination from "@/components/molecules/Pagination";
import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";
import {
  EditStatusRequest,
  ItemRequest,
  RequestStatus,
} from "@/lib/types/request";
import { useEffect, useState } from "react";
import { TableTab } from "@/components/tables/TableTab";
import { TableHeader } from "@/components/tables/TableHeader";
import { TableRowHeader } from "@/components/tables/TableRowHeader";
import {
  dropdownOptions,
  rowHeaders,
  tabOptions,
  tableHeader,
} from "@/lib/constants/options";
import { getItemRequests, updateItemRequests } from "@/lib/api/request";
import { dateFormatter } from "@/lib/utils/dateFormatter";
import { updateRowStatus } from "@/lib/utils/rowStatus";

export default function ItemRequestsPage() {
  /** state hooks */
  const [paginatedRequests, setPaginatedRequests] = useState<ItemRequest[]>([]);
  const [rowStatus, setRowStatus] = useState<EditStatusRequest[]>([]);
  const [updateStatusRequests, setUpdateStatusRequests] = useState<
    EditStatusRequest[]
  >([]);

  const [totalRecords, setTotalRecords] = useState(0);

  const [filter, setFilter] = useState<{
    status: RequestStatus | null, page : number
  }>({
    status: null,
    page: 1
  })


  /** handlers */
  const handleDropdownChange = async (
    requestId: number,
    newStatus: RequestStatus,
  ) => {
    try {
      const localUpdateStatusRequests: EditStatusRequest[] = updateRowStatus(
        updateStatusRequests,
        requestId,
        newStatus,
      );
      setUpdateStatusRequests(localUpdateStatusRequests);

      await updateItemRequests(localUpdateStatusRequests);

      const localRowStatus: EditStatusRequest[] = updateRowStatus(
        rowStatus,
        requestId,
        newStatus,
      );
      setRowStatus(localRowStatus);

      console.log("Successfully updated statuses.");
      setUpdateStatusRequests([]);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching data:", error.message);
        throw error;
      }
    }
  };



  const handleTabChange = (newStatus: RequestStatus | null) => {
    setFilter((prevFilter) => {
      if (prevFilter.status === newStatus) {
        return prevFilter;
      }

      return {
        status: newStatus,
        page: 1
      }
    })
  };


  const handlePageChange = (newPage: number) => {

    setFilter((prevFilter) => {
      return {
        status: prevFilter.status,
        page: newPage
      }
    })
  };



  const handleTabOrPageChange = async (
    status: string | null,
    page: number,
  ) => {
    try {
      const fetchedItemRequests = await getItemRequests(
        status,
        page.toString(),
      );

      const initialPaginatedRequests = fetchedItemRequests.data.map(
        (request: {
          id: number;
          requestorName: string;
          itemRequested: string;
          requestCreatedDate: Date;
          lastEditedDate: Date;
          status: RequestStatus;
        }) => ({
          id: request.id,
          requestorName: request.requestorName,
          itemRequested: request.itemRequested,
          requestCreatedDate: new Date(request.requestCreatedDate),
          lastEditedDate: new Date(request.lastEditedDate),
          status: request.status,
        }),
      );

      const initialRowStatus = fetchedItemRequests.data.map(
        (request: EditStatusRequest) => ({
          id: request.id,
          status: request.status,
        }),
      );
      setRowStatus(initialRowStatus);
      setPaginatedRequests(initialPaginatedRequests);
      setTotalRecords(fetchedItemRequests.totalRecords);
    } catch (error) {
      console.error("Failed to fetch item requests:", error);
    }
  };

  useEffect(() => {
    handleTabOrPageChange(filter.status, filter.page);
  }, [filter]);


  return (
    <div className="flex justify-center items-center h-screen overflow-x-auto">
      <div className="w-full max-w-[1205px] rounded-[8px] border-[1px] border-[#EAECF0]">
        <TableHeader text={tableHeader} />

        <TableTab
          options={tabOptions}
          selected={filter.status}
          onChange={(newSelectedTabStatus) =>
            handleTabChange(newSelectedTabStatus)
          }
        />        

        <table className="w-full max-w-[1205px] border-collapse">
          <thead>
            <TableRowHeader headers={rowHeaders} />
          </thead>

          <tbody>
            {paginatedRequests.map((request, index) => (
              <tr
                className="h-[20px] border-b border-[#EAECF0] font-normal font-Inter text-sm text-[#667085] leading-[20px]"
                key={request.id}
              >
                <td className="w-auto  pt-[12px] pb-[12px] pl-[24px] pr-[24px] gap-[12px]">
                  {request.requestorName}
                </td>

                <td className="w-[353px]  pt-[12px] pb-[12px] pl-[24px] pr-[24px] gap-[12px]">
                  {request.itemRequested}
                </td>

                <td className="w-[200px]  pt-[12px] pb-[12px] pl-[24px] pr-[24px] gap-[12px]">
                  {request.requestCreatedDate.toLocaleDateString(
                    "en-US",
                    dateFormatter,
                  ) || ""}
                </td>

                <td className="w-[200px]  pt-[12px] pb-[12px] pl-[24px] pr-[24px] gap-[12px]">
                  {request.lastEditedDate?.toLocaleDateString(
                    "en-US",
                    dateFormatter,
                  ) || ""}
                </td>

                <td className="w-[190px]  pt-[12px] pb-[12px] pl-[24px] pr-[24px] gap-[12px] relative">
                  <Dropdown
                    options={dropdownOptions}
                    selected={rowStatus[index].status}
                    onChange={(newStatus) =>
                      handleDropdownChange(request.id, newStatus)
                    }
                  ></Dropdown>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="w-full">
              <td className="w-full" colSpan={100}>
                <div className="flex items-center justify-between p-4">
                  <div className="rectangle"></div>
                  <div className="pagination">
                    <Pagination
                      pageNumber={filter.page}
                      pageSize={PAGINATION_PAGE_SIZE}
                      totalRecords={totalRecords}
                      onPageChange={(newPage) => handlePageChange(newPage)}
                    />                    
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
