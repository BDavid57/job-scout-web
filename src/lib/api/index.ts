import type { Job } from "../../features";

export const saveJob = async (body: Job) => {
  const BASE_URL = import.meta.env.VITE_JOBDATA_BASE_URL;

  try {
    return await post(BASE_URL, body);
  } catch (e) {
    console.error('Failed to save job', e);
    throw e;
  }
}

const post = async <T>(url: string, data: unknown): Promise<T> => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
};
