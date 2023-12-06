import { CATEGORY_LIST } from "../constants";

const Category = ({ setCategory, setFilteredPosts, posts }) => {
  const handleClick = (category) => {
    if (category.name === "All") setFilteredPosts(posts);
    else {
      setFilteredPosts(posts.filter((post) => post.category === category.name));
    }
  };

  return (
    <>
      <div className="my-2  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 w-full">
        {CATEGORY_LIST.map((category) => (
          <div
            key={category.id}
            onClick={() => handleClick(category)}
            className="cursor-pointer relative p-4 w-full bg-white rounded-lg overflow-hidden hover:shadow flex flex-col justify-center items-center"
            style={{ minHeight: "160px" }}>
            <div className="w-16 h-16 bg-gray-100 rounded-lg">
              <img src={category.picture} alt={category.name} />
            </div>

            <h2 className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
              {category.name}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default Category;
