import { Routes, Route, Link, useParams } from "react-router-dom";

const listings = [
  {
    id: 1,
    price: "$425,000",
    address: "123 Cypress Lane",
    city: "Baton Rouge, LA",
    beds: 4,
    baths: 3,
    sqft: 2400,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    description:
      "Beautiful modern home located near shopping, restaurants, and great schools.",
  },
  {
    id: 2,
    price: "$315,000",
    address: "45 Oak Drive",
    city: "Denham Springs, LA",
    beds: 3,
    baths: 2,
    sqft: 1850,
    image:
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126",
    description:
      "Charming family home with spacious backyard and updated kitchen.",
  },
  {
    id: 3,
    price: "$599,000",
    address: "78 River Road",
    city: "Prairieville, LA",
    beds: 5,
    baths: 4,
    sqft: 3200,
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
    description:
      "Luxury property featuring large living spaces and premium finishes.",
  },
];

function HomePage() {
  return (
    <>
      <header className="navbar">
        <div className="logo">Git Real Estate</div>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#listings">Listings</a>
          <a href="#buyers">Buyers</a>
          <a href="#sellers">Sellers</a>
          <a href="#areas">Areas</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-overlay">
          <h1>Find Your Next Louisiana Home</h1>

          <p>
            Helping buyers and sellers across the Greater Baton Rouge area.
          </p>

          <div className="hero-buttons">
            <button>Browse Listings</button>

            <button className="secondary-button">
              Contact Agent
            </button>
          </div>
        </div>
      </section>

      <section id="listings" className="listings-section">
        <h2>Featured Listings</h2>

        <div className="listing-grid">
          {listings.map((listing) => (
            <div key={listing.id} className="listing-card">
              <img
                src={listing.image}
                alt={listing.address}
                className="listing-image"
              />

              <h3>{listing.price}</h3>

              <p>{listing.address}</p>

              <p>{listing.city}</p>

              <div className="listing-details">
                <span>{listing.beds} Beds</span>
                <span>{listing.baths} Baths</span>
                <span>{listing.sqft} sqft</span>
              </div>

              <Link to={`/listing/${listing.id}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

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