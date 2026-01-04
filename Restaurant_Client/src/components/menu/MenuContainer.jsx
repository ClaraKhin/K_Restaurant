import { useState } from "react";
import { menus } from "../../constants";
// import { getBgColor } from "../../utils";

const MenuContainer = () => {
  const [selectedMenu, setSelectedMenu] = useState(menus[0]);
  const [hover, setHover] = useState(null);
  const [itemCount, setItemCount] = useState({});

  const getUniqueId = (menuId, itemId) => {
    // Create a unique ID by combining menuId and itemId
    return `${menuId}-${itemId}`; // e.g., "1-3" for menuId 1 and itemId 3
  };

  const itemCountIncrement = (menuId, itemId) => {
    // Accept both menuId and itemId
    const uniqueId = getUniqueId(menuId, itemId); // Create a unique ID for each item
    setItemCount((prev) => ({
      // Update state based on previous state
      ...prev,
      [uniqueId]: (prev[uniqueId] || 0) >= 4 ? 4 : (prev[uniqueId] || 0) + 1, // Limit max count to 4
    })); // Update the count for the specific item
  };

  const itemCountDecrement = (menuId, itemId) => {
    const uniqueId = getUniqueId(menuId, itemId);
    setItemCount((prev) => ({
      ...prev,
      [uniqueId]: (prev[uniqueId] || 0) > 0 ? prev[uniqueId] - 1 : 0,
    }));
  };
  return (
    <>
      <div
        className="grid grid-cols-4 gap-4 w-[100%]"
        style={{
          paddingLeft: "2.5rem",
          paddingRight: "2.5rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        {menus.map((menu) => {
          return (
            <div
              key={menu.id}
              className="flex flex-col items-start justify-between h-[100px] rounded-lg cursor-pointer"
              style={{ padding: "1rem", backgroundColor: menu.bgColor }}
              onClick={() => {
                setSelectedMenu(menu);
                setItemId(0);
                setItemCount(0);
              }}
            >
              <div className="flex items-center justify-between w-full">
                <h1
                  className="text-[#ffffff]"
                  style={{ fontSize: "1.125rem", fontWeight: 600 }}
                >
                  {menu.icon} {menu.name}
                </h1>
                {selectedMenu?.id === menu.id && (
                  <div className="w-[30px] h-[30px]  bg-[#000000] rounded-full flex items-center justify-center ">
                    {menu.icon}
                  </div>
                )}
              </div>

              <p
                className="text-[#ababab] "
                style={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                {menu.items.length} Items
              </p>
            </div>
          );
        })}
      </div>

      <hr style={{ borderTop: "1px solid #faf0dc2a", marginTop: "1rem" }} />

      <div
        className="grid grid-cols-4 gap-4 w-[100%]"
        style={{
          paddingLeft: "2.5rem",
          paddingRight: "2.5rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        {selectedMenu?.items.map((item) => {
          // Iterate over items of the selected menu
          const uniqueId = getUniqueId(selectedMenu.id, item.id); // Create a unique ID for each item
          const count = itemCount[uniqueId] || 0;
          return (
            <div
              onMouseEnter={() => setHover(item.id)}
              onMouseLeave={() => setHover(null)}
              key={item.id}
              className="flex flex-col items-start justify-between h-[150px] rounded-lg cursor-pointer"
              style={{
                padding: "1rem",
                backgroundColor: hover === item.id ? "#7d7c7c3b" : "#1d1716",
              }}
            >
              <h1
                className="text-[#ffffff]"
                style={{ fontSize: "1.125rem", fontWeight: 600 }}
              >
                {item.name}
              </h1>
              <div className="flex items-center justify-between w-full">
                <p
                  className="text-[#ffffff] "
                  style={{ fontSize: "1rem", fontWeight: 700 }}
                >
                  ${item.price}
                </p>

                <div
                  className="flex items-center justify-between rounded-lg"
                  style={{
                    backgroundColor: "#2A221E",
                    paddingLeft: "0.5rem",
                    paddingRight: "0.5rem",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                  }}
                >
                  <button
                    onClick={() => itemCountDecrement(selectedMenu.id, item.id)}
                    style={{
                      color: "#F59E0B",
                      fontSize: "1.5rem",
                      cursor: "pointer",
                    }}
                  >
                    &minus;
                  </button>
                  <span
                    className="text-[#FFFFFF]"
                    style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
                  >
                    {count}
                  </span>
                  <button
                    onClick={() => itemCountIncrement(selectedMenu.id, item.id)}
                    style={{
                      color: "#F59E0B",
                      fontSize: "1.5rem",
                      cursor: "pointer",
                    }}
                  >
                    &#43;
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MenuContainer;
