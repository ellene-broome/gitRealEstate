import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        Git Real Estate
      </Link>

      <nav className="nav-links">
        <a href="/#home">Home</a>
        <a href="/#listings">Listings</a>
        <a href="/#buyers">Buyers</a>
        <a href="/#sellers">Sellers</a>
        <a href="/#areas">Areas</a>
        <a href="/#contact">Contact</a>
      </nav>
    </header>
  );
}

export default Navbar;