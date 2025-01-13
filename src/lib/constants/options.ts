import { DropdownOption } from "@/components/atoms/Dropdown";
import { RequestStatus, RequestStatusLabel } from "../types/request";

export const tableHeader = "Item Requests";

export const rowHeaders = ["Name", "Item Requested", "Created", "Updated", "Status"];

export const dropdownOptions: DropdownOption[] = [
    {
      label: RequestStatusLabel[RequestStatus.PENDING],
      value: RequestStatus.PENDING,
      backgroundColor: "#FFDAC3",
      textColor: "#A43E00",
      dotColor: "#FD8033",
    },
    {
      label: RequestStatusLabel[RequestStatus.APPROVED],
      value: RequestStatus.APPROVED,
      backgroundColor: "#FFEBC8",
      textColor: "#7B5F2E",
      dotColor: "#FFBE4C",
    },
    {
      label: RequestStatusLabel[RequestStatus.COMPLETED],
      value: RequestStatus.COMPLETED,
      backgroundColor: "#ECFDF3",
      textColor: "#037847",
      dotColor: "#14BA6D",
    },
    {
      label: RequestStatusLabel[RequestStatus.REJECTED],
      value: RequestStatus.REJECTED,
      backgroundColor: "#FFD2D2",
      textColor: "#8D0402",
      dotColor: "#D40400",
    },
  ];

export const tabOptions = [{ label: "ALL", value: null }, ...dropdownOptions];