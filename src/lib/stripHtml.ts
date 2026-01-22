export function stripHtml(html: string = ""): string {
  // Server-side (Node / Edge)
  if (typeof window === "undefined") {
    return html.replace(/<[^>]*>?/gm, "");
  }

  // Client-side
  const div: HTMLDivElement = document.createElement("div");
  div.innerHTML = html;

  return div.textContent || div.innerText || "";
}
