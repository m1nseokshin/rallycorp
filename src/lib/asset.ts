/**
 * Prefixes an absolute path with the app's base path, so raw asset URLs
 * (`<img src>`, `<video src>`, internal `<a href>`) resolve correctly under
 * GitHub Pages' project-page URL shape (github.io/rallycorp/...).
 *
 * `next/image` and `next/link` rewrite basePath automatically; a plain
 * `<img src="/media/x.jpg">` or `<a href="/app">` does not, so every such
 * reference in this app goes through this helper instead.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
