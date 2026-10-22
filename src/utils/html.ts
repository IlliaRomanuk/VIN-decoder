import DOMPurify from "dompurify";

/** Variable descriptions come from the API as HTML, so clean them first. */
export const sanitizeHtml = (html: string) => DOMPurify.sanitize(html);
