/**
 * Content sanitizer for post HTML.
 *
 * Posts store pasted HTML that sometimes carries its own <style> block. Injected
 * into the app that CSS leaks into the whole page (it restyles the modal, the
 * headings, everything). We keep the markup and inline styles, drop the parts
 * that can escape the post body or execute code.
 */
export function sanitizeHtml(html) {
  if (!html) return '';

  return String(html)
    // <style>, <script>, <link>, <meta>, <base>, <title> — with or without a closing tag
    .replace(/<(script|style|link|meta|base|title)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<(script|style|link|meta|base|title)\b[^>]*\/?>/gi, '')
    // document wrappers
    .replace(/<\/?(html|head|body)\b[^>]*>/gi, '')
    // inline event handlers
    .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, '')
    .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, '')
    // javascript: URLs
    .replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1="#"');
}
