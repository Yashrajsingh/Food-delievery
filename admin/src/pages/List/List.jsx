import React, { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {

    const [list, setList] = useState([]); // Initialize as an array

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setList(response.data.data);
                toast.success("Food list loaded successfully!");
            } else {
                toast.error("Failed to load food list.");
            }
        } catch (error) {
            console.error("Error fetching the food list:", error);
            toast.error("An error occurred while fetching the list.");
        }
    };

    const removeFood = async(foodId) => {
        const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
        await fetchList();
        if(response.data.success){
            toast.success(response.data.message)
        } else{
            toast.error("error")
        }
    }

    useEffect(() => {
        fetchList(); // Fetch the list on component mount
    }, []);

    return (
        <div className="list flexcol">
            <p className="p1">All Foods List</p>
            <div className="listtableformat title">
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>
            </div>
            {list.length > 0 ? (
                list.map((item, index) => (
                    <div key={index} className="listtableformat row">
                        <img src={`${url}/images/${item.Image}`} alt={item.name} className="food-image" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>${item.price}</p>
                        <p onClick={() => removeFood(item._id)} className="cursor"> x</p>
                    </div>
                ))
            ) : (
                <p>No foods found. Please add some foods.</p>
            )}
        </div>
    );
};

export default List;
