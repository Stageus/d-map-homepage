export const fetchRequest = async (method, url, body = null, token = null) => {
  const config = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token !== null) {
    config.headers.Authorization = `${token}`;
  }
  if (body !== null) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  return response;
};
