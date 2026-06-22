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
        title: fields.slug({ name: { label: 'Title', validation: { length: { max: 60 } } } }),
        excerpt: fields.text({ label: 'Excerpt - Mô tả ngắn', multiline: true, validation: { length: { max: 160 } } }),
        category: fields.relationship({
          label: 'Category - Danh mục',
          collection: 'categories',
        }),
        author: fields.text({ label: 'Author - Tác giả', defaultValue: 'Van-Sang-Gogh' }), // We could make this a relationship too, but let's keep it simple for now based on current schema
        draft: fields.checkbox({ label: 'Draft - Bản nháp', description: 'Check this to hide the post' }),
        tags: fields.array(
          fields.text({ label: 'Tag - Thẻ' }),
          { label: 'Tags - Thẻ', itemLabel: props => props.value }
        ),
        publishDate: fields.date({ label: 'Publish Date - Ngày xuất bản', defaultValue: { kind: 'today' } }),
        updatedDate: fields.date({ label: 'Updated Date - Ngày cập nhật' }),
        series: fields.text({ label: 'Series - Chủ đề' }),
        seriesOrder: fields.integer({ label: 'Series Order - Thứ tự chủ đề' }),
        image: fields.image({
          label: 'Image - Hình ảnh',
        }),
        content: fields.mdx({
          label: 'Content - Nội dung',
          options: {
            heading: [2, 3, 4, 5, 6],
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
        color: fields.select({
          label: 'Color - Màu sắc',
          options: [
            { label: 'Green - Xanh lá', value: 'green' },
            { label: 'Blue - Xanh dương', value: 'blue' },
            { label: 'Orange - Cam', value: 'orange' },
            { label: 'Purple - Tím', value: 'purple' },
            { label: 'Pink - Hồng', value: 'pink' },
          ],
          defaultValue: 'blue',
        }),
        description: fields.text({ label: 'Description - Mô tả', multiline: true }),
      },
    }),
  },
});
