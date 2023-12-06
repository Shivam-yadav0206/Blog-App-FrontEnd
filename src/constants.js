export const API_URL = "https://blog-app-be-e2t7.onrender.com";

export const CATEGORY_LIST = [
  {
    id: "101",
    name: "All",
    picture:
      "https://i.pinimg.com/564x/92/8b/c7/928bc7916eb79384c58be6e875061d0d.jpg",
  },
  {
    id: "102",
    name: "Music",
    picture:
      "https://previews.123rf.com/images/bsd555/bsd5552004/bsd555200401170/144933564-musical-chalk-white-icon-on-black-background-traditional-movie-genre-artistic-cinematography-common.jpg",
  },
  {
    id: "103",
    name: "Movies",
    picture:
      "https://static.vecteezy.com/system/resources/previews/005/648/546/original/movies-and-television-glyph-icon-watching-films-tv-shows-online-popcorn-and-drinks-e-commerce-department-shopping-categories-silhouette-symbol-negative-space-isolated-illustration-vector.jpg",
  },
  {
    id: "104",
    name: "Entertainment",
    picture:
      "https://c8.alamy.com/comp/RH52MB/cinema-and-movies-entertainment-black-and-white-RH52MB.jpg",
  },
  {
    id: "105",
    name: "Sports",
    picture:
      "https://cdn1.iconfinder.com/data/icons/user-interface-part-7/48/Object_vol.1-17-512.png",
  },
  {
    id: "106",
    name: "Others",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Chess_Board.svg/800px-Chess_Board.svg.png",
  },
];

export const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: "Loading...",
    message: "Data is being loader, Please Wait...",
  },
  success: {
    title: "Success",
    message: "Data received successfully",
  },
  responseFailure: {
    title: "Error",
    message: "An error occurred while fetching response from server",
  },
  requestFailure: {
    title: "Error",
    message: "An error occurred while parsing request data",
  },
  networkError: {
    title: "Error",
    message:
      "Unavle to connect to server. Please check your internet connection",
  },
};

export const SERVICE_URLS = {
  getAllPosts: { url: "/posts", method: "GET" },
  userSignup: { url: "/signup", method: "POST" },
  userLogin: { url: "/login", method: "POST" },
  uploadFile: { url: "/file/upload", method: "POST" },
  createPost: { url: "/create", method: "POST" },
  getPostById: { url: "post", method: "GET", query: true },
  updatePost: { url: "update", method: "PUT", query: true },
  deletePost: { url: "delete", method: "DELETE", query: true },
  newComment: { url: "/comment/new", method: "POST" },
  getAllComments: { url: "comments", method: "GET", query: true },
  deleteComment: { url: "comment/delete", method: "DELETE", query: true },
};
