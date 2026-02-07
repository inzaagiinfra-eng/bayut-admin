import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom"
import { AiOutlineEye } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";


const ActiveBroker = () => {
    const [allBroker, setallBroker] = useState([])
    const getbrokers = async () => {

        const response = await axios.get("http://localhost:8000/api/find-broker?status=approved");
        localStorage.setItem("users", response.data.length)
        console.log(response.data);
        setallBroker(response.data);
    };

    useEffect(() => {
        getbrokers();
    }, []);

    const deleteBroker = async (id) => {
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
                    `http://localhost:8000/api/delete-broker/${id}`,

                );



                getbrokers();
                toast.success(response.data.message);

                Swal.fire("Deleted!", "Your broker has been deleted.", "success");
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Something went wrong!", "error");
            }
        }
    };




    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-3xl text-primary underline">
                    Pending Brokers                </h1>
                <div className="gap-4 flex">
                    <Link to="/pending-broker" className="font-bold bg-fuchsia-500 rounded-2xl px-2 py-1 text-white">Pending Broker</Link>
                    <Link to="/active-broker" className="font-bold bg-yellow-300 rounded-2xl px-2 py-1 text-white">Active Broker</Link>
                    <Link to="/rejected-broker" className="font-bold bg-cyan-400 rounded-2xl px-2 py-1 text-white">Rejected Broker</Link>
                </div>
            </div>
            <div className="mt-12 overflow-x-auto  rounded shadow max-h-113">
                <table className="table-auto border-collapse border border-gray-300 w-full">
                    <thead className="text-white bg-primary h-12 sticky top-0 z-10">
                        <tr className="">
                            <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-center whitespace-nowrap">
                                S.No
                            </th>
                            <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                                Company Logo
                            </th>
                            <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                                Company Name
                            </th>
                            <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                                Profile Photo
                            </th>
                            <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                                Broker Name
                            </th>
                            <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                                Phone
                            </th>
                            <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                                Email
                            </th>
                            <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                                Status
                            </th>

                            <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                                Created Date
                            </th>
                            <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                                Edit
                            </th>
                            <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                                Delete                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allBroker.map((item, index) => (
                            <tr key={item._id} >
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {index + 1}
                                </td>

                                <td className="border border-gray-300 px-4 py-2 w-4 h-4">
                                    <img src={item.companyLogo?.url} alt={item.companyName} />
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {item.companyName}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 w-4 h-4">
                                    <img src={item.profilePhoto?.url} alt={item.brokerName} />
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {item.brokerName}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {item.phone}
                                </td>

                                <td className="border border-gray-300 px-4 py-2">
                                    {item.email}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {item.status}
                                </td>


                                <td className="border border-gray-300 px-4 py-2">
                                    {new Date(item.createdAt).toLocaleString()}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <Link
                                        className="bg-green-500 hover:bg-green-300 px-2 flex gap-1 justify-center items-center py-1 cursor-pointer rounded-2xl text-white text-sm"
                                        to={`/view-broker/${item._id}`}
                                    >
                                        <span>View</span> <AiOutlineEye className="w-4 h-4" />
                                    </Link>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => deleteBroker(item._id)}
                                        className="bg-red-600 hover:bg-red-400 px-2 flex justify-center items-center py-1 cursor-pointer rounded-2xl text-white text-sm"

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

export default ActiveBroker;
