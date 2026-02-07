import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageBanner = () => {
  const [allbanner, setallbanner] = useState([]);

  const getallbanner = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("https://jewellery-backend-km3b.onrender.com/api/getallbanner", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
     localStorage.setItem("banner", response.data.length)
    setallbanner(response.data);
  };

  useEffect(() => {
    getallbanner();
  }, []);

  const deletebanner = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `https://jewellery-backend-km3b.onrender.com/api/deletebanner/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getallbanner();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const handledelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletebanner(id);
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between ">
        <h1 className="text-primary underline text-3xl font-bold">
          Manage Banner
        </h1>
        <Link
          className="bg-primary font-bold flex px-2 text-white rounded-2xl cursor-pointer items-center"
          to="/create-banner"
        >
          Add New
        </Link>
      </div>
      <div className="mt-12 overflow-x-auto  rounded shadow max-h-113">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead className="text-white bg-primary h-12 sticky top-0 z-10">
            <tr className="">
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-center whitespace-nowrap">
                S.No
              </th>

              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Title
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Banner Image
              </th>

              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Edit
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {allbanner.map((item, index) => (
              <tr key={item._id}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.title}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <img
                    className="w-16 h-16"
                    src={item.image.url}
                    alt={item.title}
                  />
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  <Link
                    className="bg-green-500 hover:bg-green-300 px-2 flex justify-center items-center py-1 cursor-pointer rounded-2xl text-white text-sm"
                    to={`/edit-banner/${item._id}`}
                  >
                    <span>Edit</span> <TbEdit className="w-4 h-4" />
                  </Link>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-600 hover:bg-red-400 px-2 flex justify-center items-center py-1 cursor-pointer rounded-2xl text-white text-sm"
                    onClick={() => handledelete(item._id)}
                  >
                    <span>delete</span> <MdDeleteForever className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBanner;
