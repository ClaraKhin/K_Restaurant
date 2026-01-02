import { useState } from "react";
import { menus } from "../../constants";
import { getBgColor } from "../../utils";

const MenuContainer = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
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
              style={{ padding: "1rem", backgroundColor: getBgColor() }}
              onClick={() => setSelectedMenu(menu.id)}
            >
              <div className="flex items-center justify-between w-full">
                <h1
                  className="text-[#ffffff]"
                  style={{ fontSize: "1.125rem", fontWeight: 600 }}
                >
                  {menu.icon} {menu.name}
                </h1>
                {selectedMenu === menu.id && (
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
    </>
  );
};

export default MenuContainer;
