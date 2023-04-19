import { useState, useCallback, useEffect } from "react";
import { sendRequest } from "../services/api";

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const sendRequestCB = useCallback(
    async ({ url, method = "GET", headers = {}, body = undefined }, onData) => {
      setIsLoading(true);
      await sendRequest({ url, method, headers, body }, onData, setError);
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest: sendRequestCB,
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
