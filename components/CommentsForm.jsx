import React, { useRef, useState } from "react";

function CommentsForm() {
  const [error, setError] = useState("");
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setSuccessMessage] = useState(null);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  const handleSubmission = () =>{

  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 pb-12 mb-8 ">
      <h1 className="font-bold text-xl">Comment</h1>
      <form action="" className="space-y-10 mt-6">
        <textarea
          ref={commentEl}
          type="text"
          className="w-full h-20 rounded-lg bg-gray-100 px-6 focus:outline-none pt-7"
          placeholder="Comment"
        />
        <input
          ref={nameEl}
          type="text"
          className="w-full h-14 rounded-lg bg-gray-100 px-6 focus:outline-none"
          placeholder="Name"
        />
        <input
          ref={emailEl}
          type="email"
          className="w-full h-14 rounded-lg bg-gray-100 px-6 focus:outline-none"
          placeholder="Email"
        />
        <input
          ref={storeDataEl}
          type="checkbox"
          id="checkbox"
          className="mr-4 ml-6 h-4 w-4"
        />
        <label htmlFor="checkbox" className="text-gray-500">
          Save my name and email for the next time
        </label>
        <div className="flex justify-center w-full">
          <button
            onClick={handleSubmission}
            type="submit"
            className="bg-pink-600 text-white rounded-full text-lg py-2 px-8"
          >
            Send comment
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentsForm;
