const listings = [
  {
    id: 1,
    price: "$425,000",
    address: "123 Cypress Lane",
    city: "Baton Rouge, LA",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  },
  {
    id: 2,
    price: "$315,000",
    address: "45 Oak Drive",
    city: "Denham Springs, LA",
    image:
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126",
  },
  {
    id: 3,
    price: "$599,000",
    address: "78 River Road",
    city: "Prairieville, LA",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
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
          <a href="#areas">Areas</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-overlay">
          <h1>Find Your Next Louisiana Home</h1>

          <p>
            Helping buyers and sellers across Baton Rouge, Denham Springs,
            Prairieville, and surrounding areas.
          </p>

          <div className="hero-buttons">
            <button>Browse Listings</button>
            <button className="secondary-button">Contact Agent</button>
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

              <button>View Details</button>
            </div>
          ))}
        </div>
      </section>

      <section id="areas" className="areas-section">
        <h2>Areas Served</h2>

        <div className="areas-grid">
        <div className="area-card">East Baton Rouge Parish</div>
        <div className="area-card">West Baton Rouge Parish</div>
        <div className="area-card">Livingston Parish</div>
        <div className="area-card">Ascension Parish</div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <h2>Ready To Start Your Home Search?</h2>

        <p>
          Whether buying or selling, Git Real Estate is here to help guide you
          through the process.
        </p>

        <button>Contact Today</button>
      </section>

      <footer className="footer">
        <p>Git Real Estate</p>

        <p>
          Equal Housing Opportunity • Licensed in Louisiana • Brokerage
          information coming soon
        </p>
      </footer>
    </>
  );
}

export default App;