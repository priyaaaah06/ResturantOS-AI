function Dashboard({ restaurant }) {
  if (!restaurant) {
    return <h2>Loading Restaurant...</h2>;
  }

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        🏨 Restaurant Dashboard
      </h1>

      <div
        className="bg-white rounded-xl shadow-lg p-8"
        style={{ maxWidth: "700px" }}
      >

        <h2 className="text-3xl font-bold mb-6">
          {restaurant.name}
        </h2>

        <p className="mb-3">
          <strong>Owner :</strong> {restaurant.owner_name}
        </p>

        <p className="mb-3">
          <strong>Email :</strong> {restaurant.email}
        </p>

        <p className="mb-3">
          <strong>Phone :</strong> {restaurant.phone}
        </p>

        <p className="mb-3">
          <strong>Address :</strong> {restaurant.address}
        </p>

        <p className="mb-3">
          <strong>Description :</strong> {restaurant.description}
        </p>

      </div>

    </div>
  );
}

export default Dashboard;