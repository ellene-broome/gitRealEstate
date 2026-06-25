function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Git Real Estate</h3>

        <p>
          Serving the Greater Baton Rouge area with{" "}
          <a
            href="https://www.rustonproperties.net/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ruston Properties
          </a>
          .
        </p>

        <p>Louisiana Licensed Real Estate Professional</p>

        <p>Equal Housing Opportunity</p>

        <p>
          Broker: Michelle Ruston | Ruston Properties | 2798 O’Neal Lane B4,
          Baton Rouge, LA 70816
        </p>

        <p>
          Office: <a href="tel:2259329552">(225) 932-9552</a> |{" "}
          <a href="mailto:info@michelleruston.com">
            info@michelleruston.com
          </a>
        </p>

        <p className="footer-disclaimer">
          Property listings and information are subject to change without notice.
        </p>
      </div>
    </footer>
  );
}

export default Footer;