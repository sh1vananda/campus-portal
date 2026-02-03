import React, { useState, useEffect } from "react";
import PageHeader from "../../components/layout/PageHeader";

const TicketRendering = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://rest-hhlo.onrender.com/api/tickets/"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }

      const data = await response.json();

      // If API returns an array directly, otherwise adjust as needed:
      setTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Ticket fetch error:", err);
      setError("Unable to load tickets. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="py-8">
      <PageHeader title="Ticket Rendering" subtitle="View all submitted tickets" />

      {loading ? (
        <p className="text-center text-slate-500">Loading tickets...</p>
      ) : error ? (
        <p className="text-center text-red-600 font-bold">{error}</p>
      ) : tickets.length === 0 ? (
        <p className="text-center text-slate-500">
          No tickets submitted yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-slate-200 rounded-lg">
            <thead className="bg-slate-100 text-sm uppercase text-slate-700">
              <tr>
                <th className="p-3 border-b">Ticket ID</th>
                <th className="p-3 border-b">Issue</th>
                <th className="p-3 border-b">Description</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Created At</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket._id} className="text-sm text-slate-800">
                  <td className="p-3 border-b font-medium text-xs">
                    {ticket._id}
                  </td>
                  <td className="p-3 border-b">{ticket.issue}</td>
                  <td className="p-3 border-b">{ticket.description}</td>
                  <td className="p-3 border-b">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        ticket.status === "Open"
                          ? "bg-yellow-100 text-yellow-800"
                          : ticket.status === "Closed"
                          ? "bg-green-100 text-green-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="p-3 border-b">
                    {new Date(ticket.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TicketRendering;
