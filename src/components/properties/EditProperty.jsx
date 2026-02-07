import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

const EditProperty = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [amenities, setAmenities] = useState([])
  const [newAmenity, setNewAmenity] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm()

  // Fetch property details
  const fetchProperty = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/properties-detailes/${id}`)
      const p = res.data

      reset({
        title: p.title,
        description: p.description,
        price: p.price,
        propertyType: p.propertyType,
        purpose: p.purpose,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        area: p.area,
        status: p.status,
        location: p.location,
      })

      setAmenities(p.amenities || [])
      setValue("amenities", p.amenities || [])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProperty()
  }, [id])

  // Toggle amenity
  const toggleAmenity = (item) => {
    const updated = amenities.includes(item)
      ? amenities.filter((a) => a !== item)
      : [...amenities, item]

    setAmenities(updated)
    setValue("amenities", updated)
  }

  // Add new amenity
  const addNewAmenity = () => {
    if (!newAmenity.trim()) return
    if (!amenities.includes(newAmenity.trim())) {
      const updated = [...amenities, newAmenity.trim()]
      setAmenities(updated)
      setValue("amenities", updated)
      setNewAmenity("")
    }
  }

  // Submit
  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:8000/api/edit-property/${id}`, { ...data, amenities })
      toast.success("Property updated successfully")
      navigate("/all-properties")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="py-10 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-green-100">

        <h1 className="text-3xl font-bold text-green-700 mb-2">Edit Property</h1>
        <p className="text-gray-500 mb-6">Update property details below</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* Basic Info */}
          <section>
            <h2 className="text-lg font-semibold text-green-700 mb-4">Basic Info</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Title</label>
                <input {...register("title")} className="input" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Price</label>
                <input type="number" {...register("price")} className="input" />
              </div>
            </div>
          </section>

          {/* Property Details */}
          <section>
            <h2 className="text-lg font-semibold text-green-700 mb-4">Property Details</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Property Type</label>
                <select {...register("propertyType")} className="input">
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="office">Office</option>
                  <option value="shop">Shop</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Purpose</label>
                <select {...register("purpose")} className="input">
                  <option value="sale">Sale</option>
                  <option value="rent">Rent</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Bedrooms</label>
                <input type="number" {...register("bedrooms")} className="input" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Bathrooms</label>
                <input type="number" {...register("bathrooms")} className="input" />
              </div>
            </div>
          </section>

          {/* Area */}
          <section>
            <h2 className="text-lg font-semibold text-green-700 mb-4">Area</h2>
            <input type="number" {...register("area")} placeholder="Area (sqft)" className="input w-full" />
          </section>

          {/* Location */}
          <section>
            <h2 className="text-lg font-semibold text-green-700 mb-4">Location</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">City</label>
                <input {...register("location.city")} className="input" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">State</label>
                <input {...register("location.state")} className="input" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Address</label>
                <input {...register("location.address")} className="input" />
              </div>
            </div>
          </section>

          {/* Amenities */}
          <section>
            <h2 className="text-lg font-semibold text-green-700 mb-4">Amenities</h2>
            <div className="flex flex-wrap gap-2 mb-2">
              {amenities.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleAmenity(item)}
                  className={`px-4 py-1.5 rounded-full text-sm border transition
                    ${amenities.includes(item)
                      ? "bg-green-600 text-white border-green-600 shadow"
                      : "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Add new amenity"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                className="input flex-1"
              />
              <button
                type="button"
                onClick={addNewAmenity}
                className="px-4 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Add
              </button>
            </div>
          </section>

          {/* Status */}
          <section>
            <h2 className="text-lg font-semibold text-green-700 mb-4">Status & Featured</h2>
            <div className="flex items-center gap-6">
              <div>
                <label className="block text-gray-700 mb-1">Property Status</label>
                <select {...register("status")} className="input w-44">
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            
            </div>
          </section>

          {/* Description */}
          <section>
            <h2 className="text-lg font-semibold text-green-700 mb-4">Description</h2>
            <textarea {...register("description")} rows="4" className="input w-full" />
          </section>

          {/* Submit */}
          <div className="pt-4">
            <button
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
            >
              {isSubmitting ? "Updating..." : "Update Property"}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default EditProperty
