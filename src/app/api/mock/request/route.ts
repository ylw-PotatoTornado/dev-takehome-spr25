import {
  createNewRequest,
  deleteRequest,
  editStatusRequest,
  getItemRequests,
} from "@/server/requests";

import { handleError } from "@/lib/utils/handleError";

/** Modification based on @app/api/mock/requests/route.ts, mainly on
 * 
 *  1- modify: Create util function handleError(e), replacing if-else statement 
 *  2- modify: Response return status - PATCH (edits) - if all success, code = success, otherwise (partial fail / all fail), code = fail
 *  3- new   : Route for DELETE request - DELETE - same logic to batch edit 
 * 
 */

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const page = parseInt(url.searchParams.get("page") || "1");
  try {
    const paginatedRequests = await getItemRequests(status, page);
    return new Response(JSON.stringify(paginatedRequests), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    handleError(e);
  }
}

export async function PUT(request: Request) {
  try {
    const req = await request.json();
    const newRequest = await createNewRequest(req);
    return new Response(JSON.stringify(newRequest), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    handleError(e);
  }
}


export async function PATCH(request: Request) {
  try {
    const req = await request.json();
    const editedRequest = await editStatusRequest(req);

    // All succeed, return success status code 
    if (editedRequest.failedCount == 0 ) {
      return new Response(JSON.stringify(editedRequest), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } 

    // Otherwise (all failed / partial failed), return failed status code, with reuslt for debugging
    else {
      return new Response(JSON.stringify(editedRequest), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

  } catch (e) {
    handleError(e);
  }
}


export async function DELETE(request: Request) {
  try {
    const req = await request.json();
    const deletedRequest = await deleteRequest(req);

    // All succeed, return success status code 
    if (deletedRequest.failedCount == 0 ) {
      return new Response(JSON.stringify(deletedRequest), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } 

    // Otherwise (all failed / partial failed), return failed status code, with reuslt for debugging
    else {
      return new Response(JSON.stringify(deletedRequest), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

  } catch (e) {
    handleError(e);
  }
}