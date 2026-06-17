import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: {
      name: 'Keystatic',
    },
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/blog/*/',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title', validation: { length: { max: 60 } } } }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true, validation: { length: { max: 160 } } }),
        category: fields.relationship({
          label: 'Category',
          collection: 'categories',
        }),
        author: fields.text({ label: 'Author', defaultValue: 'sang-pham' }), // We could make this a relationship too, but let's keep it simple for now based on current schema
        draft: fields.checkbox({ label: 'Draft', description: 'Check this to hide the post' }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags', itemLabel: props => props.value }
        ),
        publishDate: fields.date({ label: 'Publish Date', defaultValue: { kind: 'today' } }),
        updatedDate: fields.date({ label: 'Updated Date' }),
        series: fields.text({ label: 'Series' }),
        seriesOrder: fields.integer({ label: 'Series Order' }),
        image: fields.image({
          label: 'Image',
        }),
        content: fields.mdx({
          label: 'Content',
          options: {
            heading: [2, 3, 4, 5, 6],
          },
        }),
      },
    }),
    categories: collection({
      label: 'Categories',
      slugField: 'title',
      path: 'src/content/categories/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        color: fields.select({
          label: 'Color',
          options: [
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
            { label: 'Orange', value: 'orange' },
            { label: 'Purple', value: 'purple' },
            { label: 'Pink', value: 'pink' },
          ],
          defaultValue: 'blue',
        }),
        description: fields.text({ label: 'Description', multiline: true }),
      },
    }),
  },
});
