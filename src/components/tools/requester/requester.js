export class FetchClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {};
  }

  setDefaultHeader(headerName, headerValue) {
    this.defaultHeaders[headerName] = headerValue;
  }

  async get(url, options = {}) {
    return await this._request(url, {
      ...options,
      method: "GET",
    });
  }

  async post(url, data = {}, options = {}) {
    return await this._request(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  }

  async patch(url, data = {}, options = {}) {
    return await this._request(url, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  }

  async put(url, data = {}, options = {}) {
    return await this._request(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  }

  async delete(url, options = {}) {
    return await this._request(url, {
      ...options,
      method: "DELETE",
    });
  }

  async _request(url, options = {}) {
    const headers = {
      ...this.defaultHeaders,
      ...options.headers,
    };
    const response = await fetch(this.baseURL + url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw {
        message: response.statusText,
        response: response,
        status: response.status,
      };
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const responseData = await response.json();
      return { data: responseData, status: response.status };
    } else {
      return { data: await response.text(), status: response.status };
    }
  }
}

export const fetchClient = new FetchClient(process.env.NEXT_PUBLIC_URL_API);
