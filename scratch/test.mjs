import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import remarkDirective from "remark-directive";
import { remarkCustomAdmonitions } from "../src/plugins/remark-custom-admonitions.mjs";
import { parseDirectiveNode } from "../src/plugins/remark-directive-rehype.mjs";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeComponents from "rehype-components";
import { AdmonitionComponent } from "../src/plugins/rehype-component-admonition.mjs";

const md = `> [!NOTE] Ghi chú nhanh
> Đây là một ghi chú được style bằng Tailwind với màu xanh dương đẹp mắt.`;

async function test() {
  const processor = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkCustomAdmonitions)
    .use(remarkDirective)
    .use(parseDirectiveNode)
    .use(remarkRehype)
    .use(rehypeComponents, {
      components: {
        note: (x, y) => AdmonitionComponent(x, y, "note"),
      }
    })
    .use(rehypeStringify);

  const file = await processor.process(md);
  console.log(String(file));
}

test();
