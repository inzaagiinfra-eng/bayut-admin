import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
const CreateCategory = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm();

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "https://jewellery-backend-km3b.onrender.com/api/create-category",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      reset();
      navigate("/all-category");
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6 ">
        <h1 className="text-primary underline text-3xl font-bold">
          Add Category
        </h1>
        <Link
          to="/all-category"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl shadow-md hover:bg-fuchsia-800 transition"
        >
          <IoArrowBack className="w-5 h-5" /> Back
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-4"
          >
            Category Name
          </label>

          <input
            id="category"
            type="text"
            {...register("name", { required: "Category is required" })}
            className="p-2 w-52 border-fuchsia-400 sm:w-64 md:w-72 lg:w-80 xl:w-[350px] border  rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <button
          className="hover:bg-blue-700 bg-primary text-white p-2 rounded-2xl "
          type="submit"
        >
          Add category
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
