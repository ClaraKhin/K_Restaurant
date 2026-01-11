import { useEffect, useRef } from "react";
import { DeleteOutlined, FolderAddOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeItem } from "../../redux/slices/cartSlice";

const CartInfo = () => {
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    } // Scroll to the bottom of the container
  }, [cartData]); // Update the scroll position when cartData changes

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  }; // Remove an item from the cart

  return (
    <div
      style={{
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
      }}
    >
      <h1
        className="text-[#e4e4e4] tracking-wide"
        style={{ fontSize: "1.125rem", fontWeight: 600 }}
      >
        Order Details
      </h1>
      <div
        className="h-[380px]"
        style={{
          marginTop: "1rem",
          overflowY: "scroll",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
        ref={scrollRef}
      >
        {cartData.length === 0 ? (
          <p
            className="text-[#ababab] flex justify-center items-center h-[380px]"
            style={{ fontSize: "0.875rem", lineHeight: "1.25rem" }}
          >
            Your cart is empty. Start adding items!
          </p>
        ) : (
          cartData.map((item) => {
            return (
              <div
                className="bg-[#2A221E] rounded-lg "
                style={{
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                <div className="flex items-center justify-between">
                  <h1
                    className="text-[#ababab] tracking-wide"
                    style={{ fontSize: "1rem", fontWeight: 600 }}
                  >
                    {item.name}
                  </h1>
                  <p className="text-[#ababab]" style={{ fontWeight: "600" }}>
                    x{item.quantity}
                  </p>
                </div>
                <div
                  className="flex items-center justify-between"
                  style={{ marginTop: "0.75rem" }}
                >
                  <div className="flex items-center gap-3">
                    <DeleteOutlined
                      onClick={() => handleRemove(item.id)}
                      style={{
                        color: "#ababab",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                      }}
                    />
                    <FolderAddOutlined
                      style={{
                        color: "#ababab",
                        fontSize: "1.25rem",
                        cursor: "pointer",
                      }}
                    />
                  </div>

                  <p
                    className="text-[#FFFFFF]"
                    style={{ fontSize: "1rem", fontWeight: 700 }}
                  >
                    ${item.price}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CartInfo;
