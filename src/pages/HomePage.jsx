import ListingCard from "../components/ListingCard";
import { listings } from "../data/listings";

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-overlay">
          <h1>Find Your Next Louisiana Home</h1>

          <p>Helping buyers and sellers across the Greater Baton Rouge area.</p>

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
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;