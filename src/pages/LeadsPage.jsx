import { useState } from "react";
import { Link } from "react-router-dom";

function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  async function fetchLeads(password) {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/leads`,
        {
          headers: {
            "x-admin-password": password,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not fetch leads.");
      }

      const sortedLeads = [...(data.submissions || [])].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setLeads(sortedLeads);
      setIsAuthorized(true);
      setPasswordError("");
    } catch (error) {
      console.error("Leads fetch error:", error);
      setPasswordError("Incorrect password or unable to load leads.");
      setIsAuthorized(false);
    } finally {
      setIsLoading(false);
    }
  }

  function handlePasswordSubmit(event) {
    event.preventDefault();
    fetchLeads(passwordInput);
  }

  if (!isAuthorized) {
    return (
      <main className="leads-page">
        <h1>Contact Leads</h1>

        <p className="section-note">
          Enter the admin password to view contact form submissions.
        </p>

        <form className="admin-login-form" onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            placeholder="Admin password"
            value={passwordInput}
            onChange={(event) => setPasswordInput(event.target.value)}
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Checking..." : "View Leads"}
          </button>
        </form>

        {passwordError && <p className="error-message">{passwordError}</p>}

        <div className="leads-actions">
          <Link to="/">
            <button type="button">Back to Home</button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="leads-page">
      <h1>Contact Leads</h1>

      <p className="section-note">
        Development admin view for contact form submissions.
      </p>

      {isLoading && <p>Loading leads...</p>}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {!isLoading && !errorMessage && leads.length === 0 && (
        <p>No leads found yet.</p>
      )}

      {!isLoading && !errorMessage && leads.length > 0 && (
        <div className="leads-table-wrapper">
          <table className="leads-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Interest</th>
                <th>Message</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone || "—"}</td>
                  <td>{lead.interest || "—"}</td>
                  <td>{lead.message}</td>
                  <td>
                    {lead.created_at
                      ? new Date(lead.created_at).toLocaleString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="leads-actions">
        <Link to="/">
          <button type="button">Back to Home</button>
        </Link>
      </div>
    </main>
  );
}

export default LeadsPage;