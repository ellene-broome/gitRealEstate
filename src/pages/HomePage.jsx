import ListingCard from "../components/ListingCard";
import { listings } from "../data/listings";
import Navbar from "../components/Navbar";
import { useState } from "react";

function HomePage() {
    const [cityFilter, setCityFilter] = useState("");

    const [bedsFilter, setBedsFilter] = useState("");

    const [maxPrice, setMaxPrice] = useState("");

        const [sortOrder, setSortOrder] = useState("");
  return (
    <>
    <Navbar />
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
    <section className="filters-section">
  <h2>Search Listings</h2>

        <div className="filters">
    <input
      type="text"
      placeholder="Filter by city..."
      value={cityFilter}
      onChange={(event) =>
        setCityFilter(event.target.value)
      }
        />

     <input
      type="number"
      placeholder="Minimum beds"
      value={bedsFilter}
      onChange={(event) =>
        setBedsFilter(event.target.value)
      }
    />

    <input
        type="number"
         placeholder="Max price"
        value={maxPrice}
        onChange={(event) => setMaxPrice(event.target.value)}
    />

    <select
        value={sortOrder}
        onChange={(event) => setSortOrder(event.target.value)}
    >
        <option value="">Sort by</option>
        <option value="low-to-high">Price: Low to High</option>
        <option value="high-to-low">Price: High to Low</option>
    </select>
        </div>
    </section>

      <section id="listings" className="listings-section">
        <h2>Featured Listings</h2>

        <div className="listing-grid">
          {listings
            .filter((listing) => {
                const listingPrice = Number(
                    listing.price.replace("$", "").replace(",", "")
        );

                const matchesCity = listing.city
                    .toLowerCase()
                    .includes(cityFilter.toLowerCase());

                const matchesBeds =
                    bedsFilter === "" || listing.beds >= Number(bedsFilter);

                const matchesMaxPrice =
                    maxPrice === "" || listingPrice <= Number(maxPrice);

                return matchesCity && matchesBeds && matchesMaxPrice;
        })
        .sort((a, b) => {
                const priceA = Number(a.price.replace("$", "").replace(",", ""));
                const priceB = Number(b.price.replace("$", "").replace(",", ""));

                if (sortOrder === "low-to-high") {
                return priceA - priceB;
    }

                if (sortOrder === "high-to-low") {
                    return priceB - priceA;
    }

                return 0;
                })
                .map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;