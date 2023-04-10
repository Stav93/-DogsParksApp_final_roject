const headers = {
  "Content-Type": "application/json",
};

export const sendRequest = async (
  { url, method = "GET", headers, body = undefined, isText = false },
  onData,
  onError
) => {
  try {
    const response = await fetch(url, {
      method,
      headers,
      ...(body !== undefined && { body: JSON.stringify(body) }),
    });
    if (!response.ok) {
      onError?.("Request failed!");
      return;
    }
    const data = isText ? await response.text() : await response.json();
    //remove onData
    onData(data);
    return data;
  } catch (err) {
    onError?.(err.message || "Something went wrong!");
  }
};
