import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";

const AllListings = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${server}/listing/admin-all-listings`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(res.data?.listings || []);
      } catch (error) {
        console.error("Error fetching listings:", error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const columns = [
    { field: "id", headerName: "Listing Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    { field: "availability", headerName: "Availability", minWidth: 100, flex: 0.6 },
    { field: "sold", headerName: "Sold", minWidth: 130, flex: 0.6 },
    {
      field: "Preview",
      headerName: "Preview",
      flex: 0.8,
      minWidth: 100,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/listing/${params.row.id}`}>
          <Button>
            <AiOutlineEye size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  const rows = data.map((item) => ({
    id: item._id,
    name: item.name,
    price: `Ksh ${item.discountPrice || "0.00"}`,
    availability: item.availability || "Unknown",
    sold: item.sold_out !== undefined ? item.sold_out : "N/A",
  }));

  return (
    <div className="w-full mx-8 pt-1 mt-10 bg-white">
      {loading ? (
        <p className="text-center">Loading listings...</p>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          disableSelectionOnClick
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        />
      )}
    </div>
  );
};

export default AllListings;
