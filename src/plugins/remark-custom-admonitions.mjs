/**
 * LƯU Ý VỀ SEO & HIỆU NĂNG:
 * File plugin này (cùng với các plugin remark/rehype khác) được Astro thực thi 100% ở lúc BUILD TIME 
 * (hoặc lúc Server-Side Rendering), tức là quá trình xử lý diễn ra hoàn toàn trên server bằng Node.js.
 * Đoạn mã Javascript này KHÔNG BAO GIỜ bị gửi xuống trình duyệt của người dùng.
 * Do đó, việc cấu trúc lại HTML tại đây hoàn toàn KHÔNG LÀM GIẢM điểm SEO, 
 * và KHÔNG LÀM CHẬM tốc độ tải trang của người dùng (vẫn giữ nguyên tinh thần Zero-JS).
 */
import { visit } from "unist-util-visit";

export function remarkCustomAdmonitions() {
  return (tree) => {
    visit(tree, "blockquote", (node) => {
      const firstChild = node.children[0];
      if (!firstChild || firstChild.type !== "paragraph") return;
      const firstTextNode = firstChild.children[0];
      if (!firstTextNode || firstTextNode.type !== "text") return;

      const lines = firstTextNode.value.split("\n");
      const firstLine = lines[0];

      // Logic cho FAQ (Q & A)
      if (firstTextNode.value.includes("[!Q]")) {
        let qNodes = [];
        let aNodes = [];
        let foundA = false;

        for (const child of firstChild.children) {
          if (child.type === 'text' && !foundA) {
            const aIndex = child.value.indexOf('[!A]');
            if (aIndex !== -1) {
              foundA = true;
              const qText = child.value.substring(0, aIndex).replace(/\[!Q\]\s*/, '').trim();
              if (qText) qNodes.push({ type: 'text', value: qText });
              
              const aText = child.value.substring(aIndex + 4).trim();
              if (aText) aNodes.push({ type: 'text', value: aText });
            } else {
              const qText = child.value.replace(/\[!Q\]\s*/, '');
              if (qText) qNodes.push({ ...child, value: qText });
            }
          } else if (!foundA) {
            qNodes.push(child);
          } else {
            aNodes.push(child);
          }
        }

        node.type = 'faqContainer';
        node.data = {
          hName: 'div',
          hProperties: {
            className: ['faq-accordion', 'bg-transparent', 'border', 'border-light-surface', 'dark:border-dark-surface', 'rounded-xl', 'my-5', 'overflow-hidden', 'transition-all', 'duration-300']
          }
        };

        node.children = [
          {
            type: 'faqButton',
            data: {
              hName: 'button',
              hProperties: {
                className: ['w-full', 'font-bold', 'text-lg', 'md:text-xl', 'text-left', 'cursor-pointer', 'flex', 'items-center', 'justify-between', 'select-none', 'list-none', 'text-light-foreground', 'dark:text-dark-foreground', 'p-5'],
                onclick: "const content = this.nextElementSibling; content.classList.toggle('grid-rows-[0fr]'); content.classList.toggle('grid-rows-[1fr]'); this.querySelector('.faq-icon').classList.toggle('rotate-180');"
              }
            },
            children: [
              {
                type: 'faqQuestion',
                data: { hName: 'span', hProperties: { className: ['faq-title'] } },
                children: qNodes
              },
              {
                type: 'faqIcon',
                data: { hName: 'span', hProperties: { className: ['faq-icon', 'transition-transform', 'duration-300', 'text-light-foreground/70', 'dark:text-dark-foreground/70'] } },
                children: [
                  {
                    type: 'html',
                    value: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>'
                  }
                ]
              }
            ]
          },
          {
            type: 'faqContent',
            data: {
              hName: 'div',
              hProperties: {
                className: ['faq-content', 'grid', 'grid-rows-[0fr]', 'transition-[grid-template-rows]', 'duration-300', 'ease-in-out']
              }
            },
            children: [
              {
                type: 'faqInner',
                data: { hName: 'div', hProperties: { className: ['faq-inner', 'overflow-hidden'] } },
                children: [
                  {
                    type: 'faqBody',
                    data: {
                      hName: 'div',
                      hProperties: {
                        className: ['faq-body', 'border-t', 'border-light-surface', 'dark:border-dark-surface', 'pt-4', 'px-5', 'pb-5', 'text-light-foreground/90', 'dark:text-dark-foreground/90']
                      }
                    },
                    children: [
                      {
                        type: 'paragraph',
                        children: aNodes
                      },
                      ...node.children.slice(1)
                    ]
                  }
                ]
              }
            ]
          }
        ];
        return;
      }

      // Logic cho Admonition thường
      const match = firstLine.match(/^\s*\[!(?<type>NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\s+(.*))?/i);
      if (!match) return;

      const type = match.groups.type.toLowerCase();
      const title = match[2]?.trim();

      // Convert this blockquote into a containerDirective
      node.type = "containerDirective";
      node.name = type;
      node.attributes = {};

      // Remove the `[!NOTE] Title` from the original text node
      if (lines.length > 1) {
        firstTextNode.value = lines.slice(1).join("\n");
      } else {
        firstChild.children.shift();
      }

      // Add the custom title as a directiveLabel if provided
      if (title) {
        node.children.unshift({
          type: "paragraph",
          data: { directiveLabel: true },
          children: [{ type: "text", value: title }],
        });
      }

      // If the original first paragraph is now empty, remove it
      if (firstChild.children.length === 0) {
        node.children.splice(node.children.indexOf(firstChild), 1);
      }
    });
  };
}
