import { ResponseType } from "@/lib/constants/apiResponses";
import { createNewMockRequest, getMockRequests } from "@/server/mock/requests";
import { ServerResponseBuilder } from "@/server/serverResponseBuilder";

export async function GET() {
  try {
    const sortedRequests = getMockRequests();
    return new Response(JSON.stringify(sortedRequests), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return ServerResponseBuilder(ResponseType.UNKNOWN_ERROR);
  }
}

export async function POST(request: Request) {
  try {
    const req = await request.json();
    try {
      const newRequest = createNewMockRequest(req);
      return new Response(JSON.stringify(newRequest), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      return ServerResponseBuilder(ResponseType.INVALID_INPUT);
    }
  } catch (e) {
    return ServerResponseBuilder(ResponseType.UNKNOWN_ERROR);
  }
}
