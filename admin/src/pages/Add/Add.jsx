import React, { useState, useEffect } from "react";
import "./Add.css";
import axios from "axios";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

const Add = ({url}) => {
    
    const [image, setimage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: ""
    });

    const onchangehandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onsubmithandler = async (event) => {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append("name", data.name);
        formdata.append("description", data.description);
        formdata.append("price", Number(data.price));
        formdata.append("category", data.category);
        formdata.append("image", image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formdata);
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                    image:""
                });
                setimage(false);
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
                console.error("Failed to add product");
            }
        } catch (error) {
            console.error("Error while submitting form:", error);
        }
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div className="add">
            <form action="" className="flexcol" onSubmit={onsubmithandler}>
                <div className="addimageupload">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input
                        onChange={(e) => setimage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                        required
                    />
                </div>
                <div className="addproductname flexcol">
                    <p>Product name</p>
                    <input
                        onChange={onchangehandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Type here"
                    />
                </div>
                <div className="addproductdiscription flexcol">
                    <p>Product description</p>
                    <textarea
                        onChange={onchangehandler}
                        value={data.description}
                        name="description"
                        rows="6"
                        placeholder="Write content here"
                    ></textarea>
                </div>
                <div className="addcategoryprice">
                    <div className="addcategory flexcol">
                        <p>Product category</p>
                        <select
                            onChange={onchangehandler}
                            name="category"
                            value={data.category}
                        >
                            <option value="salad">salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="deserts">deserts</option>
                            <option value="sandwich">sandwich</option>
                            <option value="cake">cake</option>
                            <option value="pure-veg">Pure-veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="noodles">noodles</option>
                        </select>
                    </div>
                    <div className="addprice flexcol">
                        <p>Product Price</p>
                        <input
                            onChange={onchangehandler}
                            value={data.price}
                            type="Number"
                            name="price"
                            placeholder="$20"
                        />
                    </div>
                </div>
                <button type="submit" className="addbutton">
                    Add
                </button>
            </form>
        </div>
    );
};

export default Add;
