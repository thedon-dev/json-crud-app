import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/users", data)
      .then((res) => {
        alert("Data has been created!");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-screen grid place-content-center">
      <div className=" bg-gray-500 p-10 flex flex-col border border-red-500">
        <label htmlFor="name" className="text-white">
          Name
        </label>
        <input
          name="name"
          value={data.name}
          type="text"
          onChange={(e) => setData({ ...data, name: e.target.value })}
          placeholder="Enter Name"
          className="rounded p-2"
        />
        <label htmlFor="email" className="text-white mt-5">
          Email
        </label>
        <input
          name="email"
          type="text"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          value={data.email}
          placeholder="Enter Email"
          className="rounded p-2"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-700 px-3 py-2 text-white rounded w-fit mt-5"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Create;
