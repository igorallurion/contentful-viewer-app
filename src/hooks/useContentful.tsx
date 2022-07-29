import { useMemo } from "preact/hooks";
import { createClient } from "contentful";

export function useContentful() {
  const isPreview = import.meta.env.VITE_CONTENTFUL_PREVIEW_MODE === "true";

  const contentfulClient = useMemo(() => {
    return createClient({
      // This is the space ID. A space is like a project folder in Contentful terms
      space: import.meta.env.VITE_CONTENTFUL_SPACE,
      // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
      accessToken: isPreview
        ? import.meta.env.VITE_CONTENTFUL_PREVIEW_API_KEY
        : import.meta.env.VITE_CONTENTFUL_DELIVERY_API_KEY,
      host: isPreview ? "preview.contentful.com" : undefined,
    });
  }, []);

  return contentfulClient;
}
