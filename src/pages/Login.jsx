import { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginRestaurant = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#F4EDE4] to-[#EADBC8] flex items-center justify-center">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[420px]">

        <h1 className="text-4xl font-bold text-center text-[#5C3A2E]">
          RestaurantOS
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Welcome Back
        </p>

        <div className="space-y-5">

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

          <button
            onClick={loginRestaurant}
            className="w-full bg-[#5C3A2E] text-white rounded-xl py-3 hover:bg-[#3E2723] transition"
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;