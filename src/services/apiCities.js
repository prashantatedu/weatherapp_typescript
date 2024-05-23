const API_URL = "http://localhost:5000/stateandcities";

export async function getCities(stateId) {
  const res = await fetch(`${API_URL}/${stateId}`);
  console.log(res);
  if (!res.ok) throw Error(`Couldn't find cities for state #${stateId}`);
  const { data } = await res.json();
  return data;
}
