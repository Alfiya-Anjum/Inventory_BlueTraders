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

  // ✅ Function to handle saving sale
  const handleAddSale = async () => {
    try {
      const response = await fetch('/api/sales', {
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
            {/* your form fields here (unchanged) */}
            {/* ... */}
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
