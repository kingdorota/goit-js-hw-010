export async function fetchCountries(name) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    if (!response.ok) {
      throw new Error('Request failed!');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error.message);
    return [];
  }
}
