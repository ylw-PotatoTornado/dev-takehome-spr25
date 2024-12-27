import mockItemRequests from "@/app/api/mock/data";
import { InvalidInputError } from "@/lib/errors/userExceptions";
import { MockItemRequest, MockRequestStatus } from "@/lib/types/mock/request";
import {
  generateMockId,
  sortMockItemRequests,
} from "@/lib/utils/mock/requests";
import { validateMockCreateItemRequest } from "@/lib/validation/mock/requests";

export function getMockRequests(): MockItemRequest[] {
  return sortMockItemRequests(mockItemRequests);
}

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
    status: MockRequestStatus.PENDING,
  };

  mockItemRequests.push(newRequest);

  return newRequest;
}
