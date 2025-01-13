import { API_PATHS, APP_PATHS } from "../constants/paths";
import { EditStatusRequest } from "../types/request";

export const getItemRequests = async (
  status: string | null = null,
  page: string,
) => {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}${APP_PATHS.REAL_API_PREFIX}${API_PATHS.REQUESTS}`,
    );
    url.searchParams.append("page", page);
    if (status) {
      url.searchParams.append("status", status);
    }
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error fetching item requests ${res.status}`);
    }

    const paginatedRequests = await res.json();
    return paginatedRequests;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching data:", error.message);
      throw error;
    }
  }
};

export const updateItemRequests = async (
  updateStatusRequests: EditStatusRequest[],
) => {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}${APP_PATHS.REAL_API_PREFIX}${API_PATHS.REQUESTS}`,
    );

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updates: updateStatusRequests }),
    });
    if (!res.ok) {
      throw new Error(`Error updating statuses: ${res.status}`);
    }

    const updatedItemRequests = await res.json();
    return updatedItemRequests;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating data:", error.message);
      throw error;
    }
  }
};
