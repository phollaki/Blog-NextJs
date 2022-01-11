import Image from "next/image";
import React from "react";

function Author({ author }) {
  console.log(author);
  return (
    <div className="rounded-lg text-center mt-20 mb-8 p-12 relative bg-black bg-opacity-20 text-white">
      <div className="h-24 w-24 absolute -top-10 left-1/2 transform -translate-x-1/2">
        <Image
          src={author.photo.url}
          alt={author.bio}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <h1 className="mt-5 p-5 text-2xl font-bold">{author.name}</h1>
      <p className="text-lg">{author.bio}</p>
    </div>
  );
}

export default Author;
