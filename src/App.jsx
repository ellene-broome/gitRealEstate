const listings = [
  {
    id: 1,
    price: "$425,000",
    address: "123 Cypress Lane",
    city: "Baton Rouge, LA",
    beds: 4,
    baths: 3,
    sqft: 2400,
  },
  {
    id: 2,
    price: "$315,000",
    address: "45 Oak Drive",
    city: "Denham Springs, LA",
    beds: 3,
    baths: 2,
    sqft: 1850,
  },
  {
    id: 3,
    price: "$599,000",
    address: "78 River Road",
    city: "Prairieville, LA",
    beds: 5,
    baths: 4,
    sqft: 3200,
  },
];

function App() {
  return (
    <>
      <header className="navbar">
        <div className="logo">Git Real Estate</div>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#listings">Listings</a>
          <a href="#buyers">Buyers</a>
          <a href="#sellers">Sellers</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="home" className="hero">
        <h1>Git Real Estate</h1>
        <p>A real estate platform being built one commit at a time.</p>
        <button>Start Searching</button>
      </main>

      <section id="listings" className="listings-section">
        <h2>Featured Listings</h2>

        <div className="listing-grid">
          {listings.map((listing) => (
            <div key={listing.id} className="listing-card">
              <div className="listing-image"></div>

              <h3>{listing.price}</h3>

              <p>{listing.address}</p>

              <p>{listing.city}</p>

              <div className="listing-details">
                <span>{listing.beds} Beds</span>
                <span>{listing.baths} Baths</span>
                <span>{listing.sqft} sqft</span>
              </div>

              <button>View Details</button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default App;