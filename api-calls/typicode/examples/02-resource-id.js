import { labeledLogger } from '../../../lib/labeled-logger.js';
import { origin } from '../origin.js';

/* Resource IDs

  You can also get a specific item by it's id

*/

const log = labeledLogger();

/**
 * Fetches a specific recourse item by type and id.
 *
 * @async
 * @param {string} resourceType - The name of the resource type to fetch.
 * @param {number} id - The resource id to fetch.
 * @returns {Promise<object[]>} An array of all resource at the given type path.
 *
 * @throws {Error} HTTP error! status: {number}.
 */
const fetchById = async (resourceType = '', id = 0) => {
  // --- declare your resource's URL ---
  const URL = `${origin}/${resourceType}/${id}`;
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

fetchById('albums', '1')
  .then(data => log('/albums/1', data))
  .catch(err => log('/albums/1', err));

fetchById('albums', '4')
  .then(data => log('/albums/4', data))
  .catch(err => log('/albums/4', err));

fetchById('comments', '2')
  .then(data => log('/comments/2', data))
  .catch(err => log('/comments/2', err));

fetchById('comments', '4')
  .then(data => log('/comment/4', data))
  .catch(err => log('/comment/4', err));

log('= = = =  the call stack is empty  = = = =');
