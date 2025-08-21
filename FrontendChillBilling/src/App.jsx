import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";  

import Dashboard from './pages/Dashboard';
import Welcome from './pages/Welcome';
import UserManagement from './pages/UserManagement';
import Customers from './pages/Customers';
import ProductCatalog from './pages/ProductCatalog';
import Invoices from './pages/Invoices';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import AddCustomer from './pages/AddCustomer';
import GenerateInvoice from './pages/GenerateInvoice';
import RecordPayment from './pages/RecordPayment';
import Login from "./pages/Login";
import Accountant from "./pages/Accountant";
import EditInvoiceForm from "./pages/EditInvoiceForm";
import EditCustomerForm from "./pages/EditCustomerForm";
import EditUserForm from "./pages/EditUserForm";
import AddUserForm from "./pages/AddUserForm";
import Register from "./pages/Register";
import CustomerDashboard from "./CustomerPages/CustomerDashboard";
import Profile from "./CustomerPages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="admindashboard" element={<Dashboard />} />
        <Route path="user-management" element={<UserManagement />} />
        <Route path="customer-management" element={<Customers />} />
        <Route path="product-catalog" element={<ProductCatalog />} />
        <Route path="invoice-management" element={<Invoices />} />
        <Route path="payment-tracking" element={<Payments />} />
        <Route path="reports" element={<Reports />} />
        <Route path="add-customer" element={<AddCustomer />} />
        <Route path="generate-invoice" element={<GenerateInvoice />} />
        <Route path="record-payment" element={<RecordPayment />} />
        <Route path="accountant" element={<Accountant />} />
        <Route path="add-user" element={<AddUserForm />} />
        <Route path="edit-user/:id" element={<EditUserForm />} />
        <Route path="edit-customer/:id" element={<EditCustomerForm />} />
        <Route path="edit-invoice/:id" element={<EditInvoiceForm />} />
        <Route path="register" element={<Register/>}/>
        <Route path="CustomerDashboard" element={<CustomerDashboard/>}/>
        <Route path="CustomerProfile" element={<Profile/>}/>
      </Routes>
    </Router>

  );
}

export default App;
