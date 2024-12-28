import { ResponseType } from "@/lib/types/response";
import {
  isValidMockId,
  isValidMockStatus,
} from "@/lib/validation/mock/requests";
import { createNewMockRequest } from "@/server/mock/requests";
import { ServerResponseBuilder } from "@/lib/builders/serverResponseBuilder";
import paginate from "@/lib/utils/pagination";
import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";
import { InputException } from "@/lib/errors/inputExceptions";
import { sortMockItemRequests } from "@/lib/utils/mock/requests";
import mockItemRequests from "../data";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const page = parseInt(url.searchParams.get("page") || "1");
  try {
    const sortedRequests = sortMockItemRequests(mockItemRequests);
    let filteredRequests = sortedRequests;
    if (status && isValidMockStatus(status)) {
      filteredRequests = filteredRequests.filter(
        (req) => req.status === status
      );
    }
    const paginatedRequests = paginate(
      filteredRequests,
      page,
      PAGINATION_PAGE_SIZE
    ).data;
    return new Response(JSON.stringify(paginatedRequests), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    if (e instanceof InputException) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
  }
}

export async function PUT(request: Request) {
  try {
    const req = await request.json();
    const newRequest = createNewMockRequest(req);
    return new Response(JSON.stringify(newRequest), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    if (e instanceof InputException) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
  }
}

export async function PATCH(request: Request) {
  try {
    const req = await request.json();
    const { id, status } = req;
    if (!isValidMockId(id) || !isValidMockStatus(status)) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }
    const itemRequest = mockItemRequests.find((req) => req.id === id);
    if (!itemRequest) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }
    itemRequest.status = status;
    itemRequest.lastEditedDate = new Date();
    return new Response(JSON.stringify(itemRequest), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
  }
}
