import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not fetch leads.");
        }

        const sortedLeads = [...(data.submissions || [])].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

        setLeads(sortedLeads);
      
        } catch (error) {
            console.error("Leads fetch error:", error);
            setErrorMessage("Could not load leads. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    fetchLeads();
  }, []);

  return (
    <main className="leads-page">
      <h1>Contact Leads</h1>

      <p className="section-note">
        Development admin view for contact form submissions.
      </p>


      {isLoading && <p>Loading leads...</p>}

      {errorMessage && <p className="form-error">{errorMessage}</p>}

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