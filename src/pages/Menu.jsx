import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import Papa from "papaparse";
function Menu() {
  const [restaurantId, setRestaurantId] = useState("");
const [menuItems, setMenuItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [prepTime, setPrepTime] = useState("");
const [editingId, setEditingId] = useState(null);
const [isEditing, setIsEditing] = useState(false);
const [csvFile, setCsvFile] = useState(null);
  // Get restaurant ID when page loads
  useEffect(() => {
    getRestaurantId();
  }, []);

  useEffect(() => {
  if (restaurantId) {
    fetchMenuItems();
  }
}, [restaurantId]);



  async function getRestaurantId() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login again");
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("restaurant_id")
      .eq("id", user.id)
      .single();

    if (error) {
      console.log(error);
      alert("Restaurant not found");
      return;
    }

    setRestaurantId(data.restaurant_id);
  }

  async function addMenuItem() {
    if (!itemName || !price || !prepTime) {
      alert("Fill all fields");
      return;
    }

    const { error } = await supabase
      .from("menu_items")
      .insert({
        restaurant_id: restaurantId,
        item_name: itemName,
        price: Number(price),
        prep_time: Number(prepTime),
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Menu Item Added Successfully!");

    setItemName("");
    setPrice("");
    setPrepTime("");
    fetchMenuItems();
  }

  async function fetchMenuItems() {
  if (!restaurantId) return;

  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .order("created_at", { ascending: false });

  if (error) {
    alert(error.message);
    return;
  }

  setMenuItems(data);
}
async function deleteMenuItem(id) {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this menu item?"
  );

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("menu_items")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Menu Item Deleted!");

  fetchMenuItems();

}

function editMenuItem(item) {

  setEditingId(item.id);

  setIsEditing(true);

  setItemName(item.item_name);

  setPrice(item.price);

  setPrepTime(item.prep_time);

}
async function updateMenuItem() {

  const { error } = await supabase
    .from("menu_items")
    .update({
      item_name: itemName,
      price: Number(price),
      prep_time: Number(prepTime),
    })
    .eq("id", editingId);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Menu Updated Successfully!");

  setEditingId(null);
  setIsEditing(false);

  setItemName("");
  setPrice("");
  setPrepTime("");

  fetchMenuItems();

}

async function uploadCSV() {

  if (!csvFile) {
    alert("Please choose a CSV file.");
    return;
  }

  Papa.parse(csvFile, {

    header: true,

    skipEmptyLines: true,

    complete: async (results) => {

      const rows = results.data.map((row) => ({
        restaurant_id: restaurantId,
        item_name: row.item_name,
        price: Number(row.price),
        prep_time: Number(row.prep_time),
      }));

      const { error } = await supabase
        .from("menu_items")
        .insert(rows);

      if (error) {
        alert(error.message);
        return;
      }

      alert("CSV Uploaded Successfully!");

      fetchMenuItems();

    },

  });

}
  return (
    <div style={{ padding: "30px" }}>
      <h1>Menu Management</h1>

      <input
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Preparation Time"
        value={prepTime}
        onChange={(e) => setPrepTime(e.target.value)}
      />

      <br /><br />

      <button
  onClick={isEditing ? updateMenuItem : addMenuItem}
>
  {isEditing ? "Update Menu Item" : "Add Menu Item"}
</button>
<hr style={{ margin: "30px 0" }} />

<h2>Upload Menu CSV</h2>

<input
  type="file"
  accept=".csv"
  onChange={(e) => setCsvFile(e.target.files[0])}
/>

<br /><br />

<button
  onClick={uploadCSV}
>
  Upload CSV
</button>

<hr style={{ margin: "30px 0" }} />
      <hr style={{ margin: "30px 0" }} />

<h2>Current Menu</h2>

{
menuItems.length === 0 ? (

<p>No menu items found.</p>

) : (

menuItems.map((item) => (

<div
key={item.id}
style={{
border:"1px solid #ccc",
padding:"15px",
marginBottom:"10px",
borderRadius:"10px"
}}
>

<h3>{item.item_name}</h3>

<p>Price : ₹{item.price}</p>

<p>Preparation Time : {item.prep_time} mins</p>
<button
  onClick={() => deleteMenuItem(item.id)}
  style={{
    background: "red",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  }}
>
  Delete
</button>
<button
  onClick={() => editMenuItem(item)}
  style={{
    background: "green",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
    marginRight: "10px",
  }}
>
  Edit
</button>
</div>

))

)
}
    </div>
  );
}

export default Menu;