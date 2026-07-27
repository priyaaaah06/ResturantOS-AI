function MenuCard({ item }) {
  return (
    <div className="bg-white shadow rounded-xl p-5 border">

      <h2 className="text-xl font-bold">
        {item.item_name}
      </h2>

      <p className="mt-2">
        Price: ₹{item.price}
      </p>

      <p>
        Preparation Time: {item.prep_time} mins
      </p>

      <p>
        {item.available ? "✅ Available" : "❌ Unavailable"}
      </p>

    </div>
  );
}

export default MenuCard;