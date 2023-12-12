const Shimmer = () => {
  return (
    <div className="animate-pulse p-4">
      <div className="bg-gray-200 w-11/12 h-64 m-auto"></div>
      <div className="bg-gray-200 w-11/12 h-28 m-auto mt-5"></div>
      <div className="flex mx-10">
        <div className="bg-gray-200 w-52 h-52 my-5 m-5"></div>
        <div className="bg-gray-200 w-52 h-52 my-5 m-5"></div>
        <div className="bg-gray-200 w-52 h-52 my-5 m-5"></div>
        <div className="bg-gray-200 w-52 h-52 my-5 m-5"></div>
        <div className="bg-gray-200 w-52 h-52 my-5 m-5"></div>
        <div className="bg-gray-200 w-52 h-52 my-5 m-5"></div>
      </div>
    </div>
  );
};

export default Shimmer;
