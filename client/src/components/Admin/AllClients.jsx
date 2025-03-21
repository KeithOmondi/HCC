import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
import { Button } from "@mui/material";
import { getAllClients } from "../../redux/action/client";

const AllClients = () => {
  const dispatch = useDispatch();
  // const { clients } = useSelector((state) => state.client.clients);
  const [open, setOpen] = useState(false);
  const [clientId, setClientId] = useState("");
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const result = await dispatch(getAllClients());
        console.log("Fetched clients directly:", result);
        setClients(result);
      } catch (err) {
        console.error("Failed to fetch clients", err);
      }
    };
    fetchClients();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${server}/client/delete-client/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      dispatch(getAllClients()); // Refetch the updated client list
    } catch (error) {
      console.error("Delete Client Error:", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to delete client";
      toast.error(errorMessage);
    }
  };

  const columns = [
    { field: "id", headerName: "Client ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 130, flex: 0.7 },
    { field: "email", headerName: "Email", minWidth: 130, flex: 0.7 },
    { field: "role", headerName: "Client Role", minWidth: 130, flex: 0.7 },
    { field: "joinedAt", headerName: "Joined At", minWidth: 130, flex: 0.8 },
    {
      field: "actions",
      headerName: "Delete Client",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => {
            setClientId(params.row.id);
            setOpen(true);
          }}
        >
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  const rows = useMemo(
    () =>
      clients.map((item) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        joinedAt: new Date(item.createdAt).toISOString().split("T")[0],
      })),
    [clients]
  );

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Clients</h3>
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
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1
                  size={25}
                  onClick={() => {
                    setOpen(false);
                    setClientId("");
                  }}
                />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                Are you sure you want to delete this user?
              </h3>
              <div className="w-full flex items-center justify-center">
                <div
                  className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer text-white text-[18px] mr-4"
                  onClick={() => {
                    setOpen(false);
                    setClientId("");
                  }}
                >
                  Cancel
                </div>
                <div
                  className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer text-white text-[18px] ml-4"
                  onClick={() => {
                    setOpen(false);
                    handleDelete(clientId);
                    setClientId("");
                  }}
                >
                  Confirm
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllClients;
