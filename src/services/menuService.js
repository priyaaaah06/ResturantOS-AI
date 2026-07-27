import { supabase } from "../supabase";

// Get logged-in user's restaurant ID
export async function getRestaurantId() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not logged in");

  const { data, error } = await supabase
    .from("profiles")
    .select("restaurant_id")
    .eq("id", user.id)
    .single();

  if (error) throw error;

  return data.restaurant_id;
}

// Fetch menu items
export async function fetchMenuItems(restaurantId) {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

// Add menu item
export async function addMenuItem(item) {
  const { error } = await supabase
    .from("menu_items")
    .insert(item);

  if (error) throw error;
}

// Delete menu item
export async function deleteMenuItem(id) {
  const { error } = await supabase
    .from("menu_items")
    .delete()
    .eq("id", id);

  if (error) throw error;
}