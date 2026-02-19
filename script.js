export class Request {
  constructor({ baseUrl, headers = {} }) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = headers;
  }

  get(endpoint, config = {}) {
    return this._fetch(endpoint, {
      method: 'GET',
      ...config
    });
  }

  post(endpoint, data, config = {}) {
    return this._fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...config
    });
  }


  put(endpoint, data, config = {}) {
    return this._fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...config
    });
  }

  patch(endpoint, data, config = {}) {
    return this._fetch(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...config
    });
  }

  
  delete(endpoint, config = {}) {
    return this._fetch(endpoint, {
      method: 'DELETE',
      ...config
    });
  }

  async _fetch(endpoint, config) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: config.method,
        headers: {
          'Content-Type': 'application/json',
          ...this.defaultHeaders,
          ...config.headers
        },
        body: config.body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.status === 204 ? null : await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
}
