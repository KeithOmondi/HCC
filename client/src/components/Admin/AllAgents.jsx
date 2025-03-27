import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from "@mui/material";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getAllAgents } from "../../redux/action/agents";

const AllAgents = () => {
  const dispatch = useDispatch();
  const { agents } = useSelector((state) => state.agent);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllAgents());
    console.log("Agents state:", agents);
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.delete(`${server}/property/delete-agent/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      toast.success(res.data.message);
      dispatch(getAllAgents());
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete agent");
    }
  };
  
  const handleOpenModal = (id) => {
    setUserId(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    setOpen(false);
    handleDelete(userId);
  };

  const columns = [
    { field: "id", headerName: "Agent ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 130, flex: 0.7 },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "address",
      headerName: "Agent Address",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "joinedAt",
      headerName: "Joined At",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "preview",
      flex: 1,
      minWidth: 150,
      headerName: "Preview Property",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/property/preview/${params.id}`}>
          <Button>
            <AiOutlineEye size={20} />
          </Button>
        </Link>
      ),
    },
    {
      field: "delete",
      flex: 1,
      minWidth: 150,
      headerName: "Delete Agent",
      sortable: false,
      renderCell: (params) => (
        <Button onClick={() => handleOpenModal(params.id)}>
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  const rows =
    agents?.map((item) => ({
      id: item._id,
      name: item?.name,
      email: item?.email,
      joinedAt: new Date(item.createdAt).toLocaleDateString(),
      address: item.address,
    })) || [];

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Agents</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>

        {open && (
          <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-[#00000039] z-[999]">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                Are you sure you want to delete this agent?
              </h3>
              <div className="w-full flex items-center justify-center">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirmDelete}
                  className="ml-4"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAgents;
