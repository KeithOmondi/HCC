import React, { useEffect } from "react";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactionsOfAdmin } from "../../redux/action/transaction";
import Loader from "../../pages/Loader";
import { getAllAgents } from "../../redux/action/agents";

const AdminDashboardMain = () => {
  const dispatch = useDispatch();

  const { adminTransactions, adminTransactionLoading } = useSelector(
    (state) => state.transaction
  );
  const { agents } = useSelector((state) => state.agent);

  useEffect(() => {
    dispatch(getAllTransactionsOfAdmin());
    dispatch(getAllAgents());
  }, []);

  const adminEarning =
    adminTransactions &&
    adminTransactions.reduce((acc, item) => acc + item.totalPrice * 0.1, 0);

  const adminBalance = adminEarning?.toFixed(2);

  const columns = [
    { field: "id", headerName: "Transaction ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) =>
        params.getValue(params.id, "status") === "Delivered"
          ? "text-green-600 font-semibold"
          : "text-red-600 font-semibold",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "createdAt",
      headerName: "Transaction Date",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const row = [];
  adminTransactions &&
    adminTransactions.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item?.totalPrice + " $",
        status: item?.status,
        createdAt: item?.createdAt.slice(0, 10),
      });
    });

  return (
    <>
      {adminTransactionLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-6 bg-gray-100 min-h-screen">
          <h3 className="text-2xl font-semibold text-gray-800 pb-4">
            Dashboard Overview
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Earnings */}
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
              <div className="flex items-center">
                <AiOutlineMoneyCollect size={30} className="text-gray-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-700">
                  Total Earnings
                </h3>
              </div>
              <h5 className="mt-3 text-2xl font-semibold text-gray-900">
                Ksh 0.00{adminBalance}
              </h5>
            </div>

            {/* All Agents */}
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
              <div className="flex items-center">
                <MdBorderClear size={30} className="text-gray-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-700">All Agents</h3>
              </div>
              <h5 className="mt-3 text-2xl font-semibold text-gray-900">
                {agents && agents.length}
              </h5>
              <Link
                to="/admin-agent"
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                View Agents
              </Link>
            </div>

            {/* All Transactions */}
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
              <div className="flex items-center">
                <AiOutlineMoneyCollect size={30} className="text-gray-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-700">
                  All Transactions
                </h3>
              </div>
              <h5 className="mt-3 text-2xl font-semibold text-gray-900">
                {adminTransactions && adminTransactions.length}
              </h5>
              <Link
                to="/admin-transaction"
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                View Transactions
              </Link>
            </div>
          </div>

          <br />
          <h3 className="text-2xl font-semibold text-gray-800 pb-4">
            Latest Transactions
          </h3>

          <div className="bg-white shadow-md rounded-lg p-4">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={4}
              disableSelectionOnClick
              autoHeight
              className="text-gray-900"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardMain;
