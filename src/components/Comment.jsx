import { DataContext } from "../context/DataProvider";
import React, { useContext } from "react";
import { API } from "../service/api";

const Comment = ({ comment, setCommentUpdate }) => {
  const { name, comments, date, email, _id } = comment;
  const { account } = useContext(DataContext);

  const removeComment = async (e) => {
    const response = await API.deleteComment(_id);
    if (response.isSuccess) {
      setCommentUpdate((prevState) => !prevState);
    }
  };

  return (
    <div>
      <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <div className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src="https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                alt="Michael Gough"
              />
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                {name}
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time>{new Date(date).toDateString()}</time>
            </p>
          </div>
        </footer>
        <p>{comments}</p>
        <div className="flex items-center mt-4 space-x-4">
          {account.email === email && (
            <button
              onClick={(e) => removeComment(e)}
              type="button"
              className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
              <img
                className="h-5"
                src="https://cdn-icons-png.flaticon.com/512/3334/3334328.png"
                alt=""
              />
              Delete
            </button>
          )}
        </div>
      </article>
    </div>
  );
};

export default Comment;
