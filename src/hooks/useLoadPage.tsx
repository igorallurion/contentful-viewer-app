import { Entry, RichTextContent } from "contentful";
import { useEffect, useState } from "preact/hooks";
import { useContentful } from "./useContentful";

type CfPage = {
  title: string;
  description: string;
  body: RichTextContent;
};
type Page = CfPage & {
  _id: string;
  _contentType: string;
};

export function useLoadPage(entryId?: string) {
  const [content, setContent] = useState<Page | null>(null);
  const client = useContentful();

  useEffect(() => {
    if (!entryId) {
      return;
    }

    client
      .getEntry<CfPage>(entryId)
      .then((entry) => setContent(parsePage(entry)))
      .catch((err) => console.log(err));
  }, [entryId]);

  return content;
}

function parsePage(page: Entry<CfPage>): Page {
  return {
    ...page.fields,
    _id: page.sys.id,
    _contentType: page.sys.contentType.sys.id,
  };
}
