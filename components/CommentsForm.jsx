import React, { useEffect, useRef, useState } from "react";
import { submitComment } from "../services";

function CommentsForm({ slug }) {
  const [error, setError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(null);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
  }, []);

  const handleSubmission = (e) => {
    e.preventDefault();
    setError(false);

    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!commentEl || !nameEl || !nameEl) {
      setError(true);
      return;
    }

    const commentObj = {
      name,
      comment,
      email,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    }
    if (!storeData) {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
    }

    submitComment(commentObj).then((res) => {
      console.log(res.data);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, [3000]);
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 pb-12 mb-8 ">
      <h1 className="font-bold text-xl">Leave a comment</h1>
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
            className="bg-pink-600 transition duration-400 hover:bg-blue-500 text-white rounded-full text-lg py-2 px-8"
          >
            Send comment
          </button>
          {showSuccessMessage && (
            <span className="float-left text-green-400 text-xl font-semibold mt-3">
              Comment submited for review!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default CommentsForm;
