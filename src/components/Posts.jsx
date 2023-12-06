import { Link } from "react-router-dom";
import PostCard from "./PostCard";

const Posts = ({ filteredPosts, loading, error }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {filteredPosts && filteredPosts.length > 0
        ? filteredPosts.map((post,index) => (
            <Link key={index} to={`viewPost/${post._id}`}>
              <PostCard key={post._id} {...post} />
            </Link>
          ))
        : !loading && <div>No posts</div>}
    </div>
  );
};

export default Posts;
