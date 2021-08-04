import { origin } from '../origin.js';

/**
 * Fetches a single user with the given user name.
 *
 * @async
 * @param {string} [userName=''] - The user name to request.
 * @returns {Promise<object|null>} The user object if it exists, otherwise null.
 *
 * @throws {Error} HTTP error! status: {number}.
 */
export const userByUsername = async (userName = '') => {
  // --- declare your resource's URL ---
  // hint: ctr-f "filter" -> https://github.com/typicode/json-server
  const URL = `${origin}/users?username=${userName}`;

  // --- fetch, validate and parse the API data (this works!) ---
  const encodedURL = encodeURI(URL);
  const response = await fetch(encodedURL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}\n-> ${URL}`);
  }
  const data = await response.json();
  console.log(data[0])
  // --- process the fetched data (if necessary) ---
  //   you do not need to use `await` below this comment
  const user = data.length === 0 ? null : data[0];

  // --- return the final data ---
  return user;
};
