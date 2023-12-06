import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <div className=" bg-white flex items-center justify-center px-5 py-5">
        <div
          className="rounded-lg shadow-xl bg-gray-900 text-white"
          style={{ width: "450px" }}>
          <div className="border-b border-gray-800 px-8 py-3">
            <div className="inline-block w-3 h-3 mr-2 rounded-full bg-red-500"></div>
            <div className="inline-block w-3 h-3 mr-2 rounded-full bg-yellow-300"></div>
            <div className="inline-block w-3 h-3 mr-2 rounded-full bg-green-400"></div>
          </div>
          <div className="px-8 py-6">
            <p>
              <em className="text-blue-400">const</em>{" "}
              <span className="text-green-400">aboutMe</span>{" "}
              <span className="text-pink-500">=</span>{" "}
              <em className="text-blue-400">function</em>() {"{"}
            </p>
            <p className="ml-4">
              <span className="text-pink-500">return</span> {"{"}
            </p>
            <p className="ml-6">
              name: <span className="text-yellow-300">'Shivam Yadav'</span>,
            </p>
            <p className="ml-6">
              position:{" "}
              <span className="text-yellow-300">'Fullstack-developer'</span>,
            </p>
            <p className="ml-6">
              website:{" "}
              <span className="text-yellow-300">
                '
                <Link
                  href="https://scottwindon.com"
                  target="_blank"
                  className="text-yellow-300 hover:underline focus:border-none">
                  https://scottwindon.com
                </Link>
                '
              </span>
              ,
            </p>
            <p className="ml-6">
              <span>socialProfiles:</span> {"{"}
              <p className="ml-6">
                linkedIn:{" "}
                <span className="text-yellow-300">
                  '
                  <Link
                    to="https://www.linkedin.com/in/shivam-yadav-348a65220/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-300 hover:underline focus:border-none">
                    https://www.linkedin.com/in/shivam-yadav-348a65220/
                  </Link>
                  '
                </span>
                ,
              </p>
              <p className="ml-6">
                github:{" "}
                <span className="text-yellow-300">
                  '
                  <Link
                    to="https://github.com/Shivam-yadav0206"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-300 hover:underline focus:border-none">
                    https://github.com/Shivam-yadav0206
                  </Link>
                  '
                </span>
                ,
              </p>
              <p className="ml-6">
                leetCode:{" "}
                <span className="text-yellow-300">
                  '
                  <Link
                    to="https://leetcode.com/shiivam0206/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-300 hover:underline focus:border-none">
                    https://leetcode.com/shiivam0206/
                  </Link>
                  '
                </span>
              </p>
              <p className="">{"}"}</p>
            </p>
            <p className="ml-4">{"}"}</p>
            <p className="ml-2">{"};"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
