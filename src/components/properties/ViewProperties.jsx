import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom";
const swipeConfidenceThreshold = 100
import { toast } from "react-toastify"

const ViewProperties = () => {
    const { id } = useParams()
    const [detailes, setDetailes] = useState(null)
    const [index, setIndex] = useState(0)
    const [status, setstatus] = useState("")
    const navigate = useNavigate()


    const getDetailes = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8000/api/properties-detailes/${id}`
            )
            setDetailes(res.data)
        }
        catch (error) {
            console.log(error)
        }
    }


    const editProperties = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/edit-propertie/${id}`, { status })
            navigate("/all-properties");
            toast.success(response.data.message);

        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        if (detailes?.status) {
            setstatus(detailes.status)
        }
    }, [detailes])


    useEffect(() => {
        getDetailes()
    }, [id])

    if (!detailes) return <p>Loading...</p>

    const images = detailes.images

    const paginate = (direction) => {
        setIndex((prev) => {
            if (direction === 1) return (prev + 1) % images.length
            if (direction === -1)
                return prev === 0 ? images.length - 1 : prev - 1
            return prev
        })
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">
            <div className="relative overflow-hidden rounded-xl w-full h-96">
                <AnimatePresence initial={false}>
                    <motion.img
                        key={index}
                        src={images[index].url}
                        alt="property"
                        className="absolute inset-0 w-full h-full"
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.8}
                        onDragEnd={(e, { offset }) => {
                            if (offset.x < -swipeConfidenceThreshold) paginate(1)
                            else if (offset.x > swipeConfidenceThreshold) paginate(-1)
                        }}
                    />
                </AnimatePresence>
            </div>
            <div className="max-w-5xl mx-auto px-4 mt-8 space-y-8">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {detailes.title}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {detailes.location?.community}, {detailes.location?.city}
                        </p>
                    </div>

                    <div className="bg-green-50 text-green-700 px-6 py-3 rounded-2xl text-xl font-semibold shadow-sm">
                        ₹ {detailes.price}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                        { label: "Type", value: detailes.propertyType },
                        { label: "Purpose", value: detailes.purpose },
                        { label: "Beds", value: detailes.bedrooms },
                        { label: "Baths", value: detailes.bathrooms },
                        { label: "Area", value: `${detailes.area} sqft` },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-white border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition"
                        >
                            <p className="text-xs text-gray-500">{item.label}</p>
                            <p className="font-semibold text-gray-800 mt-1">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold mb-2">
                        About this property
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-sm">
                        {detailes.description}
                    </p>
                </div>

                {detailes.amenities?.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">
                            Amenities
                        </h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {detailes.amenities.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 bg-gray-50 border rounded-lg px-3 py-2 text-sm text-gray-700"
                                >
                                    <span className="text-green-500">✔</span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-wrap gap-4">
                    <select
                        className="w-[50%] p-2 border rounded bg-slate-100"
                        value={status}
                        onChange={(e) => setstatus(e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="rejected">Rejected</option>

                    </select>
                    <button
                        onClick={editProperties}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        Update
                    </button>

                </div>
            </div>

        </div>

    )
}

export default ViewProperties
