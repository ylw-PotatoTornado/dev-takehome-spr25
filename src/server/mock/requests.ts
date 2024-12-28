import mockItemRequests from "@/app/api/mock/data";
import { InvalidInputError } from "@/lib/errors/inputExceptions";
import { MockItemRequest } from "@/lib/types/mock/request";
import { RequestStatus } from "@/lib/types/request";
import { generateMockId } from "@/lib/utils/mock/requests";
import { validateMockCreateItemRequest } from "@/lib/validation/mock/requests";

export function createNewMockRequest(request: any): MockItemRequest {
  const validatedRequest = validateMockCreateItemRequest(request);

  if (!validatedRequest) {
    throw new InvalidInputError("created item request");
  }

  const date = new Date();

  const newRequest: MockItemRequest = {
    id: generateMockId(mockItemRequests),
    requestorName: validatedRequest.requestorName,
    itemRequested: validatedRequest.itemRequested,
    requestCreatedDate: date,
    lastEditedDate: date,
    status: RequestStatus.PENDING,
  };

  mockItemRequests.push(newRequest);

  return newRequest;
}
