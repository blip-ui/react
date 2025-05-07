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
};