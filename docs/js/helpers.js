/**
 * capitalizerFirstLetter: It takes a string, capitalizes the first letter, and returns the new string
 * @param string - The string to capitalize.
 * @returns The first letter of the string is being capitalized and the rest of the string is being
 * returned.
 */
export const capitalizerFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
