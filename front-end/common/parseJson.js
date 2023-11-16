async function fetchAndParseJSON(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

const configUrl = "./../config.json";

const JsonParsed = await fetchAndParseJSON(configUrl);

export { JsonParsed };
