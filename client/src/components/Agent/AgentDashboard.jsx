import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FiHome,
  FiBarChart2,
  FiUsers,
  FiFileText,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import AgentHeader from "../Layout/AgentHeader";

const AgentDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const data = [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 300 },
    { month: "Mar", sales: 500 },
    { month: "Apr", sales: 700 },
    { month: "May", sales: 800 },
    { month: "Jun", sales: 600 },
  ];

  return (
    <>
      <AgentHeader />
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar Toggle Button for Mobile */}
        <button
          className="md:hidden p-4 absolute top-20 left-4 z-50 bg-blue-600 text-white rounded-full shadow-lg"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <FiMenu size={24} />
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 w-72 bg-white p-6 shadow-lg flex flex-col space-y-6 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 md:relative`}
        >
          <h2 className="text-2xl font-semibold text-blue-600">
            Agent Dashboard
          </h2>
          <nav>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/agent-dashboard"
                  className="flex bg-blue-300 items-center space-x-2 p-3 text-gray-700 hover:bg-blue-100 rounded-lg"
                >
                  <FiHome /> <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center space-x-2 p-3 text-gray-700 hover:bg-blue-100 rounded-lg"
                >
                  <FiBarChart2 /> <span>Properties</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center space-x-2 p-3 text-gray-700 hover:bg-blue-100 rounded-lg"
                >
                  <FiUsers /> <span>Agents</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center space-x-2 p-3 text-gray-700 hover:bg-blue-100 rounded-lg"
                >
                  <FiFileText /> <span>Reports</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center space-x-2 p-3 text-gray-700 hover:bg-blue-100 rounded-lg"
                >
                  <FiSettings /> <span>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Sales Overview
          </h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-600">Total Sales</h3>
              <p className="text-2xl font-semibold text-blue-600">$24,000</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-600">New Clients</h3>
              <p className="text-2xl font-semibold text-green-600">+120</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-600">Pending Deals</h3>
              <p className="text-2xl font-semibold text-red-500">8</p>
            </div>
          </div>

          {/* Sales Chart */}
          <div className="bg-white p-4 md:p-6 shadow-md rounded-lg mb-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#4F46E5"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activities */}
          <div className="bg-white p-4 md:p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-3 md:mb-4">
              Recent Activities
            </h3>
            <ul className="space-y-3">
              <li className="p-3 bg-gray-100 rounded-md">
                John Doe closed a deal on a property worth $450,000.
              </li>
              <li className="p-3 bg-gray-100 rounded-md">
                Jane Smith added a new property listing in New York.
              </li>
              <li className="p-3 bg-gray-100 rounded-md">
                Michael Johnson updated client details for a high-priority lead.
              </li>
            </ul>
          </div>
        </main>
      </div>
    </>
  );
};

export default AgentDashboard;
