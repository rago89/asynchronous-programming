import { labeledLogger } from '../../../lib/labeled-logger.js';
import { origin } from '../origin.js';

/* Limit Number of Results

  you can limit the number of results using _limit=x

*/

const log = labeledLogger();

/**
 * Fetches any resources from the API, requesting a limited number of entries.
 *
 * @async
 * @param {string[]} [params=[]] - The URL parameters to request.
 * @param {number} [limit=1] - The maximum number of items the API should send.
 * @returns {Promise<object[]>} An array of all returned resources.
 *
 * @throws {Error} HTTP error! status: {number}.
 */
const fetchPathsQueries = async (params = [], limit = 1) => {
  // --- declare your resource's URL ---
  const joinedParams = params.join('/');

  const URL = `${origin}/${joinedParams}?_limit=${limit}`;
  log(URL);

  // --- fetch, validate and parse the API data (this works!) ---
  const encodedURL = encodeURI(URL);
  const response = await fetch(encodedURL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}\n-> ${URL}`);
  }
  const data = await response.json();

  // --- return the final data ---
  return data;
};

// --- fetch and log the data ---

fetchPathsQueries(['users'], 3)
  .then(data => log('/users?_limit=3', data))
  .catch(err => log('/users?_limit=3', err));

fetchPathsQueries(['comments'], 5)
  .then(data => log('/comments?_limit=5', data))
  .catch(err => log('/comments?_limit=5', err));

fetchPathsQueries(['users', '3', 'posts'], 6)
  .then(data => log('/users/3/posts?_limit=6', data))
  .catch(err => log('/users/3/posts?_limit=6', err));

fetchPathsQueries(['albums', '6', 'photos'], 2)
  .then(data => log('/albums/6/photos?_limit=2', data))
  .catch(err => log('/albums/6/photos?_limit=2', err));

log('= = = =  the call stack is empty  = = = =');
