import { useState } from "react";
import { menus } from "../../constants";
// import { getBgColor } from "../../utils";

const MenuContainer = () => {
  const [selectedMenu, setSelectedMenu] = useState(menus[0]);
  const [hover, setHover] = useState(null);
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
              onClick={() => setSelectedMenu(menu)}
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
        {selectedMenu?.items.map((menu) => {
          return (
            <div
              onMouseEnter={() => setHover(menu.id)}
              onMouseLeave={() => setHover(null)}
              key={menu.id}
              className="flex flex-col items-start justify-between h-[150px] rounded-lg cursor-pointer"
              style={{
                padding: "1rem",
                backgroundColor: hover === menu.id ? "#7d7c7c3b" : "#1d1716",
              }}
            >
              <div className="flex items-center justify-between w-full">
                <h1
                  className="text-[#ffffff]"
                  style={{ fontSize: "1.125rem", fontWeight: 600 }}
                >
                  {menu.name}
                </h1>
              </div>

              <p
                className="text-[#ffffff] "
                style={{ fontSize: "1rem", fontWeight: 700 }}
              >
                ${menu.price}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MenuContainer;
