import { RichTextContent } from "contentful";
import { Paragraph } from "./Paragraph";
import { Text } from "./Text";

export function RenderContentBlock({ block }: { block: RichTextContent }) {
  switch (block.nodeType) {
    case "paragraph":
      return <Paragraph content={block.content} />;

    case "text":
      return <Text content={block} />;

    default:
      console.warn(`Unsupported noteType: ${block.nodeType}`);
      return null;
  }
}
