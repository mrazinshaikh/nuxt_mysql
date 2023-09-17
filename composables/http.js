export const useHttp = (request, opts) => {
  return useFetch(request, {
    ...opts,
    onRequest({ request, options }) {
      // Set the request headers
      const token = useCookie('token');
      options.headers = options.headers || {};
      options.headers.authorization = "Bearer " + token.value;
    },
    onResponse({ request, response, options }) {
      // Process the response data
      //   localStorage.setItem("token", response._data.token);
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
    },
  });
};
