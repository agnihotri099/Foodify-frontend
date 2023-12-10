import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export const Card = (props) => {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  // let foodItem = props.item;

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      // console.log(item.id);
      // console.log(props.foodItems);
      
      if (item.id === props.foodItems._id) {
        food = item;
         
        
        break;
      }
    }
    console.log(food);
    console.log(new Date())
    if(food.length !== 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItems._id,
          price: finalPrice,
          qty: qty,
        });
        console.log(new Date());
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItems._id,
          name: props.foodItems.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.foodItems.img,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }
    console.log("Hi");
    
    await dispatch({
      type: "ADD",
      id: props.foodItems._id,
      name: props.foodItems.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.foodItems.img,
    });
    
    console.log(data);
    
  };

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img
            src={props.foodItems.img}
            className="card-img-top"
            style={{ maxHeight: "150px", objectFit: "fill" }}
            alt=""
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItems.name}</h5>
            <div className="container w-100">
              <select
                className="m-2 h-100  bg-success rounded"
                onChange={(e) => {
                  setQty(e.target.value);
                }}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <select
                className="m-2 h-100  bg-success rounded"
                ref={priceRef}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              >
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>

              <div className="d-inline h-100 fs-5">Rs.{finalPrice}</div>
            </div>
            <hr />
            <button
              className="btn btn-success justify-center ms-2"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
