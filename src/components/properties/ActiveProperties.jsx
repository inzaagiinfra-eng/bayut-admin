import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify"
import Swal from "sweetalert2";
import { AiOutlineEye } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";


const ActiveProperties = () => {
    const [allproperties, setallproperties] = useState([])

    const getallproperties = async () => {

        const response = await axios.get(
            "http://localhost:8000/api/properties?status=active",

        );
        console.log(response.data)
        localStorage.setItem("properties", response.data.length)
        setallproperties(response.data);
    };

    useEffect(() => {
        getallproperties();
    }, []);

    const deleteProperties = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won’t be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {

                const response = await axios.delete(
                    `http://localhost:8000/api/delete-property/${id}`,

                );
               


                getallproperties();
                toast.success(response.data.message);

                Swal.fire("Deleted!", "Your product has been deleted.", "success");
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Something went wrong!", "error");
            }
        }
    };



    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary underline">
                    Active Properties
                </h1>
                <div className="gap-4 flex">
                    <Link to="/all-properties" className="font-bold bg-fuchsia-500 rounded-2xl px-2 py-1 text-white">Pending Properties</Link>
                    <Link to="/active-properties" className="font-bold bg-yellow-300 rounded-2xl px-2 py-1 text-white">Active Properties</Link>
                    <Link to="/rejected-properties" className="font-bold bg-cyan-400 rounded-2xl px-2 py-1 text-white">Rejected Properties</Link>
                </div>
                
            </div>

            <div className="mt-12 overflow-x-auto  rounded shadow max-h-113">
                <table className="min-w-full border-collapse">
                    <thead className="text-white bg-primary h-12 sticky top-0 z-10">
                        <tr>
                            <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-center whitespace-nowrap">
                                S.No
                            </th>
                            <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                                Title
                            </th>
                            <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                                Image
                            </th>
                            <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                                Price
                            </th>
                            <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                                Purpose
                            </th>
                            <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                                Location
                            </th>
                            <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                                Status
                            </th>
                            <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                                View
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
                        {allproperties.map((item, index) => (
                            <tr key={item._id}>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {index + 1}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {item.title}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <img
                                        src={item.images[0].url}
                                        alt={item.productName}
                                        className="h-16 w-16 object-cover"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    ₹{item.price}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {item.purpose}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {item.location.city} {item.location.community} {item.location.address}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {item.status}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <Link
                                        className="bg-blue-600 hover:bg-blue-500 px-2 flex gap-1 justify-center items-center py-1 cursor-pointer rounded-2xl text-white text-sm"
                                        to={`/view-properties/${item._id}`}
                                    >
                                        <span>View</span> <AiOutlineEye className="w-4 h-4" />
                                    </Link>
                                </td>
                                
                                <td className="border border-gray-300 px-4 py-2">
                                    <Link
                                        className="bg-yellow-400 hover:bg-yellow-300 px-2 flex gap-1 justify-center items-center py-1 cursor-pointer rounded-2xl text-white text-sm"
                                        to={`/edit-property/${item._id}`}
                                    >
                                        <span>Edit</span> <CiEdit  className="w-4 h-4" />
                                    </Link>
                                </td>

                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        className="bg-red-600 hover:bg-red-400 px-2 flex justify-center items-center py-1 cursor-pointer rounded-2xl text-white text-sm"
                                        onClick={() => deleteProperties(item._id)}
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

export default ActiveProperties;
