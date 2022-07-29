import { RichTextContent } from "contentful";
import { RenderContentBlock } from "./RenderContentBlock";

export function RenderContent({ content }: { content?: RichTextContent[] }) {
  return (
    <>
      {content?.map((block, index) => (
        <RenderContentBlock key={index} block={block} />
      ))}
    </>
  );
}
