export enum RequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  COMPLETED = "completed",
  REJECTED = "rejected",
}

// Declare major request type involved in CRUD operation
export interface ItemRequest {
  id: number;
  requestorName: string;
  itemRequested: string;
  requestCreatedDate: Date;
  lastEditedDate: Date | null;
  status: RequestStatus;
}

export interface CreateItemRequest {
  requestorName: string;
  itemRequested: string;
}

export interface EditStatusRequest {
  id: number;
  status: RequestStatus;
}

export interface DeleteRequests {
  ids: number[];
}