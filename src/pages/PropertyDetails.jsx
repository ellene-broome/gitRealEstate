import { Link, useParams } from "react-router-dom";
import { listings } from "../data/listings";

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
      <div className="property-gallery">
        {(listing.images || [listing.image]).map((image, index) => (
            <img
                key={index}
                src={image}
                alt={listing.address}
                className="gallery-image"
    />
  ))}
</div>

      <h1>{listing.price}</h1>

      <h2>{listing.address}</h2>

      <p>{listing.city}</p>

      <div className="listing-details">
        <span>{listing.beds} Beds</span>
        <span>{listing.baths} Baths</span>
        <span>{listing.sqft} sqft</span>
      </div>

      <p>{listing.description}</p>

<section className="property-features">
  <h2>Property Features</h2>

  <div className="features-grid">
    {listing.features?.map((feature, index) => (
      <div key={index} className="feature-pill">
        {feature}
      </div>
    ))}
  </div>
</section>

      <Link to="/">
        <button>Back Home</button>
      </Link>
    </div>
  );
}

export default PropertyDetails;