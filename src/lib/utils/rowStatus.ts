import { EditStatusRequest, RequestStatus } from "../types/request";

export const updateRowStatus = (
    prevRowStatus: EditStatusRequest[],
    requestId: number,
    newStatus: RequestStatus,
  ) => {
    const existingIndex = prevRowStatus.findIndex((row) => row.id === requestId);
  
    if (existingIndex !== -1) {
      const updated = [...prevRowStatus];
      updated[existingIndex].status = newStatus;
      return updated;
    } else {
      return [...prevRowStatus, { id: requestId, status: newStatus }];
    }
  };