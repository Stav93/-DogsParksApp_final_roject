import { useState, useCallback, useEffect } from "react";

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const sendRequest = useCallback(
    async ({ url, method = "GET", headers = {}, body = undefined }, onData) => {
      setIsLoading(true);
      setError(undefined);
      try {
        const response = await fetch(url, {
          method,
          headers,
          // body: body ? JSON.stringify(body) : null,
          ...(body !== undefined && { body: JSON.stringify(body) }),
        });

        if (!response.ok) {
          // throw new Error('Request failed!');
          setError("Request failed!");
          setIsLoading(false);
          return;
        }
        //check response type - text or json
        const data = await response.json();
        onData(data);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export const useHttpData = ({
  url,
  method = "GET",
  headers = {},
  body = undefined,
}) => {
  const [data, setData] = useState(undefined);
  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    sendRequest({ url, method, headers, body }, setData);
  }, [url, method, headers, body]);

  return {
    isLoading,
    error,
    data,
  };
};
