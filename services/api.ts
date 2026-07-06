const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://mythstreet-backend.onrender.com";

async function request(
  endpoint: string,
  options: RequestInit = {}
) {
  const res = await fetch(
    `${API}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message || "Request failed"
    );
  }

  return json;
}

export const api = {

  get(endpoint: string) {
    return request(endpoint);
  },

  post(
    endpoint: string,
    body: any
  ) {
    return request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  put(
    endpoint: string,
    body: any
  ) {
    return request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  patch(
    endpoint: string,
    body: any
  ) {
    return request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  delete(endpoint: string) {
    return request(endpoint, {
      method: "DELETE",
    });
  },

};