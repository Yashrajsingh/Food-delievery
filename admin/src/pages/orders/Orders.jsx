import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Orders.css";
import { assets } from "C:/Users/Dell/Desktop/Food delievery/admin/src/assets/assets.js";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (error) {
      toast.error("Error fetching orders.");
      console.error("Fetch orders error:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []); // Runs only once when component mounts

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="orderlist">
        {orders.map((order, index) => (
          <div key={index} className="orderitem">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <p>Order ID: {order._id}</p>
            <p>User ID: {order.userId}</p>
            <p>Total Amount: ${order.amount}</p>
            <p>Address: {order.address.street}, {order.address.city}</p>
            <p>Status: <strong>{order.status || "Pending"}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
