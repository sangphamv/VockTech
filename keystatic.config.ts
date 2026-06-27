import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: {
      name: 'Kho Số',
    },
  },
  collections: {
    posts: collection({
      label: 'Posts - Bài viết',
      slugField: 'title',
      path: 'src/content/blog/*/',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title - Tiêu đề', description: 'Tiêu đề bài viết (hiển thị trên URL)', validation: { length: { max: 60 } } } }),
        excerpt: fields.text({ label: 'Excerpt - Mô tả ngắn', description: 'Tóm tắt nội dung bài viết (tối đa 160 ký tự)', multiline: true, validation: { length: { max: 160 } } }),
        category: fields.relationship({
          label: 'Category - Danh mục',
          description: 'Phân loại bài viết theo danh mục chính',
          collection: 'categories',
        }),
        author: fields.text({ label: 'Author - Tác giả', description: 'Tên người viết bài', defaultValue: 'Van-Sang-Gogh' }), // We could make this a relationship too, but let's keep it simple for now based on current schema
        draft: fields.checkbox({ label: 'Draft - Bản nháp', description: 'Đánh dấu để ẩn bài viết này trên trang' }),
        tags: fields.array(
          fields.text({ label: 'Tag - Thẻ' }),
          { label: 'Tags - Thẻ', description: 'Thêm các từ khóa liên quan (nhấn Add hoặc Enter)', itemLabel: props => props.value }
        ),
        publishDate: fields.date({ label: 'Publish Date - Ngày xuất bản', description: 'Ngày bài viết được công khai (mặc định là hôm nay)', defaultValue: { kind: 'today' } }),
        updatedDate: fields.date({ label: 'Updated Date - Ngày cập nhật', description: 'Ngày chỉnh sửa cuối cùng (nếu có)' }),
        series: fields.text({ label: 'Series - Chủ đề', description: 'Tên chuỗi bài viết liên quan (nếu bài viết thuộc một chuỗi)' }),
        seriesOrder: fields.integer({ label: 'Series Order - Thứ tự chủ đề', description: 'Thứ tự của bài viết trong chuỗi (ví dụ: 1, 2, 3...)' }),
        image: fields.image({
          label: 'Image - Hình ảnh đại diện',
          description: 'Ảnh thumbnail hiển thị cho bài viết (ưu tiên tỷ lệ 16:9)',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        content: fields.mdx({
          label: 'Content - Nội dung bài viết',
          description: 'Nội dung chi tiết của bài viết hỗ trợ Markdown',
          options: {
            heading: [2, 3, 4, 5, 6],
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts/',
            }
          },
        }),
      },
    }),
    categories: collection({
      label: 'Categories - Danh mục',
      slugField: 'title',
      path: 'src/content/categories/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Title - Tiêu đề' } }),

        description: fields.text({ label: 'Description - Mô tả', multiline: true }),
      },
    }),
  },
});
