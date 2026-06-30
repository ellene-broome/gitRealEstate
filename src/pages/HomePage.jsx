import ListingCard from "../components/ListingCard";
import { listings } from "../data/listings";
import Navbar from "../components/Navbar";
import { useState } from "react";
import Footer from "../components/Footer";
import erbOverlay from "../assets/erb-overlay.png";
 
function HomePage() {
    const [cityFilter, setCityFilter] = useState("");

    const [bedsFilter, setBedsFilter] = useState("");

    const [maxPrice, setMaxPrice] = useState("");

    const [sortOrder, setSortOrder] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        interest: "",
        message: "",
});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

function formatPhoneNumber(value) {
    const digits = value.replace(/\D/g, "").slice(0, 10);

    if (digits.length <= 3) {
    return digits;
    }

    if (digits.length <= 6) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    }

    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}  

function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
        ...currentFormData,
        [name]: value,
    }));
}

async function handleSubmit(event) {
  event.preventDefault();

  setIsSubmitting(true);
  setErrorMessage("");
  setFormSubmitted(false);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneDigits = formData.phone.replace(/\D/g, "");

  if (!formData.name.trim()) {
    setErrorMessage("Please enter your name.");
    setIsSubmitting(false);
    return;
  }

  if (!formData.email.trim()) {
    setErrorMessage("Please enter your email address.");
    setIsSubmitting(false);
    return;
  }

  if (!emailPattern.test(formData.email)) {
    setErrorMessage("Please enter a valid email address.");
    setIsSubmitting(false);
    return;
  }

  if (!formData.phone.trim()) {
    setErrorMessage("Please enter your phone number.");
    setIsSubmitting(false);
    return;
  }

  if (phoneDigits.length !== 10) {
    setErrorMessage("Please enter a valid 10-digit phone number.");
    setIsSubmitting(false);
    return;
  }

  if (!formData.interest) {
    setErrorMessage("Please choose what you are interested in.");
    setIsSubmitting(false);
    return;
  }

  if (!formData.message.trim()) {
  setErrorMessage("Please enter a message.");
  setIsSubmitting(false);
  return;
  }   

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }

    console.log("Backend response:", data);

    setFormSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      interest: "",
      message: "",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    setErrorMessage(
        error.message || "Sorry, your message could not be sent. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
}
return (
    <>
    <Navbar />
    <section className="hero" id="home">
        <div className="hero-overlay">
            <img
                src={erbOverlay}
                alt="ERB Branding"
                className="hero-brand-logo"
    />

        <h1>Find Your Next Louisiana Home</h1>

            <p>Helping buyers and sellers across the Greater Baton Rouge area.</p>
            <p>One commit at a time.</p>

            <div className="hero-buttons">
                <a href="#listings">
                    <button>Browse Listings</button>
                </a>

                <a href="#contact">
                    <button className="secondary-button">Contact Agent</button>
                </a>
</div>
        </div>
    </section>

      <section className="business-section">
        <div className="business-card">
            <h2>Capital Region Expertise</h2>

                <p>
                    Helping buyers find homes across the Greater Baton Rouge area with
                    guidance, local expertise, and personalized service.
                </p>
        </div>

        <div className="business-card">
            <h2>Modern Real Estate Strategy</h2>

                <p>
                    Professional marketing, local market knowledge, and a strategy built to
                    help sellers maximize value and exposure.
                </p>
        </div>

        <div className="business-card">
             <h2>Relationship-Driven Service</h2>

                <p>
                    Combining modern technology with personal relationships to create a
                    smoother and more informed real estate experience.
                </p>
        </div>
    </section>

    <section className="filters-section">
  <h2>Search Homes</h2>

  <p className="section-note">
    Browse current homes in the Greater Baton Rouge area. When you find one you
    like, send me the address and I’ll help you with the next step.
  </p>

  <div className="external-search-wrapper">
    <a
      href="https://www.realtor.com/realestateandhomes-search/Baton-Rouge_LA"
      target="_blank"
      rel="noopener noreferrer"
    >
      <button className="external-search-button">
        Search Homes on Realtor.com
      </button>
    </a>
  </div>
</section>

    <section id="listings" className="listings-section">
        <h2>Featured Listings</h2>
        <p className="section-note">
            Featured properties will be updated as live IDX options are connected. For the
            most current listings, use the home search above or contact me directly.
        </p>

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

    <section className="areas-section" id="areas">
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

    <section className="testimonials-section" id="testimonials">
        <div className="testimonials-content">
            <h2>Trusted Guidance for Every Step</h2>

                <p>
                Real estate is personal. This space will feature client stories,
                community feedback, and experiences from buyers and sellers.
                </p>

            <div className="testimonials-grid">
                <div className="testimonial-card">
                    <p>
                    “Professional, responsive, and committed to helping clients feel
                    confident throughout the process.”
                    </p>

                    <span>Future Client Testimonial</span>
                </div>

                <div className="testimonial-card">
                    <p>
                    “A modern approach to real estate with personal service and local
                    knowledge.”
                    </p>

                    <span>Community Feedback Placeholder</span>
                </div>

                <div className="testimonial-card">
                    <p>
                    “Focused on making buying and selling feel clear, organized, and
                    less overwhelming.”
                    </p>
                    <span>Client Story Coming Soon</span>
                </div>
            </div>
        </div>
    </section>   

    <section className="contact-section" id="contact">
         <h2>Contact Git Real Estate</h2>

            <p>
            Ready to buy, sell, or learn more about available properties in the
            Greater Baton Rouge area?  
            </p>

        {formSubmitted && (
            <div className="form-alert form-alert-success">
                <span className="form-alert-icon">✓</span>
                <p>Thank you! Your message has been sent. I’ll be in touch soon.</p>
            </div>
        )}

        {errorMessage && (
            <div className="form-alert form-alert-error">
                <span className="form-alert-icon">!</span>
                <p>{errorMessage}</p>
            </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
        />

            <input
                type="text"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
        />

            <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(event) =>
                    setFormData((currentFormData) => ({
                    ...currentFormData,
                    phone: formatPhoneNumber(event.target.value),
                    }))
                }
                autoComplete="tel"
                maxLength="12"
            />

            <select
                name="interest"
                value={formData.interest}
                onChange={handleInputChange}
            >
                <option value="">What are you interested in?</option>
                <option value="buying">Buying a home</option>
                <option value="selling">Selling a home</option>
                <option value="buying-and-selling">Buying and  selling</option>
                <option value="question">I have a question</option>
            </select>

            <textarea
                name="message"
                placeholder="How can we help you?"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                required
            ></textarea>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
            </button>
        </form>
    </section>

    

    

    <Footer />
    </>
  );
}

export default HomePage;