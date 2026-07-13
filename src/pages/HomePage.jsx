
import Navbar from "../components/Navbar";
import { useState } from "react";
import Footer from "../components/Footer";
import erbOverlay from "../assets/erb-overlay.png";
import aboutMe from "../assets/aboutMe2.png";
 
function HomePage() {
    
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
    {/* Navbar */}
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
                <a
                 href="https://www.realtor.com/realestateandhomes-search/Baton-Rouge_LA"
                 target="_blank"
                 rel="noopener noreferrer"
>
                 <button>Search Homes</button>
                </a>

                <a href="#contact">
                    <button className="secondary-button">Contact Agent</button>
                </a>
</div>
        </div>
    </section>
        {/* Business Section Cards */}
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

    {/* About Agent Section */}
<section className="about-agent-section" id="about">
  <div className="about-agent-card">
    <div className="about-agent-photo-wrapper">
      <img
        src={aboutMe}
        alt="Ellene Broome, Louisiana licensed real estate professional"
        className="about-agent-photo"
/>
    </div>

    <div className="about-agent-content">
      <p className="eyebrow">About Ellene</p>

      <h2>Rooted in Greater Baton Rouge. Ready to Help You Move Forward.</h2>

      <p>
        I’m Ellene Broome, a Louisiana licensed real estate professional serving
        the Greater Baton Rouge area with Ruston Properties.
      </p>

      <p>
        I moved to the Baton Rouge area in 2001 and raised my four children
        here, so this community is more than a market to me — it is home.
      </p>

      <p>
        Over the years, I have watched the Greater Baton Rouge area grow, change,
        and welcome families through every season of life. That personal
        connection helps me guide buyers and sellers with both local knowledge
        and genuine care.
      </p>

      <p>
        My goal is to help you feel informed, prepared, and confident from the
        first conversation to the closing table. Whether you are searching for
        your next home, preparing to sell, or simply trying to understand your
        options, I’m here to help you move forward with a clear plan.
      </p>

      <div className="about-agent-details">
        <p>
          <strong>Serving:</strong> Baton Rouge, Denham Springs, Walker,
          Livingston Parish, Ascension Parish, and surrounding areas
        </p>

        <p>
          <strong>Brokerage:</strong> Ruston Properties
        </p>
      </div>

        <a href="#contact" className="about-agent-button-link">
         <button className="about-agent-button">Contact Ellene</button>
        </a>
    </div>
  </div>
</section>

        {/* Call to Action Section */}

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

                <a
                 href="https://www.realtor.com/realestateandhomes-search/Baton-Rouge_LA"
                 target="_blank"
                 rel="noopener noreferrer"
>
                <button className="secondary-button">Search Homes</button>
                </a>
            </div>
        </div>
    </section>
        {/* Service Areas Section */}
    <section className="areas-section" id="areas">
        <div className="areas-content">
            <h2>Serving the Greater Baton Rouge Area</h2>

            <p>
                Proudly serving clients across the Capital Region with local knowledge,
                responsive communication, and personalized real estate guidance.
            </p>

            <div className="areas-grid">
  <a
    className="area-card"
    href="https://www.realtor.com/realestateandhomes-search/Baton-Rouge_LA"
    target="_blank"
    rel="noopener noreferrer"
  >
    <h3>East Baton Rouge Parish</h3>
    <p>Search homes in Baton Rouge and surrounding East Baton Rouge areas.</p>
  </a>

  <a
    className="area-card"
    href="https://www.realtor.com/realestateandhomes-search/Port-Allen_LA"
    target="_blank"
    rel="noopener noreferrer"
  >
    <h3>West Baton Rouge Parish</h3>
    <p>Explore homes in Port Allen, Brusly, Addis, and nearby areas.</p>
  </a>

  <a
    className="area-card"
    href="https://www.realtor.com/realestateandhomes-search/Walker_LA"
    target="_blank"
    rel="noopener noreferrer"
  >
    <h3>Livingston Parish</h3>
    <p>Search homes in Walker, Denham Springs, Livingston, and surrounding areas.</p>
  </a>

  <a
    className="area-card"
    href="https://www.realtor.com/realestateandhomes-search/Prairieville_LA"
    target="_blank"
    rel="noopener noreferrer"
  >
    <h3>Ascension Parish</h3>
    <p>Browse homes in Prairieville, Gonzales, Dutchtown, and nearby areas.</p>
  </a>
</div>
        </div>
    </section>
        {/* Testimonials Section */}

    <section className="testimonials-section" id="testimonials">
        <div className="testimonials-content">
            <h2>Trusted Guidance for Every Step</h2>

                <p>
                Real estate is personal. This space will feature client stories, 
                </p>
                <p>MY GOALS:</p>

           <div className="testimonials-grid">
  <div className="testimonial-card">
    <h3>Clear Guidance</h3>
    <p>
      Helping you understand each step of the buying or selling process so you
      can make confident decisions.
    </p>
  </div>

  <div className="testimonial-card">
    <h3>Local Knowledge</h3>
    <p>
      Using Greater Baton Rouge area experience to help you compare
      neighborhoods, pricing, timing, and next steps.
    </p>
  </div>

  <div className="testimonial-card">
    <h3>Steady Communication</h3>
    <p>
      Keeping the process organized, responsive, and as low-stress as possible
      from first conversation to closing.
    </p>
  </div>
</div>
        </div>
    </section>   
        {/* Contact Form Section */}
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