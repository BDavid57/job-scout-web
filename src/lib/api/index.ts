import type { Job } from "../../features";

const BASE_URL = import.meta.env.VITE_JOBDATA_BASE_URL;

// Generic request helper
const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
};

// API methods
export const jobApi = {
  getPostedJobs: async (params: {
    region: number;
    title: string;
    published: string;
  }): Promise<Job[]> => {
    const { region, title, published } = params;

    const url = `${BASE_URL}/jobs?has_remote=true&language=en&region_id=${region}&title=${encodeURIComponent(
      title
    )}&max_age=${published}`;

    const data = await request<{ results: Job[] }>(url);

    return data.results || [];
  },

  getSavedJobs: async (): Promise<Job[]> => {
    const url = `${BASE_URL}/jobs/saved`;

    const data = await request<{ results: Job[] }>(url);

    return data.results || [];
  },

  saveJob: async (body: Job): Promise<Job> => {
    return request<Job>(`${BASE_URL}/jobs`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  deleteJob: async (id: number) => {
    await request<string>(`${BASE_URL}/jobs/${id}`, {
      method: "DELETE",
    });

    Promise.resolve()
  },
};
