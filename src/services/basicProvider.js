import { handleCatchErrors } from "../actions/customFn";
// import { userLogout } from "../redux/action/userAction";
import axios from "./axios";

class BasicProvider {
  constructor(
    url = "",
    navigate,
    isUser = false,
    dispatch = false,
    options = {}
  ) {
    this.url = url;
    this.navigate = navigate;
    this.isUser = isUser;
    this.dispatch = dispatch;

    this.useMinDelay = options.useMinDelay || false;
    this.minDelayMs = options.minDelayMs || 500;
  }

  // Common function to get headers
  async getHeaders() {
    const headers = {
      // Authorization: `Bearer ${localStorage.getItem(`${process.env.REACT_APP_LOCAL_TOKEN_NAME}`)}`,
    };

    return headers;
  }

  async _makeRequest(apiCallPromise) {
    try {
      let response;

      // If useMinDelay is enabled, wrap the API call with a minimum delay.
      if (this.useMinDelay) {
        const delayPromise = new Promise((resolve) =>
          setTimeout(resolve, this.minDelayMs)
        );
        [response] = await Promise.all([apiCallPromise, delayPromise]);
      } else {
        // Otherwise, just await the API call directly.
        response = await apiCallPromise;
      }

      return response.data;
    } catch (error) {
      const status = error?.response?.status;

      // Centralized 401/403 (Unauthorized/Forbidden) error handling
      if (status === 401 || status === 403) {
        if (this.dispatch) {
          console.log("Dispatching logout due to 401/403 error.");
          // Example of logout logic:
          // if (this.isUser) {
          //   this.dispatch(userLogout({ navigate: this.navigate }));
          // } else {
          //   this.dispatch(adminSetIsLogout());
          // }
        }
      }

      // Delegate to the global error handler for other errors.
      return handleCatchErrors(error, this.navigate);
    }
  }

  // GET request post Method
  async getRequest(params = {}) {
    const headers = await this.getHeaders();
    const apiCall = axios.get(this.url, { params, headers });
    return this._makeRequest(apiCall);
  }

  // POST request
  async postRequest(data) {
    const apiCall = axios.post(this.url, data);
    return this._makeRequest(apiCall);
  }

  // PATCH request (commonly used for partial updates)
  async patchRequest(formdata = {}) {
    const headers = await this.getHeaders();
    const apiCall = axios.patch(this.url, formdata, { headers });
    return this._makeRequest(apiCall);
  }

  // PUT request (commonly used for full updates)
  async putRequest(formdata = {}) {
    const headers = await this.getHeaders();
    const apiCall = axios.put(this.url, formdata, { headers });
    return this._makeRequest(apiCall);
  }

  // DELETE request
  async deleteRequest() {
    const headers = await this.getHeaders();
    const apiCall = axios.delete(this.url, { headers });
    return this._makeRequest(apiCall);
  }
}

// Return a new instance directly from the class
export default BasicProvider;
