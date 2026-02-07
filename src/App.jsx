import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardHome from "./components/DashboardHome";
import ManageOrders from "./components/orders/ManageOrders";
import AllCategory from "./components/category/AllCategory";
import AllSubCategory from "./components/subcategory/AllSubCategory";
import AllProperties from "./components/properties/AllProperties";
import ManageBanner from "./components/banner/ManageBanner";
import ManageCupans from "./components/coupons/ManageCupans";
import AllUsers from "./components/AllUsers";
import AllInquiries from "./components/AllInquiries";
import Dashboard from "./components/Dashboard";
import CreateCoupon from "./components/coupons/CreateCoupon";
import EditCoupon from "./components/coupons/EditCoupon";
import CreateCategory from "./components/category/CreateCategory";
import EditCategory from "./components/category/EditCategory";
import CreateSubCategory from "./components/subcategory/CreateSubCategory";
import EditSubCategory from "./components/subcategory/EditSubCategory";
// import CreateProduct from "./components/properties/CreateProduct";
import ViewProperties from "./components/properties/ViewProperties";
import AdminSignup from "./components/adminsignup/AdminSignup";
// import ProtectedRoutes from "./components/protectedroute/ProtectedRoutes";
import EditOrders from "./components/orders/EditOrders";
import CreateBanner from "./components/banner/CreateBanner";
import EditBanner from "./components/banner/EditBanner";
import PendingBroker from "./components/broker/PendingBroker";
import ActiveBroker from "./components/broker/ActiveBroker";
import RejectedBroker from "./components/broker/RejectedBroker";
import ActiveProperties from "./components/properties/ActiveProperties";
import RejectedProperties from "./components/properties/RejectedProperties";
import ViewBroker from "./components/broker/ViewBroker"
import EditProperty from "./components/properties/EditProperty";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="/manage-orders" element={<ManageOrders />} />
          <Route path="/all-category" element={<AllCategory />} />
          <Route path="/all-sub-category" element={<AllSubCategory />} />
          <Route path="/all-properties" element={<AllProperties />} />
          <Route path="/manage-banner" element={<ManageBanner />} />
          <Route path="/manage-coupons" element={<ManageCupans />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/pending-broker" element={<PendingBroker />} />
          <Route path="/active-broker" element={<ActiveBroker />} />
          <Route path="/rejected-broker" element={<RejectedBroker />} />

          <Route path="/all-inquiries" element={<AllInquiries />} />
          <Route path="/create-coupon" element={<CreateCoupon/>} />
          <Route path="/edit-coupon/:id" element={<EditCoupon/>} />
          <Route path="/create-category" element={<CreateCategory/>} />
          <Route path="/edit-category/:id" element={<EditCategory/>} />
          <Route path="/create-sub-category" element={<CreateSubCategory/>} />
          <Route path="/get-sub-category-form/:id" element={<EditSubCategory/>} />
          {/* <Route path="/create-product" element={<CreateProduct/>} /> */}
          <Route path="/view-properties/:id" element={<ViewProperties/>} />
          <Route path="/edit-order/:id" element={<EditOrders/>} />
          <Route path="/create-banner" element={<CreateBanner/>} />
          <Route path="/edit-banner/:id" element={<EditBanner/>} />
          <Route path="/rejected-properties" element={<RejectedProperties/>} />
          <Route path="/active-properties" element={<ActiveProperties/>} />
          <Route path="/view-broker/:id" element={<ViewBroker/>} />
          <Route path="/edit-property/:id" element={<EditProperty/>} />
         
         


        </Route>
        <Route path="/admin" element={<AdminSignup/>} />
      </Routes>
    </div>
  );
}

export default App;
