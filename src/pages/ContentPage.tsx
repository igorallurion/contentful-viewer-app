import { useEffect } from "preact/hooks";
import { useLocation, useParams } from "react-router-dom";

import { useLoadPage } from "../hooks/useLoadPage";
import { RenderContent } from "../components/RenderContent";

export function ContentPage() {
  const { slug, locale } = useParams();
  const content = useLoadPage(locale, slug);

  useEffect(() => {
    if (!content) {
      return;
    }

    console.log("content loaded");
    document.title = content.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", content.description);
  }, [content]);

  if (!content) {
    return <em>Loading</em>;
  }

  return (
    <div class="page">
      <h1>{content.title}</h1>
      <RenderContent content={content.body.content} />
    </div>
  );
}
