import { RichTextContent } from "contentful";

export function Text({ content }: { content: RichTextContent }) {
  return <span>{content.value}</span>;
}
