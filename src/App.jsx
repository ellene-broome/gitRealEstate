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
    </>
  );
}

export default App;