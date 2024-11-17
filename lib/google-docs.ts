export function exportToGoogleDocs(markdown: string) {
  const encodedText = encodeURIComponent(markdown);
  window.open(
    `https://docs.google.com/document/create?body=${encodedText}`,
    "_blank"
  );
}