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

const localeMap: Record<string, string> = {
  en: "en-US",
  "pt-BR": "pt-BR",
};

export function useLoadPage(pathname?: string) {
  const [content, setContent] = useState<Page | null>(null);
  const client = useContentful();
  const browserLanguage = navigator.language ?? "en";
  const locale = localeMap[browserLanguage] ?? "en-US";

  useEffect(() => {
    if (!pathname) {
      return;
    }

    client
      .getEntries<CfPage>({
        content_type: "page",
        locale,
        "fields.url": pathname,
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
  }, [pathname]);

  return content;
}

function parsePage(page: Entry<CfPage>): Page {
  return {
    ...page.fields,
    _id: page.sys.id,
    _contentType: page.sys.contentType.sys.id,
  };
}
