import React, { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [users, setUsers] = useState([
    { id: 1, name: "Pranay", email: "pranay@gmail.com", role: "customer", status: "Active" },
    { id: 2, name: "Prabhas", email: "prabas@gmail.com", role: "account", status: "InActive" },
    { id: 3, name: "Sai Krishna", email: "saikrishna@gmail.com", role: "Admin", status: "Active" },
    { id: 4, name: "Pratab", email: "pratab@gmail.com", role: "customer", status: "InActive" },
    { id: 5, name: "Swapna", email: "swapna@gmail.com", role: "account", status: "Active" }
  ]);

  const [customers, setCustomers] = useState([
    { id: 1, name: "Pranay", phone: "123456789", email: "pranay@gmail.com", status: "Active" },
    { id: 2, name: "Prabhas", phone: "123456789", email: "prabas@gmail.com", status: "InActive" },
    { id: 3, name: "Sai Krishna", phone: "123456789", email: "saikrishna@gmail.com", status: "Active" },
    { id: 4, name: "Pratab", phone: "123456789", email: "pratab@gmail.com", status: "InActive" },
    { id: 5, name: "Swapna", phone: "123456789", email: "swapna@gmail.com", status: "Active" }
  ]);

  const [invoices, setInvoices] = useState([
    { id: 1, invoiceNo: "Inv021", customer: "Pranay", date: "2025-08-01", amount: "40000", status: "P" },
    { id: 2, invoiceNo: "Inv0213", customer: "Prabhas", date: "2025-08-01", amount: "20000", status: "U" },
    { id: 3, invoiceNo: "Inv0214", customer: "Sai Krishna", date: "2025-08-01", amount: "30000", status: "OD" },
    { id: 4, invoiceNo: "Inv0216", customer: "Pratab", date: "2025-08-01", amount: "40000", status: "PP" },
    { id: 5, invoiceNo: "Inv02118", customer: "Swapna", date: "2025-08-01", amount: "30000", status: "PP" },
  ]);

  const addUser = (newUser) => {
    setUsers(prev => [...prev, { ...newUser, id: prev.length ? prev[prev.length - 1].id + 1 : 1 }]);
  };

  const addCustomer = (newCustomer) => {
    setCustomers(prev => [...prev, { ...newCustomer, id: prev.length ? prev[prev.length - 1].id + 1 : 1 }]);
  };

  // You may also add addInvoice similarly if needed

  return (
    <AppContext.Provider value={{
      users, setUsers, addUser,
      customers, setCustomers, addCustomer,
      invoices, setInvoices
    }}>
      {children}
    </AppContext.Provider>
  );
}
