import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '@/site.config';

export async function GET(context: any) {
  const blog = await getCollection('blog');
  
  return rss({
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.excerpt,
      link: `/danh-muc/${post.data.category}/${post.id.replace(/\.(md|mdx)$/, '')}/`,
    })),
    customData: `<language>${SITE_CONFIG.lang}</language>`,
  });
}
