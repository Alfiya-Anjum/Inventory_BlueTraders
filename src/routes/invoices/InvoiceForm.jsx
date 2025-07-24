import { useState } from "react";
import InvoiceModal from "./InvoiceModal";
import { cn } from "@/utils/cn";

const InvoiceForm = () => {
  const [invoiceInfo, setInvoiceInfo] = useState({
    customerName: "",
    customerAddress: "",
    phone: "",
    gstin: "",
    billNo: "",
    date: new Date().toISOString().slice(0, 10),
    userName: "",
    discount: 0,
    gstByCustomer: 0,
  });

  const [formDataList, setFormDataList] = useState([
    {
      productName: "",
      company: "",
      productNumber: "",
      basePrice: 0,
      discount: 0,
      gstPercentage: 1,
      quantity: 1,
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const addItem = () => {
    setFormDataList((prev) => [
      ...prev,
      {
        productName: "",
        company: "",
        productNumber: "",
        basePrice: 0,
        discount: 0,
        gstPercentage: 1,
        quantity: 1,
      },
    ]);
  };

  const handleInvoiceChange = (e) => {
    setInvoiceInfo({ ...invoiceInfo, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    setFormDataList((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [name]:
                name === "basePrice" ||
                name === "discount" ||
                name === "gstPercentage" ||
                name === "quantity"
                  ? parseFloat(value) || 0
                  : value,
            }
          : item
      )
    );
  };

  const calculateTotalPrice = (index) => {
    const { basePrice, discount, gstPercentage, quantity } = formDataList[index];
    const discountedPrice = basePrice - (discount || 0);
    const priceWithGst = discountedPrice + (discountedPrice * gstPercentage) / 100;
    const totalPrice = priceWithGst * quantity;
    return totalPrice.toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <div className="p-6 dark:bg-slate-900 min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
        <div className="grid md:grid-cols-2 gap-4">
          <input name="customerName" onChange={handleInvoiceChange} placeholder="Customer Name" className="input w-full" required />
          <input name="customerAddress" onChange={handleInvoiceChange} placeholder="Customer Address" className="input w-full" required />
          <input name="phone" onChange={handleInvoiceChange} placeholder="Phone Number" className="input w-full" required />
          <input name="gstin" onChange={handleInvoiceChange} placeholder="GSTIN" className="input w-full" required />
          <input name="billNo" onChange={handleInvoiceChange} placeholder="Bill No" className="input w-full" required />
          <input name="userName" onChange={handleInvoiceChange} placeholder="User Name" className="input w-full" required />
        </div>

        <h2 className="text-xl font-bold mt-6 mb-2 text-slate-800 dark:text-white">Items</h2>

        {formDataList.map((formData, index) => (
          <div key={index} className="card-body border rounded-lg mb-6 p-4 bg-slate-50 dark:bg-slate-900">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                ["Product Name", "productName"],
                ["Company", "company"],
                ["Product Number", "productNumber"],
                ["Base Price (₹)", "basePrice", "number"],
                ["Discount (₹)", "discount", "number"],
              ].map(([label, name, type = "text"]) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={(e) => handleItemChange(index, e)}
                    className={cn("mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600")}
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">GST Percentage</label>
                <select
                  name="gstPercentage"
                  value={formData.gstPercentage}
                  onChange={(e) => handleItemChange(index, e)}
                  className={cn("mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600")}
                >
                  {[...Array(28)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}%
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  min="1"
                  className={cn("mt-1 block w-full rounded-md border p-2")}
                  placeholder="Enter quantity"
                />
              </div>
            </div>

            <div className="mt-4">
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                Total (incl. GST × {formData.quantity}):
                <span className="ml-2 text-blue-600 dark:text-blue-400">₹{calculateTotalPrice(index)}</span>
              </p>
            </div>
          </div>
        ))}

        <button type="button" onClick={addItem} className="btn-ghost text-blue-600">+ Add Item</button>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Generate Invoice</button>
      </form>

      <InvoiceModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        invoiceInfo={invoiceInfo}
        items={formDataList}
      />
    </div>
  );
};

export default InvoiceForm;
