import React, { useState, useMemo } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/action/cart.js";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check if user is logged in
  // const isLoggedIn = useMemo(() => !!sessionStorage.getItem("client"), []);

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce((acc, item) => {
    const numericPrice = parseFloat(item.price.replace(/[^\d.]/g, "")) || 0;
    return acc + item.qty * numericPrice;
  }, 0);

  const quantityChangeHandler = (data, qty) => {
    dispatch(addToCart({ ...data, qty }));
  };

  const handleCheckout = () => {
    const storedUser = sessionStorage.getItem("client");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || !user.role) {
      toast.error("You need to log in before checking out.");
      navigate("/login");
      return; // Stop further execution
    }

    navigate("/checkout");
  };



  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-[99999] flex justify-end">
      <div className="fixed top-0 right-0 h-full w-full max-w-md md:w-[50%] bg-white z-[10000] shadow-lg">
        <div className="flex justify-between p-5 border-b">
          <h5 className="text-xl font-semibold">Your Cart</h5>
          <RxCross1
            size={25}
            className="cursor-pointer"
            onClick={() => setOpenCart(false)}
          />
        </div>
        {cart.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <h5>Cart is empty!</h5>
          </div>
        ) : (
          <>
            <div className="flex items-center p-4">
              <IoBagHandleOutline size={25} />
              <h5 className="pl-2 text-[18px] font-[500]">
                {cart.length} items
              </h5>
            </div>
            <div className="w-full border-t overflow-y-auto max-h-[60vh] p-2">
              {cart.map((item, index) => (
                <CartSingle
                  key={index}
                  data={item}
                  quantityChangeHandler={quantityChangeHandler}
                  removeFromCartHandler={removeFromCartHandler}
                />
              ))}
            </div>
            <div className="px-5 mb-3">
              <button
                onClick={handleCheckout}
                className="h-[45px] flex items-center justify-center w-full bg-[#e44343] rounded-lg"
              >
                <h1 className="text-white text-[16px] md:text-[18px] font-[600]">
                  Checkout Now (Ksh{" "}
                  {totalPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  )
                </h1>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const parsedPrice = useMemo(
    () => parseFloat(data.price.replace(/[^\d.]/g, "")) || 0,
    [data.price]
  );

  const increment = () => {
    if (value >= data.stock) {
      toast.error("Property stock limited!");
      return;
    }
    const newValue = value + 1;
    setValue(newValue);
    quantityChangeHandler(data, newValue);
  };

  const decrement = () => {
    if (value > 1) {
      const newValue = value - 1;
      setValue(newValue);
      quantityChangeHandler(data, newValue);
    }
  };

  return (
    <div className="border-b p-3 flex items-center gap-4">
      <div className="flex flex-col items-center">
        <button
          className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
          onClick={increment}
        >
          <HiPlus size={18} />
        </button>
        <span className="p-2">{value}</span>
        <button
          className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
          onClick={decrement}
        >
          <HiOutlineMinus size={16} />
        </button>
      </div>
      <img
        src={data?.image ?? "fallback-image.jpg"}
        alt={data.name || "Product Image"}
        className="w-24 md:w-32 h-auto rounded-md"
      />
      <div className="flex-1">
        <h1 className="text-lg font-semibold">{data.name}</h1>
        <p className="text-gray-600">
          Ksh {parsedPrice.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          × {value}
        </p>
        <p className="text-red-600 font-bold text-lg">
          Ksh{" "}
          {(parsedPrice * value).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
      <button
        className="text-gray-600 hover:text-red-600"
        onClick={() => removeFromCartHandler(data)}
      >
        <RxCross1 size={20} />
      </button>
    </div>
  );
};

export default Cart;
