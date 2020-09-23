// const API_URL = "http://localhost:8001";
const API_URL = "https://travel-log-example.herokuapp.com";

export const listLogEntries = async () => {
  const response = await fetch(`${API_URL}/api/logs`);
  return response.json();
};

export const createLogEntry = async (entry) => {
  const response = await fetch(`${API_URL}/api/logs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(entry),
  });
};

export const deleteLogEntry = async (id) => {
  const response = await fetch(`${API_URL}/api/logs/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
