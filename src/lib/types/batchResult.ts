import { EditStatusRequest } from "./request";

/** Declare new type BatchResult to allow partial success in batch edit/deletes operations
 *
 * Provide content for each success/fail status for better debugging
 */

export enum BatchStatus {
  SUCCEED = "SUCCEED",
  FAILED = "FAILED",
}

export enum BatchError {
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  INVALID_INPUT = "INVALID_INPUT",
}

export type EditedContent = {
  status: BatchStatus;
  body: EditStatusRequest[];
  error?: BatchError;
};

export type DeletedContent = {
  status: BatchStatus;
  body: number[]; // array of ids
  error?: BatchError;
};

export type BatchResult = {
  totalCount: number;
  failedCount: number;
  succeedCount: number;
  content: EditedContent[] | DeletedContent[];
};
