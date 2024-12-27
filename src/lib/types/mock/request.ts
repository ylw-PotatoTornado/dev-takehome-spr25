export enum MockRequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  COMPLETED = "completed",
  REJECTED = "rejected",
}

export interface MockItemRequest {
  id: number;
  requestorName: string;
  itemRequested: string;
  requestCreatedDate: Date;
  lastEditedDate: Date | null;
  status: MockRequestStatus;
}

export interface MockCreateItemRequest {
  requestorName: string;
  itemRequested: string;
}
