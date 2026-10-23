// REST API client for SmartClass Dev

export const api = {
  async get(endpoint: string) {
    try {
      const res = await fetch(endpoint);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(errorData.message || `Request failed with status ${res.status}`);
      }
      return await res.json();
    } catch (err: any) {
      console.warn(`API GET ${endpoint} error:`, err.message);
      throw err;
    }
  },

  async post(endpoint: string, body: any) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || `Request failed with status ${res.status}`);
      }
      return data;
    } catch (err: any) {
      console.warn(`API POST ${endpoint} error:`, err.message);
      throw err;
    }
  },

  async put(endpoint: string, body: any) {
    try {
      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || `Request failed with status ${res.status}`);
      }
      return data;
    } catch (err: any) {
      console.warn(`API PUT ${endpoint} error:`, err.message);
      throw err;
    }
  }
};
