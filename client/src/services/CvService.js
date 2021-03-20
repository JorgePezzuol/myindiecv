import { API_URL } from "../utils/utils";

export const fetchCvById = async (cvId) => {
  const response = await fetch(`${API_URL}/cv/edit/${cvId}`, {
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export const updateEntity = async (entityName, entity) => {
  const response = await fetch(`${API_URL}/${entityName}/${entity._id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(entity),
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export const setDelay = (updateFunction, entity) => {
  const timeoutId = setTimeout(() => updateFunction(entity), 1500);
  return timeoutId;
};
