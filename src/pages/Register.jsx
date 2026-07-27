import { useState } from "react";
import { supabase } from "../supabase";

function Register() {
  const [restaurantName, setRestaurantName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const registerRestaurant = async () => {
    if (
      !restaurantName ||
      !ownerName ||
      !email ||
      !password ||
      !phone ||
      !address
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const { data: authData, error: authError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (authError) {
        alert(authError.message);
        return;
      }

      const user = authData.user;

      const { data: restaurant, error: restaurantError } =
        await supabase
          .from("restaurants")
          .insert({
            name: restaurantName,
            owner_name: ownerName,
            email,
            phone,
            address,
          })
          .select()
          .single();

      if (restaurantError) {
        alert(restaurantError.message);
        return;
      }

      const { error: profileError } =
        await supabase
          .from("profiles")
          .insert({
            id: user.id,
            restaurant_id: restaurant.id,
            role: "manager",
            name: ownerName,
          });

      if (profileError) {
        alert(profileError.message);
        return;
      }

      alert("Restaurant Registered Successfully!");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center p-8">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

        <h1 className="text-4xl font-bold text-center text-[#4B2E2B]">
          RestaurantOS
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Premium AI Restaurant Operating System
        </p>

        <div className="space-y-4">

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Restaurant Name"
            value={restaurantName}
            onChange={(e)=>setRestaurantName(e.target.value)}
          />

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Owner Name"
            value={ownerName}
            onChange={(e)=>setOwnerName(e.target.value)}
          />

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border rounded-xl p-3"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Phone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Address"
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
          />
<p className="text-center mt-6 text-sm">
  Already have an account?{" "}
  <a
    href="/login"
    className="text-[#5C3A2E] font-semibold hover:underline"
  >
    Login
  </a>
</p>
          <button
            onClick={registerRestaurant}
            className="w-full bg-[#4B2E2B] hover:bg-[#6A4038] text-white p-3 rounded-xl font-semibold transition"
          >
            Register Restaurant
          </button>

        </div>

      </div>

    </div>
  );
}

export default Register;