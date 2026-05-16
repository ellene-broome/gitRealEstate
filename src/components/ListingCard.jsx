import { Link } from "react-router-dom";

function ListingCard({ listing }) {
  return (
    <div className="listing-card">
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
  );
}

export default ListingCard;