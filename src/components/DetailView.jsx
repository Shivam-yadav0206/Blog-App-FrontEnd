import React, { useEffect, useState, useContext } from "react";
import { API } from "../service/api";
import { Link, useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import Comment from '../components/Comment'


const initialValues = {
  name: "",
  email: "",
  postId: "",
  comments: "",
  date: new Date(),
};

const DetailView = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState(initialValues);
  const [comments, setComments] = useState([]);
  const [commentUpdate, setCommentUpdate] = useState(true);
  const { account } = useContext(DataContext);
  const navigate = useNavigate();
  let month, day;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postInfo = await API.getPostById(id);
        if (postInfo.isSuccess) {
          setPost(postInfo.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPost();
  }, []);
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const commentInfo = await API.getAllComments(id);
        if (commentInfo.isSuccess) {
          setComments(commentInfo.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComment();
  }, [id, commentUpdate]);
  const handleDelete = async () => {
    let response = await API.deletePost(post._id);
    if (response.isSuccess) {
      navigate("/");
    }
  };
  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.name,
      email: account.email,
      postId: post._id,
      comments: e.target.value,
    });
  };

  const addComment = async (e) => {
    const response = await API.newComment(comment);
    if (response.isSuccess) {
      setComment(initialValues);
      setCommentUpdate((prevState) => !prevState);
    }
  };

  const date = new Date(post.createdDate);
  day = date.getDate();
  month = date.toLocaleString("en-US", { month: "long" });
  return (
    <>
      <div>
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
          <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
            <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
              <header className="mb-4 lg:mb-6 not-format">
                <address className="flex items-center mb-6 not-italic">
                  <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <img
                      className="mr-4 w-16 h-16 rounded-full"
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt="Jese Leos"
                    />
                    <div>
                      <div
                        className="text-xl font-bold text-gray-900 dark:text-white">
                        {post.name}
                      </div>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        Graphic Designer, educator & CEO Flowbite
                      </p>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        <time>
                          {`${day} ${month}, 2023`}
                        </time>
                      </p>
                    </div>
                  </div>
                </address>
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                  {post.description}
                </h1>
              </header>
              <figure>
                <img src={post.picture} alt="" />
              </figure>
              <h6 className="my-4 text-2xl  leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {post.content}
              </h6>
              {account.email === post.email && (
                <>
                  <div className="my-5 flex justify-end">
                    <Link to={`/update/${id}`}>
                      <svg
                        className="h-10 w-10 text-indigo-900 mr-3 cursor-pointer"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </Link>
                    <svg
                      onClick={() => {
                        if (window.confirm("Delete this POST..?")) {
                          handleDelete();
                        }
                      }}
                      className="h-10 w-10 text-red-500 cursor-pointer"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />{" "}
                      <line x1="9" y1="9" x2="15" y2="15" />{" "}
                      <line x1="15" y1="9" x2="9" y2="15" />
                    </svg>
                  </div>
                </>
              )}

              <section className="not-format">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                    Discussion (20)
                  </h2>
                </div>
                <div className="mb-6">
                  <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <label htmlFor="comment" className="sr-only">
                      Your comment
                    </label>
                    <textarea
                      value={comment.comments}
                      onChange={(e) => handleChange(e)}
                      id="comment"
                      rows="6"
                      className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                      placeholder="Write a comment..."
                      required></textarea>
                  </div>
                  <button
                    onClick={(e) => addComment(e)}
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                    Post comment
                  </button>
                </div>
              </section>
              <div>
                {comments.map((info, index) => (
                  <Comment key={index} comment={info} setCommentUpdate={setCommentUpdate} />
                ))}
              </div>
            </article>
          </div>
        </main>
      </div>
    </>
  );
};

export default DetailView;
