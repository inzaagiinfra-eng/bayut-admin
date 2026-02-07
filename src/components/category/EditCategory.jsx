import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

    useEffect(() => {
      const editcouponform = async () => {
        const token = localStorage.getItem("token")
        const response = await axios.get(
          `https://jewellery-backend-km3b.onrender.com/api/edit-category-form/${id}`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        },
        );
        reset(response.data);
      };
      editcouponform();
    }, [id, reset]);

    const onsubmit = async (data) => {
      const token = localStorage.getItem("token")
      const response = await axios.put(
        `https://jewellery-backend-km3b.onrender.com/api/edit-category/${id}`,
        data, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        },
      );
      reset;
      navigate("/all-category");
      toast.success(response.data.message);
    };

  return (
    <div>
      <div className=" flex justify-between items-center">
        <h1 className="text-3xl font-bold pb-6 text-primary underline">
          Edit Category
        </h1>
        <Link
          to="/manage-coupons"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl shadow-md hover:bg-fuchsia-800 transition"
        >
          ← Back
        </Link>
      </div>
      <div className="p-6 bg-white rounded-xl shadow-md">
        <form
            onSubmit={handleSubmit(onsubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
             Category Name
            </label>
            <input
              type="text"
              id="name"
             {...register("name", { required: "Category name is required" })}

              className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-start">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
