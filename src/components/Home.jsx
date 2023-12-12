import Banner from "./Banner";
import Category from "./Category";
import Posts from "./Posts";
import React, { useEffect, useState } from "react";
import { API } from "../service/api";
import Search from "./Search";
import Shimmer from "./Shimmer";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const fetchData = async () => {
    try {
      setLoading(true);
      let data = await API.getAllPosts();
      if (data.isSuccess) {
        setPosts(data.data);
      } else {
        setError("Error fetching posts");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError("Error fetching posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  if(loading) return <Shimmer />

  return (
    <div className="p-2 m-2">
      <Banner />
      <Search setFilteredPosts={setFilteredPosts} posts={posts} />
      <Category setFilteredPosts={setFilteredPosts} posts={posts} />
      <Posts filteredPosts={filteredPosts} loading={loading} error={error} />
    </div>
  );
};

export default Home;
