import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getMostRecentPosts, getRelatedPosts } from "../services/index";

function PostWidget({ categories, slug }) {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getRelatedPosts(categories, slug).then((result) =>
        setRecentPosts(result)
      );
    } else {
      getMostRecentPosts().then((result) => setRecentPosts(result));
    }
  }, [slug]);

  return (
    <div className="bg-white rounded-lg p-4">
      <h1 className="font-bold pt-2 py-4 pl-2 border-b-[0.5px] text-[1.2rem] border-gray-200 mb-6">
        {slug ? "Related Posts" : "Most Recent Posts"}
      </h1>
      {recentPosts.map((post) => (
        <div
          className="flex my-6 items-center justify-center w-full px-2"
          key={post.title}
        >
          <div className="w-16 flex-none">
            <Image
              alt={post.title}
              height="60px"
              width="60px"
              unoptimized
              className="align-middle rounded-full"
              src={post.featuredImage.url}
            />
          </div>
          <div className="ml-6 flex-grow-0 text-base text-gray-600">
            <p className="text-gray-400">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostWidget;
