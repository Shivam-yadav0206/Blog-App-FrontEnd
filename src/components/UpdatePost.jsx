import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import { API } from "../service/api";

const initialPost = {
  title: "",
  description: "",
  content: "",
  picture: null,
  email: "",
  name: "",
  category: "Others",
  createdDate: new Date(),
};

const UpdatePost = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const { account } = useContext(DataContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const updatePost = async () => {
    console.log("Saving post", post);
    try {
      const response = await API.updatePost(post);
      if (response.isSuccess) {
        navigate(`/viewPost/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        try {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);

          const response = await API.uploadFile(data);
          setPost({ ...post, picture: response.data });
        } catch (error) {
          console.error(error);
        }
      }
    };

    getImage();
  }, [file]);

  useEffect(() => {
    setPost({
      ...post,
      email: account.email,
      name: account.name,
    });
  }, []);

  return (
    <>
      <div
        className="mx-[100px] mb-0 bg-cover bg-center h-[50vh] text-white py-24 px-10 object-fill"
        style={{
          backgroundImage: post.picture
            ? `url(${post.picture})`
            : "url(https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg)",
        }}>
        <div className="md:w-1/2">
          <label
            htmlFor="fileInput"
            className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800 cursor-pointer">
            Add Image
          </label>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
      </div>

      <div>
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-white border-b border-gray-200">
                <div>
                  <div className="mb-4">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Choose Category
                    </label>
                    <select
                      onChange={(e) => handleChange(e)}
                      defaultValue="Others"
                      name="category"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="Others">Others</option>
                      <option value="Music">Music</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Sports">Sports</option>
                      <option value="Movies">Movies</option>
                      <option value="Education">Education</option>
                    </select>
                    <label className="text-xl text-gray-600">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <br />
                    <input
                      type="text"
                      className="border-2 border-gray-300 p-2 w-full"
                      name="title"
                      id="title"
                      value={post.title}
                      required
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="text-xl text-gray-600">Description</label>
                    <br />
                    <input
                      type="text"
                      className="border-2 border-gray-300 p-2 w-full"
                      name="description"
                      id="description"
                      placeholder="(Optional)"
                      value={post.description}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-8">
                    <label className="text-xl text-gray-600">
                      Content <span className="text-red-500">*</span>
                    </label>
                    <br />
                    <textarea
                      value={post.content}
                      name="content"
                      onChange={(e) => handleChange(e)}
                      className="border-2 border-gray-500 w-full"
                      rows="8"
                      cols="80"></textarea>
                  </div>

                  <div className="flex p-1">
                    <select
                      className="border-2 border-gray-300 border-r p-2"
                      name="action">
                      <option>Save and Publish</option>
                      <option>Save Draft</option>
                    </select>
                    <button
                      onClick={() => updatePost()}
                      className="p-3 bg-blue-500 text-white hover:bg-blue-400">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePost;
