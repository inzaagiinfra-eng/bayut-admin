import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBanner = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setformData] = useState({
    title: "",
    image: null,
    link: "",
    isActive: false,
    position: "",
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));

      setformData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setformData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const { title, link, isActive, position } = formData;

    if (!title || !link || !formData.image || !position || isActive === "") {
      toast.error("All fields are required");
      return;
    }

    const form = new FormData();

    form.append("title", title);
    form.append("image", formData.image);
    form.append("link", link);
    form.append("isActive", isActive);
    form.append("position", position);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "https://jewellery-backend-km3b.onrender.com/api/create-banner",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setformData({
        title: "",
        image: null,
        link: "",
        isActive: false,
        position: "",
      });

      setSelectedImage(null);
      navigate("/manage-banner");
      setLoading(false);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between ">
        <h1 className="text-primary underline text-3xl font-bold">
          Create Banner
        </h1>
        <Link
          className="bg-primary font-bold flex px-2 text-white rounded-2xl cursor-pointer items-center"
          to="/manage-banner"
        >
          ← Back
        </Link>
      </div>
      <form
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  "
        onSubmit={handleSubmit}
      >
        <div className="w-full py-6">
          <label className="block mb-1 font-medium" htmlFor="title">
            Title
          </label>
          <input
            className=" ring-2 ring-fuchsia-500 p-2 rounded-lg "
            type="text"
            name="title"
            onChange={handleChange}
            value={formData.title}
            required
          />
        </div>

        <div className="py-6">
          <label className="block mb-1 font-medium" htmlFor="link">
            Link
          </label>
          <input
            className=" p-2 rounded-lg ring-2 ring-fuchsia-500 "
            type="text"
            name="link"
            onChange={handleChange}
            value={formData.link}
            required
          />
        </div>
        <div className="py-6">
          <label htmlFor="image" className="block mb-1 font-medium">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            name="image"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500
               file:mr-4 file:py-2 file:px-4
               file:rounded-full file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100"
          />

          {selectedImage && (
            <div className="mt-4">
              <img
                src={selectedImage}
                alt="Preview"
                className="h-20 object-contain rounded border"
              />
            </div>
          )}
        </div>
        <div className="py-6">
          <label htmlFor="position" className="block mb-1 font-medium">
            Select Banner Position
          </label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className="p-2 ring-2 ring-fuchsia-500 rounded-lg w-full"
          >
            <option value="">-- Select Position --</option>
            <option value="Homepage 1 small">Homepage 1 small</option>
            <option value="Homepage 1 big">Homepage 1 big</option>
            <option value="Homepage 2(1)">Homepage 2(1)</option>
            <option value="Homepage 2(2)">Homepage 2(2)</option>
            <option value="Homepage 3 small">Homepage 3 small</option>
            <option value="Homepage 3 big">Homepage 3 big</option>
            <option value="Homepage 4 small">Homepage 4 small</option>
            <option value="Homepage 4 big">Homepage 4 big</option>
            <option value="Homepage 5 small">Homepage 5 small</option>
            <option value="Homepage 5 big">Homepage 5 big</option>
            <option value="Homepage 6 small">Homepage 6 small</option>
            <option value="Homepage 6 big">Homepage 6 big</option>
            <option value="Homepage 7">Homepage 7</option>
          </select>
        </div>

        <div className="py-6">
          <label className="pr-6 mb-1 font-medium" htmlFor="image">
            Active
          </label>
          <input
            type="checkbox"
            name="isActive"
            onChange={handleChange}
            checked={formData.isActive}
          />
        </div>
        <div className="col-span-full">
          <button
            type="submit"
            disabled={loading}
            className={`bg-primary text-white px-4 py-2 rounded hover:bg-fuchsia-800 flex items-center justify-center gap-2 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <span>Creating...</span>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              "Create Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBanner;
