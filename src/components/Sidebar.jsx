import {
  LayoutDashboard,
  UtensilsCrossed,
  Package,
  ClipboardList,
  Users,
  BarChart3,
  Settings
} from "lucide-react";

function Sidebar({ currentPage, setCurrentPage }) {

  const menus = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Menu", icon: UtensilsCrossed },
  
  ];

  return (
    <div className="w-64 bg-[#4B2E2B] text-white min-h-screen">

      <h1 className="text-3xl font-bold p-6">
        RestaurantOS
      </h1>

      {menus.map((menu) => {

        const Icon = menu.icon;

        return (

          <button
            key={menu.name}
            onClick={() => setCurrentPage(menu.name)}
            className={`flex items-center gap-3 w-full px-6 py-4 hover:bg-[#6A4038]
            ${currentPage === menu.name ? "bg-[#6A4038]" : ""}`}
          >

            <Icon size={20} />

            {menu.name}

          </button>

        );

      })}

    </div>
  );

}

export default Sidebar;