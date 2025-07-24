import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function Creditors() {
  const [creditor, setCreditor] = useState({
    name: "",
    address: "",
    phone: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    status: "unpaid",
    number: 1,
  });

  const [creditors, setCreditors] = useState(() => {
    const saved = localStorage.getItem("creditors");
    return saved ? JSON.parse(saved) : [];
  });

  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("creditors", JSON.stringify(creditors));
  }, [creditors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreditor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCreditors((prev) => [...prev, creditor]);
    setCreditor((prev) => ({
      name: "",
      address: "",
      phone: "",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
      status: "unpaid",
      number: prev.number + 1,
    }));
  };

  const handleToggleStatus = (index) => {
    setCreditors((prev) =>
      prev.map((c, i) =>
        i === index ? { ...c, status: c.status === "paid" ? "unpaid" : "paid" } : c
      )
    );
  };

  const handleDelete = (index) => {
    setCreditors((prev) => prev.filter((_, i) => i !== index));
  };

  const filteredCreditors = creditors.filter((c) => {
    const matchesStatus =
      filterStatus === "all" ? true : c.status === filterStatus;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalUnpaid = creditors.reduce(
    (acc, c) => (c.status === "unpaid" ? acc + parseFloat(c.amount || 0) : acc),
    0
  );

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Creditor Report", 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [["#", "Name", "Address", "Phone", "Amount", "Date", "Status"]],
      body: creditors.map((c) => [
        c.number,
        c.name,
        c.address,
        c.phone,
        `₹${c.amount}`,
        c.date,
        c.status.toUpperCase(),
      ]),
    });
    doc.save("creditors.pdf");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Creditors</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Creditor Name"
          value={creditor.name}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={creditor.address}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={creditor.phone}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount (₹)"
          value={creditor.amount}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="date"
          value={creditor.date}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add Creditor
        </button>
      </form>

      <div className="flex items-center gap-4 mb-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or address"
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleDownloadPDF}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      <div className="space-y-4">
        {filteredCreditors.map((c, i) => (
         <div
            key={i}
            className="border p-4 rounded shadow flex justify-between items-center bg-white dark:bg-gray-800 text-black dark:text-white"
            >
            <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm">{c.address}</div>
                <div className="text-sm">📞 {c.phone}</div>
                <div className="text-sm">Date: {c.date}</div>
                <div className="text-sm">Amount: ₹{c.amount}</div>
            </div>


            <div className="flex gap-2 items-center">
              <button
                onClick={() => handleToggleStatus(i)}
                className={`px-3 py-1 rounded text-white ${
                  c.status === "paid"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                {c.status === "paid" ? "Paid" : "Unpaid"}
              </button>

              <button
                onClick={() => handleDelete(i)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCreditors.length > 0 && (
        <div className="text-right font-medium mt-6">
          Total Outstanding (Unpaid): ₹{totalUnpaid.toFixed(2)}
        </div>
      )}
    </div>
  );
}
