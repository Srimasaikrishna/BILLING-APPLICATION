import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { useNavigate } from "react-router-dom";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const summary = {
  revenue: "₹ 3,15,000",
  invoices: 62,
  payments: 57,
  overdue: 6,
  success: "91.9%"
};

const dummyRevenueTrends = [
  { month: "Jan", revenue: 21000 }, { month: "Feb", revenue: 23000 },
  { month: "Mar", revenue: 22500 }, { month: "Apr", revenue: 18000 },
  { month: "May", revenue: 34000 }, { month: "Jun", revenue: 25000 },
  { month: "Jul", revenue: 19000 }, { month: "Aug", revenue: 31000 },
  { month: "Sep", revenue: 27300 }, { month: "Oct", revenue: 32000 },
  { month: "Nov", revenue: 26000 }, { month: "Dec", revenue: 33000 }
];

const paymentMethodBreakdown = [
  { name: "Credit/Debit", value: 26 },
  { name: "UPI", value: 21 },
  { name: "QR", value: 10 }
];

const COLORS = ["#2997b6", "#FFB700", "#4BC07B"];

const topCustomers = [
  { name: "Sai Krishna", invoices: 9, paid: "₹ 54,000" },
  { name: "Pranay", invoices: 7, paid: "₹ 42,000" },
  { name: "Swapna", invoices: 5, paid: "₹ 37,000" },
  { name: "Prabhas", invoices: 4, paid: "₹ 22,000" }
];

export default function ReportingAnalytics() {
  const [selectedMonth, setSelectedMonth] = useState("Jun");
  const [selectedYear, setSelectedYear] = useState("2025");
  const navigate = useNavigate();

  return (
    <div style={{
      background: "#fff",
      borderRadius: "18px",
      margin: "40px auto",
      padding: "38px 50px",
      maxWidth: "1100px",
      minHeight: "620px",
      boxShadow: "0 0 24px rgba(0,0,0,0.09)"
    }}>
      {/* Header with Back button */}
      <div style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "28px",
        gap: "13px",
        justifyContent: "space-between"
      }}>
        <span style={{ color: "#1888A3", fontSize: "24px", fontWeight: "700" }}>
          Reporting & Analytics
        </span>
        <button
          onClick={() => navigate("/admindashboard")}
          style={{
            background: "#111",
            color: "#fff",
            border: "none",
            borderRadius: "22px",
            padding: "9px 38px",
            fontWeight: "600",
            fontSize: "17px",
            cursor: "pointer"
          }}
        >
          Back
        </button>
      </div>

      {/* Filters: Month and Year */}
      <div style={{
        display: "flex", gap: "38px", alignItems: "center", marginBottom: "30px"
      }}>
        <div>
          <label htmlFor="month" style={{ fontWeight: 500, fontSize: "17px", marginRight: "8px" }}>Month:</label>
          <select
            id="month"
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            style={{ padding: "9px 20px", borderRadius: "12px", border: "1px solid #bcd6e1", fontWeight: "500", fontSize: "17px" }}
          >
            {months.map(m => (<option key={m}>{m}</option>))}
          </select>
        </div>
        <div>
          <label htmlFor="year" style={{ fontWeight: 500, fontSize: "17px", marginRight: "8px" }}>Year:</label>
          <select
            id="year"
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
            style={{ padding: "9px 20px", borderRadius: "12px", border: "1px solid #bcd6e1", fontWeight: "500", fontSize: "17px" }}
          >
            <option>2024</option>
            <option>2025</option>
          </select>
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: "flex", gap: "34px", marginBottom: "38px" }}>
        <SummaryCard title="Total Revenue" value={summary.revenue} />
        <SummaryCard title="Invoices" value={summary.invoices} />
        <SummaryCard title="Payments" value={summary.payments} />
        <SummaryCard title="Overdue" value={summary.overdue} />
        <SummaryCard title="Success Rate" value={summary.success} />
      </div>

      {/* Charts and Tables */}
      <div style={{ display: "flex", gap: "32px" }}>
        {/* Revenue bar chart */}
        <div style={cardBoxStyle}>
          <h3 style={boxHeader}>Revenue Trend</h3>
          <div style={chartContainerStyle}>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={dummyRevenueTrends}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#2997b6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment method pie chart */}
        <div style={cardBoxStyle}>
          <h3 style={boxHeader}>Payment Method Breakdown</h3>
          <div style={chartContainerStyle}>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie data={paymentMethodBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={42} label>
                  {paymentMethodBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul style={{ fontSize: "15px", marginTop: "21px", color: "#333" }}>
            {paymentMethodBreakdown.map(pm => (
              <li key={pm.name}>{pm.name}: <b>{pm.value}</b> payments</li>
            ))}
          </ul>
        </div>

        {/* Top customers table */}
        <div style={cardBoxStyle}>
          <h3 style={boxHeader}>Top Customers</h3>
          <table style={{
            width: "100%",
            fontSize: 15,
            borderCollapse: "collapse"
          }}>
            <thead>
              <tr style={{ background: "#eff8fa" }}>
                <th style={tableTh}>Name</th>
                <th style={tableTh}>Invoices</th>
                <th style={tableTh}>Paid</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers.map(cust => (
                <tr key={cust.name}>
                  <td style={tableTd}>{cust.name}</td>
                  <td style={tableTd}>{cust.invoices}</td>
                  <td style={tableTd}>{cust.paid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div style={{
      background: "#eaf7fa",
      borderRadius: "14px",
      textAlign: "center",
      padding: "24px 16px",
      minWidth: "154px",
      fontWeight: "600",
      color: "#037788",
      fontSize: "21px",
      boxShadow: "0 0 10px rgba(159,219,224,0.07)"
    }}>
      <div style={{ fontSize: "17px", color: "#2997b6", fontWeight: "500", marginBottom: "8px" }}>{title}</div>
      <div style={{ fontSize: "27px", fontWeight: "700" }}>{value}</div>
    </div>
  );
}

const cardBoxStyle = {
  flex: "1",
  background: "#f9fbfc",
  borderRadius: "14px",
  padding: "21px 24px",
  minWidth: "230px",
  boxShadow: "0 2px 6px rgba(188,214,225,0.08)"
};

const boxHeader = {
  color: "#1888A3",
  fontWeight: "700",
  fontSize: "18px",
  marginBottom: "18px"
};

const chartContainerStyle = {
  background: "#eaf2f9",
  borderRadius: "10px",
  height: "120px",
  marginBottom: "8px",
  display: "flex", alignItems: "center", justifyContent: "center"
};

const tableTh = {
  padding: "10px 0",
  fontWeight: "600",
  color: "#2997b6",
  borderBottom: "1px solid #e3ebef"
};

const tableTd = {
  padding: "12px 0",
  color: "#3c4858",
  fontWeight: "500",
  borderBottom: "1px solid #f1f3f7"
};
