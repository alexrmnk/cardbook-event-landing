import { useEffect } from 'react';

function readContent(selector) {
  return document.head.querySelector(selector)?.getAttribute('content') ?? null;
}

function writeContent(selector, value) {
  if (value == null) return;
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute('content', value);
}

export function useDocumentMeta({ title, description }) {
  useEffect(() => {
    const previousTitle = document.title;
    const previous = {
      description: readContent('meta[name="description"]'),
      ogTitle: readContent('meta[property="og:title"]'),
      ogDescription: readContent('meta[property="og:description"]'),
      twitterTitle: readContent('meta[name="twitter:title"]'),
      twitterDescription: readContent('meta[name="twitter:description"]'),
    };

    if (title) document.title = title;
    writeContent('meta[name="description"]', description);
    writeContent('meta[property="og:title"]', title);
    writeContent('meta[property="og:description"]', description);
    writeContent('meta[name="twitter:title"]', title);
    writeContent('meta[name="twitter:description"]', description);

    return () => {
      document.title = previousTitle;
      writeContent('meta[name="description"]', previous.description);
      writeContent('meta[property="og:title"]', previous.ogTitle);
      writeContent('meta[property="og:description"]', previous.ogDescription);
      writeContent('meta[name="twitter:title"]', previous.twitterTitle);
      writeContent('meta[name="twitter:description"]', previous.twitterDescription);
    };
  }, [title, description]);
}
