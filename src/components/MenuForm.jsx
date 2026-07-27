import { useState } from "react";

function MenuForm({ onAdd }) {

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [prepTime, setPrepTime] = useState("");

  function handleSubmit() {

    onAdd({
      item_name: itemName,
      price: Number(price),
      prep_time: Number(prepTime),
    });

    setItemName("");
    setPrice("");
    setPrepTime("");
  }

  return (

    <div className="space-y-4 bg-white p-6 rounded-xl shadow">

      <input
        className="border p-3 rounded-lg w-full"
        placeholder="Item Name"
        value={itemName}
        onChange={(e)=>setItemName(e.target.value)}
      />

      <input
        className="border p-3 rounded-lg w-full"
        placeholder="Price"
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
      />

      <input
        className="border p-3 rounded-lg w-full"
        placeholder="Preparation Time"
        value={prepTime}
        onChange={(e)=>setPrepTime(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-[#5C3A2E] text-white rounded-lg w-full py-3"
      >
        Add Menu Item
      </button>

    </div>

  );

}

export default MenuForm;