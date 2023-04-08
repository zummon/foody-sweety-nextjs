import matter from 'gray-matter';
import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';

const folderDir = join(process.cwd(), 'blogs');

export function getBlog(slug) {
  const { data, content } = matter(readFileSync(join(folderDir, `${slug}.md`)));
  const { date } = data;

  return {
    ...data,
    date: date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    content,
    slug,
  };
}

export function getBlogPaths() {
  return readdirSync(folderDir).map((file) => file.replace(/\.md?$/, ''));
}

export function getAllBlogs() {
  return getBlogPaths()
    .map((slug) => getBlog(slug))
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
}
