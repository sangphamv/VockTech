/**
 * LƯU Ý VỀ SEO & HIỆU NĂNG:
 * File plugin này (cùng với các plugin remark/rehype khác) được Astro thực thi 100% ở lúc BUILD TIME 
 * (hoặc lúc Server-Side Rendering), tức là quá trình xử lý diễn ra hoàn toàn trên server bằng Node.js.
 * Đoạn mã Javascript này KHÔNG BAO GIỜ bị gửi xuống trình duyệt của người dùng.
 * Do đó, việc cấu trúc lại HTML tại đây hoàn toàn KHÔNG LÀM GIẢM điểm SEO, 
 * và KHÔNG LÀM CHẬM tốc độ tải trang của người dùng (vẫn giữ nguyên tinh thần Zero-JS).
 */
import { h } from "hastscript";
import { visit } from "unist-util-visit";

export function parseDirectiveNode() {
	return (tree) => {
		visit(tree, (node) => {
			if (
				node.type === "containerDirective" ||
				node.type === "leafDirective" ||
				node.type === "textDirective"
			) {
				const data = node.data || (node.data = {});
				node.attributes = node.attributes || {};
				if (
					node.children.length > 0 &&
					node.children[0].data &&
					node.children[0].data.directiveLabel
				) {
					node.attributes["has-directive-label"] = true;
				}
				const hast = h(node.name, node.attributes);

				data.hName = hast.tagName;
				data.hProperties = hast.properties;
			}
		});
	};
}
