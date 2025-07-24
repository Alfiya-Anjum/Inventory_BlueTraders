import { useState } from "react";

export default function CustomerInfo() {
  const [customer, setCustomer] = useState({
    name: "",
    mobile: "",
    company: "",
    date: new Date().toISOString().slice(0, 10),
    customerNo: 1,
  });

  const [customers, setCustomers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setCustomers((prev) => [...prev, customer]);

    // Reset form
    setCustomer((prev) => ({
      name: "",
      mobile: "",
      company: "",
      date: new Date().toISOString().slice(0, 10),
      customerNo: prev.customerNo + 1,
    }));
  };

  const handleDelete = (index) => {
    setCustomers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4 bg-white shadow-lg rounded-md space-y-6 text-sm">
      {/* Form */}
      <div>
        <h2 className="text-lg font-semibold text-center mb-3">Add New Customer</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-1">Customer Name</label>
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleChange}
              required
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={customer.mobile}
              onChange={handleChange}
              required
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1">Company (Optional)</label>
            <input
              type="text"
              name="company"
              value={customer.company}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={customer.date}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1">Customer No. of the Day</label>
            <input
              type="number"
              name="customerNo"
              value={customer.customerNo}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700"
          >
            Save Customer
          </button>
        </form>
      </div>

      {/* Display Customer List */}
      {customers.length > 0 && (
        <div>
          <h3 className="text-md font-bold mb-2">Saved Customers</h3>
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">#</th>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Mobile</th>
                <th className="border px-2 py-1">Company</th>
                <th className="border px-2 py-1">Date</th>
                <th className="border px-2 py-1">No</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-2 py-1">{index + 1}</td>
                  <td className="border px-2 py-1">{c.name}</td>
                  <td className="border px-2 py-1">{c.mobile}</td>
                  <td className="border px-2 py-1">{c.company || "-"}</td>
                  <td className="border px-2 py-1">{c.date}</td>
                  <td className="border px-2 py-1">{c.customerNo}</td>
                  <td className="border px-2 py-1">
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
