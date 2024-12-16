export const fetchRequest = async (method, url, body = null, token = null) => {
  const config = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (body !== null) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  let result = handleStatus(response);
  return result;
};

const handleStatus = async (response) => {
  const data = await response.json()
  switch (response.status) {
    case 200:
    case 201:
      return data;
    default:
      console.log(data.message);
      return data;
  }
};

