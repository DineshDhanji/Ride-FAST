export const colors = {
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b",
  },
};

let a = [
  {
    config: {
      adapter: ["xhr", "http", "fetch"],
      data: '{"username":"","password":""}',
      env: { Blob: "[Function Blob]", FormData: "[Function FormData]" },
      headers: "[Object]",
      maxBodyLength: -1,
      maxContentLength: -1,
      method: "post",
      timeout: 0,
      transformRequest: "[[Function transformRequest]]",
      transformResponse: "[[Function transformResponse]]",
      transitional: {
        clarifyTimeoutError: false,
        forcedJSONParsing: true,
        silentJSONParsing: true,
      },
      url: "http://192.168.10.6:8000/api/login",
      validateStatus: "[Function validateStatus]",
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
    },
    data: { data: "Username and password are required." },
    headers: {
      allow: "POST, OPTIONS",
      "content-length": "46",
      "content-type": "application/json",
      "cross-origin-opener-policy": "same-origin",
      date: "Wed, 25 Dec 2024 19:52:11 GMT",
      "referrer-policy": "same-origin",
      server: "WSGIServer/0.2 CPython/3.12.7",
      vary: "Cookie",
      "x-content-type-options": "nosniff",
      "x-frame-options": "DENY",
    },
    request: {
      DONE: 4,
      HEADERS_RECEIVED: 2,
      LOADING: 3,
      OPENED: 1,
      UNSENT: 0,
      _aborted: false,
      _cachedResponse: undefined,
      _hasError: false,
      _headers: {
        accept: "application/json, text/plain, */*",
        "content-type": "application/json",
        "x-csrftoken":
          "dQXyHRqNkKATrIHxyqBuSjzVkDfPbcWEAtVheLbqg8ZmgioHzpbL4tTACvOGsuUZ",
      },
      _incrementalEvents: false,
      _lowerCaseResponseHeaders: {
        allow: "POST, OPTIONS",
        "content-length": "46",
        "content-type": "application/json",
        "cross-origin-opener-policy": "same-origin",
        date: "Wed, 25 Dec 2024 19:52:11 GMT",
        "referrer-policy": "same-origin",
        server: "WSGIServer/0.2 CPython/3.12.7",
        vary: "Cookie",
        "x-content-type-options": "nosniff",
        "x-frame-options": "DENY",
      },
      _method: "POST",
      _perfKey: "network_XMLHttpRequest_http://192.168.10.6:8000/api/login",
      _performanceLogger: {
        _closed: false,
        _extras: "[Object]",
        _pointExtras: "[Object]",
        _points: "[Object]",
        _timespans: "[Object]",
      },
      _requestId: null,
      _response: '{"data":"Username and password are required."}',
      _responseType: "",
      _sent: true,
      _subscriptions: [],
      _timedOut: false,
      _trackingName: "unknown",
      _url: "http://192.168.10.6:8000/api/login",
      readyState: 4,
      responseHeaders: {
        Allow: "POST, OPTIONS",
        "Content-Length": "46",
        "Content-Type": "application/json",
        "Cross-Origin-Opener-Policy": "same-origin",
        Date: "Wed, 25 Dec 2024 19:52:11 GMT",
        "Referrer-Policy": "same-origin",
        Server: "WSGIServer/0.2 CPython/3.12.7",
        Vary: "Cookie",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
      },
      responseURL: "http://192.168.10.6:8000/api/login",
      status: 400,
      timeout: 0,
      upload: {},
      withCredentials: true,
    },
    status: 400,
    statusText: undefined,
  },
];

// Dark Mode
// text: 50
// text input: 700
// placeholder: 400
// primary background: 900
// secondary background: 800
// button: 200
// button text: 50
// border: 600

// Light Mode
// text: 950
// text: 900
// placeholder: 400
// primary background: 100
// secondary background: 200
// button: 900
// button text: 50
// border: 400