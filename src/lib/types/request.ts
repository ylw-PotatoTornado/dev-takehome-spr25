export enum RequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  COMPLETED = "completed",
  REJECTED = "rejected",
}

export const RequestStatusLabel =  {
  [RequestStatus.PENDING]: "Pending",
  [RequestStatus.APPROVED]: "Approved",
  [RequestStatus.COMPLETED]: "Completed",
  [RequestStatus.REJECTED]: "Rejected",
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