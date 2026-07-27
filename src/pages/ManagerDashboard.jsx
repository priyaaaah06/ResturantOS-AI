
import Sidebar from "../components/Sidebar";

import Dashboard from "./Dashboard";
import Menu from "./Menu";

import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function ManagerDashboard() {
const [restaurant, setRestaurant] = useState(null);
  const [currentPage, setCurrentPage] = useState("Dashboard");
useEffect(() => {
  loadRestaurant();
}, []);

async function loadRestaurant() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  // Get restaurant_id from profiles
  const { data: profile } = await supabase
    .from("profiles")
    .select("restaurant_id")
    .eq("id", user.id)
    .single();

  if (!profile) return;

  // Fetch restaurant details
  const { data } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", profile.restaurant_id)
    .single();

  setRestaurant(data);
}
  return (

    <div className="flex">

      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className="flex-1 p-10 bg-gray-100 min-h-screen">

        {currentPage === "Dashboard" && (
  <Dashboard restaurant={restaurant} />
)}

        {currentPage === "Menu" && <Menu />}


      </div>

    </div>

  );

}

export default ManagerDashboard;
