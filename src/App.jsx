import { Routes, Route, Link, useParams } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { listings } from "./data/listings";


function PropertyDetails() {
  const { id } = useParams();

  const listing = listings.find(
    (listing) => listing.id === Number(id)
  );

  if (!listing) {
    return (
      <div className="details-page">
        <h1>Listing Not Found</h1>

        <Link to="/">
          <button>Back Home</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="details-page">
      <img
        src={listing.image}
        alt={listing.address}
        className="details-image"
      />

      <h1>{listing.price}</h1>

      <h2>{listing.address}</h2>

      <p>{listing.city}</p>

      <div className="listing-details">
        <span>{listing.beds} Beds</span>
        <span>{listing.baths} Baths</span>
        <span>{listing.sqft} sqft</span>
      </div>

      <p>{listing.description}</p>

      <Link to="/">
        <button>Back Home</button>
      </Link>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/listing/:id"
        element={<PropertyDetails />}
      />
    </Routes>
  );
}

export default App;