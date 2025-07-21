import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/utils/cn";

const SalesPage = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    productName: "",
    company: "",
    productNumber: "",
    basePrice: 0,
    discount: 0,
    gstPercentage: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "basePrice" || name === "discount" || name === "gstPercentage" ? parseFloat(value) || 0 : value,
    }));
  };

  const calculateTotalPrice = () => {
    const { basePrice, discount, gstPercentage } = formData;
    const discountedPrice = basePrice - (discount || 0);
    const gstAmount = (discountedPrice * gstPercentage) / 100;
    return (discountedPrice + gstAmount).toFixed(2);
  };

  const handleAddSale = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Sale added successfully!');
        setFormData({
          productName: "",
          company: "",
          productNumber: "",
          basePrice: 0,
          discount: 0,
          gstPercentage: 1,
        });
      } else {
        alert('Failed to add sale');
      }
    } catch (err) {
      console.error(err);
      alert('Error adding sale');
    }
  };

  return (
    <div className="flex flex-col gap-y-4 p-4">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Sales</h1>
      <div className="card bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-6 rounded-lg">
        <div className="card-header mb-4">
          <p className="card-title text-lg font-medium text-slate-900 dark:text-slate-50">Add Sale</p>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className={cn("mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600")}
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className={cn("mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600")}
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Product Number</label>
              <input
                type="text"
                name="productNumber"
                value={formData.productNumber}
                onChange={handleInputChange}
                className={cn("mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600")}
                placeholder="Enter product number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Base Price ($)</label>
              <input
                type="number"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={cn("mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600")}
                placeholder="Enter base price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Discount ($)</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={cn("mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600")}
                placeholder="Enter discount amount"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">GST Percentage</label>
              <select
                name="gstPercentage"
                value={formData.gstPercentage}
                onChange={handleInputChange}
                className={cn("mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600")}
              >
                {[...Array(28)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}%
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-lg font-medium text-slate-900 dark:text-slate-50">
              Total Price: ${calculateTotalPrice()}
            </p>
          </div>

          <button
            className="mt-4 rounded-md bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
            onClick={handleAddSale}
          >
            Add Sale
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
