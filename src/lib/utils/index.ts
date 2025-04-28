/**
 * Converts a date string to a human-readable format.
 * @param str a string.
 */
const parseDate = (str: string): string => {
  return ( new Date(str) as Date ).toLocaleString();
};

/**
 * Converts a value to a currency string.
 * @param value a value.
 */
const parseCurrency = (value: string | number): string => {
  return ( +value ).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Converts a string to camelCase.
 * @param str a string.
 */
const toCamelCase = (str: string): string => {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
};

/**
 * Converts an object's keys to camelCase.
 * @param obj an object.
 */
const convertKeysToCamelCase = (obj: any): any => {
  return Object.keys(obj).reduce((result, key) => {
    result[ toCamelCase(key) ] = obj[ key ];
    return result;
  }, {} as any);
};


/**
 * Sets a value in an object using dot-notation.
 * For example, given the object:
 * <pre>
 *   const obj = { a: { b: { c: 1 } } };
 * </pre>
 * You set the value of 'c' to 2 by running dotNotationSet('a.b.c', obj, 2);
 * @param path  the full path, dot-notated.
 * @param obj   the object.
 * @param value the value to set.
 * @returns the updated object.
 */
const dotNotationSet = (obj: object, path: string, value: any): any => {
  const paths: string[] = path.split('.');
  const o: any = paths.slice(0, -1).reduce((o: any, pathItem: string) => o ? o[ pathItem ] : undefined, obj);
  if (o && o[ paths[ paths.length - 1 ] ]) {
    o[ paths[ paths.length - 1 ] ] = value;
  }
  return obj;
};

/**
 * Gets a value from an object given dot notation.
 * For example, given the object:
 * <pre>
 *   const obj = { a: { b: { c: 1 } } };
 * </pre>
 * You can retrieve the value by passing running dotNotationGet('a.b.c', obj)
 * @param path a dot-notated path
 * @param obj  the object.
 * @returns the value.
 */
const dotNotationGet = (obj: object, path: string): any | undefined => {
  const paths: string[] = path.split('.');
  return paths.reduce((o: any, pathItem: string) => o ? o[ pathItem ] : undefined, obj);
};

function deepEquals(obj1: any, obj2: any) {
  // Check if both are the same object reference
  if (obj1 === obj2) { return true; }

  // Check if either is null or not an object
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return obj1 === obj2;
  }

  const keys1: string[] = Object.keys(obj1);
  const keys2: string[] = Object.keys(obj2);

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) { return false; }

  // Check each key-value pair recursively
  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEquals(obj1[ key ], obj2[ key ])) {
      return false;
    }
  }

  return true;
}

export {
  deepEquals,
  dotNotationGet,
  dotNotationSet,
  toCamelCase,
  parseDate,
  parseCurrency,
  convertKeysToCamelCase,
};