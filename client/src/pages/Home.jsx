import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">AI Finance Tracker</h1>

      <div className="flex gap-4">
        <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded">
          Login
        </Link>

        <Link
          to="/register"
          className="bg-gray-700 text-white px-6 py-2 rounded"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
