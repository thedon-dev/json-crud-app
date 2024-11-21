import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    const getUsers = () => {
      axios
        .get("http://localhost:3000/users")
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
      setIsLoading(false);
    };
    getUsers()
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Would you like to delete?");
    if (confirm) {
      axios.delete("http://localhost:3000/users/" + id).then((res) => {
        alert("Record Deleted");
        window.location.reload();
      });
    }
  };

  return (
    <div className="my-10">
      <h1 className="text-center font-bold text-3xl my-10">
        CRUD App with JSON Server
      </h1>
      <div className="flex justify-center">
        <Link
          to="/create"
          className="bg-green-500 text-white font-semibold py-3 px-7 mx-auto"
        >
          Create Data +{" "}
        </Link>
      </div>

      <table className="w-1/2 mx-auto">
        <thead className="">
          <tr className="text-start border-b border-gray-700">
            <th className="text-start py-5">ID</th>
            <th className="text-start py-5">Name</th>
            <th className="text-start py-5">Email</th>
            <th className="text-start py-5">Action</th>
          </tr>
        </thead>
        {!isLoading ? (
          <tbody className="">
            {data.map((d, i) => (
              <tr key={i} className="border-b border-gray-700 py-5">
                <td className="py-2">{d.id}</td>
                <td className="py-2">{d.name}</td>
                <td className="py-2">{d.email}</td>
                <td className="py-5 flex gap-5">
                  <Link
                    to={`/update/${d.id}`}
                    className="p-2 rounded bg-yellow-500"
                  >
                    Update
                  </Link>
                  <button
                    onClick={(e) => handleDelete(d.id)}
                    className="p-2 rounded bg-red-600 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <p>Loading.....</p>
        )}
      </table>
    </div>
  );
};

export default Home;
