import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Mail, Phone, User, Briefcase, ShieldCheck, Users, Calendar } from "lucide-react";
import  {toast} from "react-toastify"


const ViewBroker = () => {
    const { id } = useParams();
    const [broker, setBroker] = useState(null);


    const getBroker = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/get-broker-details/${id}`);
            setBroker(res.data);
        } catch (error) {
            console.log(error)

        }

    };

    useEffect(() => {
        getBroker();
    }, []);

    const updateBrokerStatus = async (newStatus) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/update-broker-status/${id}`, { status: newStatus })
             setBroker({ ...broker, status: newStatus });
            toast.success(response.data.message)


        } catch (error) {
            console.log(error)
        }
    }

    if (!broker) return <div>Loading...</div>;

    return (
        <div className="p-6 bg-white from-gray-50 to-gray-200 min-h-screen">

            <div className="relative overflow-hidden rounded-2xl bg-primary from-indigo-600 to-purple-600 text-white p-8 shadow-xl">
                <div className="flex items-center gap-6">
                    <img
                        src={broker.companyLogo?.url}
                        className="w-24 h-24 rounded-xl border-4 border-white shadow-lg bg-white object-cover"
                    />
                    <div>
                        <h1 className="text-3xl font-bold tracking-wide">{broker.companyName}</h1>
                        <p className="opacity-80 mt-1"> Broker Profile</p>


                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

                <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/40">
                    <img
                        src={broker.profilePhoto?.url}
                        className="w-40 h-40 rounded-full mx-auto border-4 border-white shadow-lg object-cover"
                    />
                    <h2 className="text-xl font-semibold text-center mt-4">
                        {broker.brokerName}
                    </h2>
                    <p className="text-gray-500 text-center mt-2">{broker.bio}</p>
                </div>

                <div className="xl:col-span-2 bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/40">
                    <h3 className="text-lg font-semibold mb-4">Broker Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <PremiumInfo icon={<Mail size={24} />} label="Email" value={broker.email} />
                        <PremiumInfo icon={<Phone size={24} />} label="Phone" value={broker.phone} />
                        <PremiumInfo icon={<Briefcase size={24} />} label="Experience" value={`${broker.experience} Years`} />
                        <PremiumInfo icon={<Users size={24} />} label="Team Size" value={broker.teamSize} />
                        <PremiumInfo icon={<ShieldCheck size={24} />} label="License" value={broker.licenseNumber} />
                        <PremiumInfo icon={<Calendar size={24} />} label="Joined" value={new Date(broker.createdAt).toLocaleDateString()} />
                    </div>

                    <div className="mt-6">
                        <h4 className="font-semibold mb-2">Specialization</h4>
                        <div className="flex flex-wrap gap-2">
                            {broker.specialization.map((sp, i) => (
                                <span
                                    key={i}
                                    className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                    {sp}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6">
                        <h4 className="font-semibold mb-2">Office Locations</h4>
                        <div className="flex flex-wrap gap-2">
                            {broker.officeAddresses.map((loc, i) => (
                                <span
                                    key={i}
                                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                    {loc}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <PremiumGallery title="ID Proofs" images={broker.idProof} />

            <PremiumGallery title="Documents" images={broker.documents} />
            <select
                value={broker.status}
                onChange={(e) => updateBrokerStatus(e.target.value)}
                className={`inline-block mt-3 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md ${broker.status === "pending"
                    ? "bg-yellow-300/20 text-black"
                    : broker.status === "approved"
                        ? "bg-green-300/20 text-green-700"
                        : "bg-red-300/20 text-red-700"
                    }`}
            >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
            </select>

        </div>
    );

};

const PremiumInfo = ({ icon, label, value }) => (
    <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border">
        <div className="text-indigo-600">{icon}</div>
        <div>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="font-semibold text-gray-800">{value}</p>
        </div>
    </div>
);

const PremiumGallery = ({ title, images }) => (
    <div className="mt-8 bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/40">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, i) => (
                <div
                    key={i}
                    className="overflow-hidden rounded-xl border group cursor-pointer"
                >
                    <img
                        src={img.url}
                        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                </div>
            ))}
        </div>
    </div>
);


export default ViewBroker;
