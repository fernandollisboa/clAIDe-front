export function createQueryString(params = {}) {
  if (!params) return "";

  const { isActive, desc } = params;
  let queryString = "?";
  if (isActive !== undefined) queryString += `isActive=${isActive}&`;
  if (desc !== undefined) queryString += `desc=${desc}`;
  return queryString;
}

export function createHeaders() {
  const token = window.localStorage.getItem("claideToken");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return config;
}
