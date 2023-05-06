import Link from "next/link";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { join } from "path";
import { readdirSync, readFileSync } from "fs";

const folderDir = join(process.cwd(), "app", "[blog]");

export function getBlog(slug) {
  const { data, content } = matter(readFileSync(join(folderDir, `${slug}.md`)));
  const { date } = data;

  return {
    ...data,
    date: date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    content,
    slug,
  };
}

export function getBlogPaths() {
  return readdirSync(folderDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      return file.slice(0, -3);
    });
}

export async function generateStaticParams() {
  let paths = getBlogPaths();

  return paths.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params: { blog } }) {
  let { date, excerpt, image, title } = getBlog(blog);

  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      images: [
        {
          url: image.src,
        },
      ],
    },
    twitter: {
      title,
      description: excerpt,
      images: [image.src],
    },
    other: {
      date,
    },
  };
}

export default async function ({ params: { blog } }) {
  let { content, date, excerpt, image, tags, title } = getBlog(blog);

  return (
    <div className="bg-gray-900 max-w-screen-md rounded-xl mx-auto my-8 shadow-2xl">
      <p>
        <Link
          href="/"
          className="transition duration-500 ease-in-out hover:bg-gray-50 hover:text-gray-900 px-6 py-4 rounded-tl-xl inline-block font-bold"
        >
          {/* reply-solid icon */}
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M8.309 189.836L184.313 37.851C199.719 24.546 224 35.347 224 56.015v80.053c160.629 1.839 288 34.032 288 186.258 0 61.441-39.581 122.309-83.333 154.132-13.653 9.931-33.111-2.533-28.077-18.631 45.344-145.012-21.507-183.51-176.59-185.742V360c0 20.7-24.3 31.453-39.687 18.164l-176.004-152c-11.071-9.562-11.086-26.753 0-36.328z"
            ></path>
          </svg>
        </Link>
      </p>

      <div className="prose prose-invert prose-img:rounded-xl prose-img:mx-auto prose-img:object-contain prose-img:max-h-96 prose-img:max-w-full max-w-none px-4 sm:px-8 mb-8 text-center">
        <h1>{title}</h1>
        <p>
          {tags.map((tag, index) => (
            <a href={`#`} key={`tag-${index}`}>
              #{tag}{" "}
            </a>
          ))}
        </p>
        <p>
          <img src={image.src} alt={image.alt} />
        </p>
        <p>{excerpt}</p>
        <p>{date}</p>
      </div>

      <div className="prose prose-invert prose-img:rounded-xl prose-img:mx-auto prose-img:object-contain prose-img:max-h-96 prose-img:max-w-full max-w-none px-4 sm:px-8 mb-8">
        <MDXRemote
          source={content}
          components={{
            a: ({ href, children }) => {
              if (href.startsWith("/")) {
                return <Link href={href}>{children}</Link>;
              }

              if (href.startsWith("#")) {
                return <a href={href}>{children}</a>;
              }

              return (
                <a target="_blank" href={href}>
                  {children}
                </a>
              );
            },
          }}
        />
      </div>

      <p className="flex items-center justify-end">
        <Link
          href="/"
          className="transition duration-500 ease-in-out hover:bg-gray-50 hover:text-gray-900 px-6 py-4 rounded-br-xl font-bold"
        >
          {/* share-solid icon */}
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M503.691 189.836L327.687 37.851C312.281 24.546 288 35.347 288 56.015v80.053C127.371 137.907 0 170.1 0 322.326c0 61.441 39.581 122.309 83.333 154.132 13.653 9.931 33.111-2.533 28.077-18.631C66.066 312.814 132.917 274.316 288 272.085V360c0 20.7 24.3 31.453 39.687 18.164l176.004-152c11.071-9.562 11.086-26.753 0-36.328z"
            ></path>
          </svg>
        </Link>
      </p>
    </div>
  );
}
