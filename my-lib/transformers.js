import _ from 'lodash';

// Transform array by mapping
export function transformArray(array, key) {
  return _.map(array, key);
}

// Group array by property
export function groupByProperty(array, property) {
  return _.groupBy(array, property);
}

// Chunk array into smaller arrays
export function chunkArray(array, size = 2) {
  return _.chunk(array, size);
}

// Get unique values from array
export function getUnique(array) {
  return _.uniq(array);
}

// Sort array by property
export function sortByProperty(array, property, order = 'asc') {
  return _.orderBy(array, [property], [order]);
}

// Deep clone object
export function deepClone(obj) {
  return _.cloneDeep(obj);
}

// Flatten nested array
export function flattenArray(array) {
  return _.flatten(array);
}

// Get difference between arrays
export function arrayDifference(array1, array2) {
  return _.difference(array1, array2);
}

// Debounce function
export function debounceFunction(func, wait = 300) {
  return _.debounce(func, wait);
}

// Throttle function
export function throttleFunction(func, wait = 300) {
  return _.throttle(func, wait);
}

// Pick specific properties from object
export function pickProperties(obj, properties) {
  return _.pick(obj, properties);
}

// Omit specific properties from object
export function omitProperties(obj, properties) {
  return _.omit(obj, properties);
}

export function setLocalStorageItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorageItem(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}