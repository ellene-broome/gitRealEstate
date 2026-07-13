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

        <div className="footer-agent-contact">
          <p>
            <strong>Ellene Broome</strong>
          </p>

          <p>Louisiana Licensed Real Estate Professional</p>

          <p>
            Email:{" "}
            <a href="mailto:erbcollectivela@gmail.com">
            erbcollectivela@gmail.com 
            </a>
          </p>

          <p>
            Phone:{" "}
            <a href="tel:2252701874">
              (225) 270-1874
            </a>
          </p>
        </div>

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