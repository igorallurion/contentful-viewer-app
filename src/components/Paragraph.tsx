import { RichTextContent } from "contentful";
import { RenderContent } from "./RenderContent";

export function Paragraph({ content }: { content?: RichTextContent[] }) {
  return (
    <p class="paragraph">
      <RenderContent content={content} />
    </p>
  );
}
