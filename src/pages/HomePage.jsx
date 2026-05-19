import ListingCard from "../components/ListingCard";
import { listings } from "../data/listings";
import Navbar from "../components/Navbar";
import { useState } from "react";
import Footer from "../components/Footer";
 
function HomePage() {
    const [cityFilter, setCityFilter] = useState("");

    const [bedsFilter, setBedsFilter] = useState("");

    const [maxPrice, setMaxPrice] = useState("");

    const [sortOrder, setSortOrder] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
});
    const [formSubmitted, setFormSubmitted] = useState(false);

function handleInputChange(event) {
    const { name, value } = event.target;

  setFormData({
    ...formData,
    [name]: value,
  });
}

function handleSubmit(event) {
  event.preventDefault();

  setFormSubmitted(true);

  setFormData({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
}
  return (
    <>
    <Navbar />
      <section className="hero">
        <div className="hero-overlay">
          <h1>Find Your Next Louisiana Home</h1>

            <p>Helping buyers and sellers across the Greater Baton Rouge area.</p>
            <p>One commit at a time.</p>

          <div className="hero-buttons">
            <button>Browse Listings</button>
            <button className="secondary-button">Contact Agent</button>
          </div>
        </div>
      </section>

      <section className="business-section">
        <div className="business-card">
            <h2>For Buyers</h2>

                <p>
                    Helping buyers find homes across the Greater Baton Rouge area with
                    guidance, local expertise, and personalized service.
                </p>
        </div>

        <div className="business-card">
            <h2>For Sellers</h2>

                <p>
                    Professional marketing, local market knowledge, and a strategy built to
                    help sellers maximize value and exposure.
                </p>
        </div>

        <div className="business-card">
             <h2>Why Work With Me</h2>

                <p>
                    Combining modern technology with personal relationships to create a
                    smoother and more informed real estate experience.
                </p>
        </div>
    </section>

    <section className="areas-section">
        <div className="areas-content">
            <h2>Serving the Greater Baton Rouge Area</h2>

                <p>
                    Proudly serving clients across the Capital Region with local knowledge,
                    responsive communication, and personalized real estate guidance.
                </p>

        <div className="areas-grid">
            <div className="area-card">
            <h3>East Baton Rouge Parish</h3>
            </div>

            <div className="area-card">
                <h3>West Baton Rouge Parish</h3>
            </div>

            <div className="area-card">
                <h3>Livingston Parish</h3>
            </div>

            <div className="area-card">
                <h3>Ascension Parish</h3>
            </div>
        </div>
        </div>
    </section>   

    <section className="cta-section">
        <div className="cta-content">
            <h2>Ready to Buy or Sell in the Greater Baton Rouge Area?</h2>

                <p>
                    Whether you are searching for your next home or preparing to list your
                    current one, Git Real Estate is built to help you move forward with
                    confidence.
                </p>

        <div className="cta-buttons">
            <a href="#contact">
                <button>Schedule a Consultation</button>
            </a>

            <a href="#listings">
                <button className="secondary-button">Browse Listings</button>
            </a>
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
                onChange={(event) => setCityFilter(event.target.value)
      }
    />

            <input
                type="number"
                placeholder="Minimum beds"
                value={bedsFilter}
                onChange={(event) => setBedsFilter(event.target.value)
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

    <section className="contact-section">
         <h2>Contact Git Real Estate</h2>

            <p>
            Ready to buy, sell, or learn more about available properties in the
            Greater Baton Rouge area?  
            </p>

        {formSubmitted && (
            <p className="success-message">
                Thank you! Your message has been sent.
            </p>
  )}

        <form className="contact-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
        />

            <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
        />

            <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
        />

            <textarea
                name="message"
                placeholder="How can we help you?"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                required
            ></textarea>

            <button type="submit">Send Message</button>
        </form>
    </section>

    <Footer />
    </>
  );
}

export default HomePage;