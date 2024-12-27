import { RESPONSES, ResponseType } from "@/lib/constants/apiResponses";

export function ServerResponseBuilder(responseType: ResponseType) {
  const responseDetails = RESPONSES[responseType];
  return new Response(responseDetails.message, {
    status: responseDetails.code,
  });
}
