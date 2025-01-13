"use client";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { LeftArrowIcon } from "@/components/icons/LeftArrowIcon";
import Dropdown, { DropdownOption, DropdownProps } from "@/components/atoms/Dropdown";
import Pagination from "@/components/molecules/Pagination";
import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";
import { API_PATHS, APP_PATHS } from "@/lib/constants/paths";
import { EditStatusRequest, ItemRequest, RequestStatus, RequestStatusLabel } from "@/lib/types/request";
import { useEffect, useState } from "react";
import { TableTab } from "@/components/tables/TableTab";
import { TableHeader } from "@/components/tables/TableHeader";
import { TableRowHeader } from "@/components/tables/TableRowHeader";


export default function ItemRequestsPage() {

    const [paginatedRequests, setPaginatedRequests] = useState<ItemRequest[]>([]);
    const [rowStatus, setRowStatus] = useState<EditStatusRequest[]>([]);
    const [updateStatusRequests, setUpdateStatusRequests] = useState<EditStatusRequest[]>([]);
    const [selectedTabStatus, setSelectedTabStatus] = useState<RequestStatus |null>(null);
    const [pageNumber, setPageNumber] = useState(1);

    const dropdownOptions:DropdownOption[] = [
        {label: RequestStatusLabel[RequestStatus.PENDING], value: RequestStatus.PENDING},
        {label: RequestStatusLabel[RequestStatus.APPROVED], value: RequestStatus.APPROVED},
        {label: RequestStatusLabel[RequestStatus.COMPLETED], value: RequestStatus.COMPLETED},
        {label: RequestStatusLabel[RequestStatus.REJECTED], value: RequestStatus.REJECTED},
    ];

    const tabOptions = [{label: "ALL", value: null}, ...dropdownOptions];

  
    const handleDropdownChange = async (requestId: number, newStatus: any) => {
        try {

            let localUpdateStatusRequests: EditStatusRequest[] = [];

            setUpdateStatusRequests((prevUpdates) => {
                const existingUpdateIndex = prevUpdates.findIndex((update) => update.id === requestId);
        
                if (existingUpdateIndex !== -1) {
                    const updatedUpdates = [...prevUpdates];
                    updatedUpdates[existingUpdateIndex].status = newStatus;
                    localUpdateStatusRequests = updatedUpdates;
                    return updatedUpdates;
                } else {
                    localUpdateStatusRequests = [...prevUpdates, {id: requestId, status: newStatus}];
                    return localUpdateStatusRequests
                }
            })
            
            const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}${APP_PATHS.REAL_API_PREFIX}${API_PATHS.REQUESTS}`);

            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({updates:localUpdateStatusRequests}),
            });
            if (!response.ok) {
                throw new Error (`Error updating statuses: ${response.status}`);
            }
    
            setRowStatus((prevRowStatus) => {
                const existingUpdateIndex = prevRowStatus.findIndex((row) => row.id === requestId);
        
                if (existingUpdateIndex !== -1) {
                    const updatedRowStatus = [...prevRowStatus];
                    updatedRowStatus[existingUpdateIndex].status = newStatus;
                    return updatedRowStatus;
                } else {
                    return [...prevRowStatus, {id: requestId, status: newStatus}];
                }
            
            });
    
            console.log("Successfully updated statuses.");

            setUpdateStatusRequests([]);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error fetching data:", error.message);
                throw error;
            }
        }

    };

    const getItemRequests = async (status:string|null = null, page: string) => {
        try {
            const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}${APP_PATHS.REAL_API_PREFIX}${API_PATHS.REQUESTS}`);
            url.searchParams.append("page",page);
            if (status) {
                url.searchParams.append("status",status);
            }
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error (`Error fetching item requests ${res.status}`);
            }

            const data = await res.json();
            return data;
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error fetching data:", error.message);
                throw error;
            }
        }
    }

    const fetchAndSetItemRequests = async(selectedTabStatus: string|null, pageNumber: string) => {
        try {
            const fetchedItemRequests = await getItemRequests(selectedTabStatus, pageNumber.toString());


            const initialPaginatedRequests = fetchedItemRequests.map((request) => ({
                id: request.id,
                requestorName: request.requestorName,
                itemRequested: request.itemRequested,
                requestCreatedDate: new Date(request.requestCreatedDate),
                lastEditedDate: new Date(request.lastEditedDate),
                status: request.status,

            }))

            const initialRowStatus = fetchedItemRequests.map((request) => ({
                    id: request.id,
                    status: request.status,
                }));
            setRowStatus(initialRowStatus);
            setPaginatedRequests(initialPaginatedRequests);
        } catch (error) {
            console.error("Failed to fetch item requests:", error);
        }

    }

    useEffect(() => {
        fetchAndSetItemRequests(selectedTabStatus, pageNumber.toString())
    },[selectedTabStatus, pageNumber]);
    
    useEffect(() => {
        console.log("Updates state changed:", updateStatusRequests);
      }, [updateStatusRequests]);
    
      const rowHeaders = ["Name","Item Requested","Created","Updated","Status"];
    const dateFormatter: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };

    return (
            // <div className="w-full">
                <div className="absolute top-[100px] left-[100px] rounded-[8px] border-[1px] border-[#EAECF0] ">

                    <TableHeader text="Item Requests"/>

                    <TableTab
                        options={tabOptions}
                        selected={selectedTabStatus}
                        onChange={(e) => setSelectedTabStatus(e)}
                    />

                    <table className="w-full">
                            <TableRowHeader
                                headers={rowHeaders}
                            />

                            <tbody>
                            {paginatedRequests.map((request, index) => {
                                return (
                                    <tr 
                                        className="h-[20px] border-b border-[#EAECF0]"
                                        key = {request.id}
                                    >
                                        <td className="w-auto  pt-[12px] pb-[12px] pl-[24px] pr-[24px]" >{request.requestorName}</td>
                                        <td className="w-auto  pt-[12px] pb-[12px] pl-[24px] pr-[24px]">{request.itemRequested}</td>
                                        <td className="w-auto  pt-[12px] pb-[12px] pl-[24px] pr-[24px]">{request.requestCreatedDate.toLocaleDateString("en-US", dateFormatter) || ""}</td>
                                        <td className="w-auto  pt-[12px] pb-[12px] pl-[24px] pr-[24px]">{request.lastEditedDate?.toLocaleDateString("en-US", dateFormatter) || ""}</td>
                                        <td className="w-auto  pt-[12px] pb-[12px] pl-[24px] pr-[24px]"><Dropdown
                                            options={dropdownOptions}
                                            selected={rowStatus[index].status}
                                            onChange={(newStatus) => handleDropdownChange(request.id, newStatus)}
                                        ></Dropdown>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>

                    </table>

                    <footer className="flex items-center justify-between w-full border-t border-gray-300 p-4">

                            <div className="rectangle w-[1013px] h-[27px]"></div>

                            <div className="pagination w-[158px] h-[32px]">
                                <Pagination
                                    pageNumber={pageNumber}
                                    pageSize={PAGINATION_PAGE_SIZE}
                                    totalRecords={PAGINATION_PAGE_SIZE}
                                    onPageChange={(e) => {}}
                                />
                            </div>

                    </footer>    

                </div>
            // </div>
            
    )





}