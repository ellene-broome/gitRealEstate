import { useState } from "react";
import { Link } from "react-router-dom";

function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showArchived, setShowArchived] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  async function updateLead(leadId, updates) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/leads/${leadId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-admin-password": passwordInput,
          },
          body: JSON.stringify(updates),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not update lead.");
      }

      setLeads((currentLeads) =>
        currentLeads.map((lead) =>
          lead.id === leadId ? data.lead : lead
        )
      );

      setErrorMessage("");
    } catch (error) {
      console.error("Update lead error:", error);
      setErrorMessage("Could not update lead.");
    }
  }

  function handleStatusChange(leadId, newStatus) {
    updateLead(leadId, { status: newStatus });
  }

  function handleNotesChange(leadId, newNotes) {
    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        lead.id === leadId ? { ...lead, notes: newNotes } : lead
      )
    );
  }

  function handleSaveNotes(leadId) {
    const leadToUpdate = leads.find((lead) => lead.id === leadId);

    if (!leadToUpdate) {
     return;
    }

    updateLead(leadId, { notes: leadToUpdate.notes || "" });
  }

  function handleArchiveLead(leadId) {
    updateLead(leadId, { archived: true });
  }

  function handleRestoreLead(leadId) {
    updateLead(leadId, { archived: false });
  }

  async function handleDeleteLead(leadId) {
  const confirmed = window.confirm(
    "Are you sure you want to permanently delete this lead? This cannot be undone."
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/leads/${leadId}`,
      {
        method: "DELETE",
        headers: {
          "x-admin-password": passwordInput,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not delete lead.");
    }

    setLeads((currentLeads) =>
      currentLeads.filter((lead) => lead.id !== leadId)
    );

    setErrorMessage("");
  } catch (error) {
    console.error("Delete lead error:", error);
    setErrorMessage("Could not delete lead.");
  }
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

  const visibleLeads = leads.filter((lead) => {
  const matchesArchived = showArchived || !lead.archived;

  const matchesStatus =
    statusFilter === "all" || lead.status === statusFilter;

  const searchText = `${lead.name} ${lead.email} ${lead.phone} ${lead.interest} ${lead.message} ${lead.notes}`.toLowerCase();

  const matchesSearch = searchText.includes(searchTerm.toLowerCase());

  return matchesArchived && matchesStatus && matchesSearch;
});

    return (
    <main className="leads-page">
      <h1>Contact Leads</h1>

      <p className="section-note">
        Development admin view for contact form submissions.
      </p>

      {isLoading && <p>Loading leads...</p>}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {!isLoading && !errorMessage && visibleLeads.length === 0 && (
        <p>
          No leads match the current search or filter. Try clearing the search,
          changing the status filter, or showing archived leads.
        </p>
      )}

      <button
        type="button"
        onClick={() => setShowArchived((current) => !current)}
    >
        {showArchived ? "Hide Archived Leads" : "Show Archived Leads"}
      </button>

      <div className="leads-filters">
  <input
    type="text"
    placeholder="Search leads..."
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
  />

  <select
    value={statusFilter}
    onChange={(event) => setStatusFilter(event.target.value)}
  >
    <option value="all">All Statuses</option>
    <option value="new">New</option>
    <option value="contacted">Contacted</option>
    <option value="buyer">Buyer</option>
    <option value="seller">Seller</option>
    <option value="active_client">Active Client</option>
    <option value="under_contract">Under Contract</option>
    <option value="closed">Closed</option>
  </select>

  <p>
    Showing {visibleLeads.length} of {leads.length} leads
  </p>
</div>

      {!isLoading && leads.length > 0 && (
        <div className="leads-table-wrapper">
          <table className="leads-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Interest</th>
                <th>Status</th>
                <th>Message</th>
                <th>Notes</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone || "—"}</td>
                  <td>{lead.interest || "—"}</td>

                  <td>
                    <select
                      value={lead.status || "new"}
                      onChange={(event) =>
                        handleStatusChange(lead.id, event.target.value)
                      }
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="buyer">Buyer</option>
                      <option value="seller">Seller</option>
                      <option value="active_client">Active Client</option>
                      <option value="under_contract">Under Contract</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>

                  <td>{lead.message}</td>

                  <td>
                    <textarea
                      value={lead.notes || ""}
                      onChange={(event) =>
                        handleNotesChange(lead.id, event.target.value)
                      }
                      placeholder="Add notes..."
                      rows="3"
                    />

                    <button
                      type="button"
                      onClick={() => handleSaveNotes(lead.id)}
                    >
                      Save Notes
                    </button>
                  </td>

                  <td>
                    {lead.created_at
                      ? new Date(lead.created_at).toLocaleString()
                      : "—"}
                  </td>
                  <td>
                    {lead.archived ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleRestoreLead(lead.id)}
                        >
                          Restore
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteLead(lead.id)}
                        >
                          Delete Permanently
                        </button>
                      </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleArchiveLead(lead.id)}
                    >
                      Archive
                    </button>
                   )}
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