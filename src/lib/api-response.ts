const url = process.env.API_URL || "http://localhost:3000/api";

const get = async <T>(endpoint: string) => {
  const response = await fetch(`${url}/${endpoint}`);
  return response.json() as Promise<T>;
};

const post = async <T>(endpoint: string, data: T) => {
  const response = await fetch(`${url}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const put = async <T>(endpoint: string, data: T) => {
  const response = await fetch(`${url}/${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const del = async (endpoint: string) => {
  const response = await fetch(`${url}/${endpoint}`, {
    method: "DELETE",
  });
  return response.json();
};

export const api = {
  get,
  post,
  put,
  del,
};
