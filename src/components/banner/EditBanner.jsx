import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const EditBanner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    link: "",
    isActive: false,
    position: "",
  });

  useEffect(() => {
    const fetchBanner = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `https://jewellery-backend-km3b.onrender.com/api/get-banner/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const banner = res.data.banner;
        setFormData({
          title: banner.title,
          image: null,
          link: banner.link,
          isActive: banner.isActive,
          position: banner.position,
        });
        setExistingImage(banner.image?.url);
      } catch (err) {
        toast.error("Failed to fetch banner");
      }
    };
    fetchBanner();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const { title, link, position, isActive } = formData;

    if (!title || !link || !position) {
      toast.error("All fields are required");
      return;
    }

    const form = new FormData();
    form.append("title", title);
    form.append("link", link);
    form.append("position", position);
    form.append("isActive", isActive);
    if (formData.image) {
      form.append("image", formData.image);
    }

    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `https://jewellery-backend-km3b.onrender.com/api/update-banner/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false)
      toast.success(res.data.message);
      navigate("/manage-banner");
    } catch (err) {
      toast.error("Failed to update banner");
      setLoading(false)
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold underline text-primary">
          Edit Banner
        </h1>
        <Link
          to="/manage-banner"
          className="bg-primary px-2 rounded-2xl text-white font-bold flex items-center"
        >
          ← Back
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div className="py-6">
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="p-2 rounded-lg ring-2 ring-fuchsia-500 w-full"
            required
          />
        </div>

        <div className="py-6">
          <label className="block font-medium mb-1">Link</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="p-2 rounded-lg ring-2 ring-fuchsia-500 w-full"
            required
          />
        </div>

        <div className="py-6">
          <label className="block font-medium mb-1">Upload Image</label>
          <input
            type="file"
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
            <img
              src={selectedImage}
              alt="Preview"
              className="mt-3 h-20 object-contain rounded border"
            />
          )}
          {!selectedImage && existingImage && (
            <img
              src={existingImage}
              alt="Current"
              className="mt-3 h-20 object-contain rounded border"
            />
          )}
        </div>

        <div className="py-6">
          <label className="block mb-1 font-medium">
            Select Banner Position
          </label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="p-2 ring-2 ring-fuchsia-500 rounded-lg w-full"
            required
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
          <label className="block mb-1 font-medium">Active</label>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
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
                <span>Updating...</span>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              "Update Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBanner;
