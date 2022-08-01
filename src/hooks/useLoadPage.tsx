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

export function useLoadPage(locale?: string, slug?: string) {
  const [content, setContent] = useState<Page | null>(null);
  const client = useContentful();

  useEffect(() => {
    if (!locale || !slug) {
      return;
    }

    client
      .getEntries<CfPage>({
        content_type: "page",
        locale,
        "fields.url": `/${slug}`,
      })
      .then((res) => {
        console.log(res.items);
        if (!res.items || res.items.length === 0) {
          return;
        }

        const [entry] = res.items;
        setContent(parsePage(entry));
      })
      .catch((err) => console.log(err));
  }, [slug, locale]);

  return content;
}

function parsePage(page: Entry<CfPage>): Page {
  return {
    ...page.fields,
    _id: page.sys.id,
    _contentType: page.sys.contentType.sys.id,
  };
}
