import { MockCreateItemRequest } from "@/lib/types/mock/request";

function validateMockString(str: any, lower?: number, upper?: number): boolean {
  if (typeof str !== "string" || str.trim() == "") {
    return false;
  }
  if ((lower && str.length < lower) || (upper && str.length > upper)) {
    return false;
  }
  return true;
}

function validateMockName(name: string): boolean {
  return validateMockString(name, 3, 30);
}

function validateMockItemRequested(item: string): boolean {
  return validateMockString(item, 2, 100);
}

export function validateMockCreateItemRequest(
  request: any
): MockCreateItemRequest | null {
  if (!request.requestorName || !request.itemRequested) {
    return null;
  }
  if (
    !validateMockName(request.requestorName) ||
    !validateMockItemRequested(request.itemRequested)
  ) {
    return null;
  }
  const newCreateItemRequest: MockCreateItemRequest = {
    requestorName: request.requestorName,
    itemRequested: request.itemRequested,
  };
  return newCreateItemRequest;
}
