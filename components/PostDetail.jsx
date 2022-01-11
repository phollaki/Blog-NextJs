import Image from "next/image";
import React from "react";
import moment from "moment";
function PostDetail({ post }) {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;
    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }
      if (obj.italic) {
        modifiedText = <i key={index}>{text}</i>;
      }
      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }
    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {text}
          </h3>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-base font-semibold mb-4">
            {text}
          </h4>
        );
      case "numbered-list":
        return (
          <ol className="space-y-2">
            {obj.children.flatMap((list, index) =>
              list.children.flatMap((listElem) =>
                listElem.children.flatMap((innerElement) => (
                  <li key={index}>{index + 1 + ". " + innerElement.text}</li>
                ))
              )
            )}
          </ol>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {text}
          </p>
        );
      case "image":
        return (
          <Image
            src={obj.src}
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-8">
      <div className="relative shadow-md mb-6 h-80 w-full">
        <Image
          src={post.featuredImage.url}
          alt={post.title}
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="flex space-x-6 items-center text-gray-700 mb-8">
        <div className="space-x-2 flex items-center">
          <Image
            src={post.author.photo.url}
            height={30}
            width={30}
            className="rounded-full"
          />
          <p className="text-base">{post.author.name}</p>
        </div>
        <div className="font-medium space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="align-middle">
            {moment(post.createdAt).format("MMM DD, YYYY")}
          </span>
        </div>
      </div>
      <h1 className="font-bold text-4xl mb-8">{post.title}</h1>
      {
        <div>
          {post.content.raw.children.map((obj, i) => {
            const children = obj.children.map((item, i2) =>
              getContentFragment(i2, item.text, item)
            );
            return getContentFragment(i, children, obj, obj.type);
          })}
        </div>
      }
    </div>
  );
}

export default PostDetail;
