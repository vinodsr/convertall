import { createAppTheme as DefaultTheme } from "./DefaultTheme";
import { createAppTheme as ModernTheme } from "./ModernTheme";

/**
 * Theme factory
 *
 * @export
 * @param {string} [theme="Default"]
 * @return {*}
 */
export function getTheme(theme = "Default") {
  if (theme === "Default") {
    return DefaultTheme;
  } else if (theme === "Modern") {
    return ModernTheme;
  } else {
    return DefaultTheme;
  }
}
