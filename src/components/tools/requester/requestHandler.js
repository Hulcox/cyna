import { fetchClient } from "./requester";

export class request {
  constructor() {
    this.get = async function (url, options) {
      try {
        return await fetchClient.get(url, options);
      } catch (error) {
        throw error; // Propager l'erreur à la méthode appelante
      }
    };
    this.post = async function (url, data, options) {
      try {
        return await fetchClient.post(url, data, options);
      } catch (error) {
        throw error; // Propager l'erreur à la méthode appelante
      }
    };
    this.patch = async function (url, data, options) {
      try {
        return await fetchClient.patch(url, data, options);
      } catch (error) {
        throw error; // Propager l'erreur à la méthode appelante
      }
    };
    this.put = async function (url, data, options) {
      try {
        return await fetchClient.put(url, data, options);
      } catch (error) {
        throw error; // Propager l'erreur à la méthode appelante
      }
    };
    this.delete = async function (url, options) {
      try {
        return await fetchClient.delete(url, options);
      } catch (error) {
        throw error; // Propager l'erreur à la méthode appelante
      }
    };
  }

  static async get(url, options) {
    const api = new request();
    return await api.get(url, options);
  }
  static async post(url, data, options) {
    const api = new request();
    return await api.post(url, data, options);
  }
  static async patch(url, data, options) {
    const api = new request();
    return await api.patch(url, data, options);
  }
  static async put(url, data, options) {
    const api = new request();
    return await api.put(url, data, options);
  }
  static async delete(url, options) {
    const api = new request();
    return await api.delete(url, options);
  }
}
