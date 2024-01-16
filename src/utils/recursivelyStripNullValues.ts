function recursivelyStripNullValues(value: unknown): unknown {
  if (Array.isArray(value)) {
    // If the value is an array, map over its elements and recursively strip null values
    return value.map(recursivelyStripNullValues);
  }
  if (value !== null && typeof value === 'object') {
    // If the value is an object, map over its entries and recursively strip null values
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [
        key,
        recursivelyStripNullValues(value),
      ]),
    );
  }
  if (value !== null) {
    // If the value is neither an array nor an object and not null, keep the value
    return value;
  }
}

export default recursivelyStripNullValues;
