/**
 * Uses the depth-first search approach to find an object (specified by ID) in a nested setup
 * Helper function
 * @param {Object} obj - The object the depth first search is to be performed on
 * @param {Number} targetId - The ID of the object to be searched for
 * @returns {Object} - The object searched for or null if absent
 */
function dfs(obj, targetId) {
  if (obj.id === targetId) {
    return obj;
  }
  if (obj.substeps) {
    for (let item of obj.substeps) {
      let check = dfs(item, targetId);
      if (check) {
        return check;
      }
    }
  }
  return null;
}

/**
 * Searchs for an object within an array of nested object with the aid of an
 * helper function to do depth-first search
 * @see dfs
 * @param {Array.<Object>} arr - An array of nested objects to be searched
 * @param {Number} id - The ID of the object to be searched for
 * @returns {Object} - The object searched for or null if absent
 */
export function findDeep(arr, id) {
  let result;
  for (let obj of arr) {
    result = dfs(obj, id);
    if (result) return result;
  }
  return null;
}

/**
 * Finds an object by its ID (via depth-first search) and deletes it
 * @param {Object} root - The root object that may contain the object to be deleted
 * @param {Number} idToDelete - The ID of the object to be deleted
 * @param {Object} parent - The parent object (relevant after recursion begins)
 * @param {Number} idx - The index within the substeps attribute to search from (relevant after recursion begins)
 * @returns {Object} - An object which does not contain the object with the ID to be deleted as a child
 */
const removeFromTree = (root, idToDelete, parent, idx) => {
  if (root.id === idToDelete) {
    if (parent) {
      parent.substeps.splice(idx, 1);
    }
  }
  if (!root.substeps.length) return;
  for (const [i, e] of root.substeps.entries()) {
    removeFromTree(e, idToDelete, root, i);
  }
};

/**
 * Deletes an object (specifed by ID) from an array of nested objects
 * @param {Array.<Object>} arr - An array of nested objects that may contain the object to be deleted
 * @param {Number} id - The ID of the object to be deleted
 * @returns {Array.<Object>} - An array of nested objects none of which contain the object to be deleted
 */
export function deleteDeep(arr, id) {
  arr = arr.filter((item) => item.id !== id);
  for (let obj of arr) {
    removeFromTree(obj, id);
  }
  return arr;
}

/**
 * Returns the duplicate of an object (specfied by its ID) via the depth-first search approach
 * @see findDeep
 * @param {Array.<Object>} arr - An array of nested objects that may contain the object to be duplicated
 * @param {Number} id - The ID of the object to be duplicated
 * @returns {Object} - The duplicate of the said object
 */
export function duplicateDeep(arr, id) {
  let rootLevelCandidates = arr.filter((item) => item.id === id);
  let candidate = {};
  if (rootLevelCandidates.length) {
    candidate = JSON.parse(JSON.stringify(rootLevelCandidates[0]));
  } else {
    let obj = findDeep(arr, id);
    if (obj) candidate = JSON.parse(JSON.stringify(obj));
  }
  return candidate;
}
