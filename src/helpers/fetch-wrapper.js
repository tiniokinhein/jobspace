import Cookie from "js-cookie";
import { history } from "./history";
import { authActions, employerAuthActions, store } from "../store";

export const fetchWrapper = {
  login: login(),
  socialLogin: socialLogin(),
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
  options: request("OPTIONS"),
};

function request(method) {
  return (url, body, withFormData = false) => {
    let path = process.env.REACT_APP_API_URL + url;

    const requestOptions = {
      method,
      credentials: "include",
      headers: {
        "X-XSRF-TOKEN": token(),
        Accept: "application/json",
        "Accept-Language": localStorage.getItem("lang"),
      },
    };

    if (body) {
      if (method === "POST" || method === "PUT") {
        requestOptions.headers["Content-Type"] = "application/json";
        requestOptions.body = JSON.stringify(body);
      } else {
        const query = getQueryString(body);
        path += `?${query}`;
      }
    }

    if (!withFormData) {
      return fetch(path, requestOptions).then(handleResponse);
    } else {
      return fetch(path, {
        method,
        credentials: "include",
        headers: {
          "X-XSRF-TOKEN": token(),
          Accept: "application/json",
        },
        body: body,
      }).then(handleResponse);
    }
  };
}

const getQueryString = (queries) => {
  return Object.keys(queries)
    .reduce((result, key) => {
      return [
        ...result,
        `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`,
      ];
    }, [])
    .join("&");
};

function handleResponse(response) {
  return response.text().then((text) => {
    try {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        if ([401, 403, 419].includes(response.status)) {
          const seekerLogout = () => store.dispatch(authActions.logout());
          const empLogout = () => store.dispatch(employerAuthActions.logout());
          empLogout();
          seekerLogout();
        }

        let error = (data && data.message) || response.statusText;

        if (data && data.errors) {
          error = JSON.stringify(data.errors);
        }

        if (response.status === 404) {
          history.navigate("/404");
        }

        return Promise.reject(error);
      }

      return data;
    } catch (e) {
      //
    }
  });
}

function token() {
  return decodeURIComponent(Cookie.get("XSRF-TOKEN"));
}

function login() {
  const csrfPath = `${process.env.REACT_APP_URL}/sanctum/csrf-cookie`;

  return (url, body) => {
    return fetch(csrfPath, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    }).then(() => {
      return fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "X-XSRF-TOKEN": token(),
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(body),
      }).then(handleResponse);
    });
  };
}

function socialLogin() {
  const csrfPath = `${process.env.REACT_APP_URL}/sanctum/csrf-cookie`;

  return (url, body) => {
    return fetch(csrfPath, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    }).then(() => {
      return fetch(url, {
        method: "get",
        credentials: "include",
        headers: {
          "X-XSRF-TOKEN": token(),
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-API-SECRET":
            "JobSpacet8ADGJ3ckcqnvJBMO4XskWYFVw190Gc6gl3hZaPFSU9CczlJBSylN4Zx",
        },
      }).then(handleResponse);
    });
  };
}