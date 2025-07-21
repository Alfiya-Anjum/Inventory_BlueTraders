import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

const InvoicesPage = () => {
  const [sales, setSales] = useState([]);
  const [selectedSales, setSelectedSales] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/sales')
      .then(res => res.json())
      .then(data => setSales(data))
      .catch(err => console.error('Failed to fetch sales', err));
  }, []);

  const handleCheckboxChange = (saleId) => {
    setSelectedSales(prev => 
      prev.includes(saleId)
        ? prev.filter(id => id !== saleId)
        : [...prev, saleId]
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Invoices</h1>

      {sales.length === 0 ? (
        <p className="text-white">No sales available.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300 text-white">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Select</th>
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Company</th>
              <th className="border border-gray-300 p-2">Product Number</th>
              <th className="border border-gray-300 p-2">Base Price</th>
              <th className="border border-gray-300 p-2">Discount</th>
              <th className="border border-gray-300 p-2">GST %</th>
              <th className="border border-gray-300 p-2">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="border border-gray-300 p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedSales.includes(sale.id)}
                    onChange={() => handleCheckboxChange(sale.id)}
                  />
                </td>
                <td className="border border-gray-300 p-2">{sale.productName}</td>
                <td className="border border-gray-300 p-2">{sale.company}</td>
                <td className="border border-gray-300 p-2">{sale.productNumber}</td>
                <td className="border border-gray-300 p-2">${sale.basePrice}</td>
                <td className="border border-gray-300 p-2">${sale.discount}</td>
                <td className="border border-gray-300 p-2">{sale.gstPercentage}%</td>
                <td className="border border-gray-300 p-2">${sale.totalPrice.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InvoicesPage;
