export default function PrintableInvoice({ data }) {
  const items = data?.items || [];
  const discount = parseFloat(data?.discount) || 0;
  const gstByCustomer = parseFloat(data?.gstByCustomer) || 0;

  // Calculate total for all items (including GST and item-level discount)
  const total = items.reduce((sum, item) => {
    const discountedPrice = (item.basePrice || 0) - (item.discount || 0);
    const priceWithGst = discountedPrice + (discountedPrice * (item.gstPercentage || 0)) / 100;
    return sum + priceWithGst * (item.quantity || 1);
  }, 0);

  const netAmount = total - discount + gstByCustomer;

  return (
    <div className="p-4 text-[12px] font-mono bg-white text-black dark:bg-white dark:text-black rounded-md shadow-lg">
      {/* Header */}
      <div className="text-center font-bold text-xl border-b border-gray-400 pb-2">
        SHOWOFFF
      </div>
      <div className="text-center text-xs leading-tight mb-2">
        SHOP - 09-02, Vatana Complex, Bidar<br />
        GSTIN: 29ADJPS5124K1ZN<br />
        Contact: 9513815388
      </div>

      {/* Customer Info */}
      <div className="text-xs mb-2">
        <strong>Customer:</strong> {data.customerName || 'AMEEN'}<br />
        <strong>Address:</strong> {data.customerAddress || 'BIDAR'}<br />
        <strong>Mobile:</strong> {data.phone || data.customerPhone || '9513815388'}<br />
        <strong>GSTIN:</strong> {data.gstin || '-'}
      </div>

      {/* Bill Info */}
      <div className="mt-2 flex justify-between border-t border-gray-300 pt-2 text-xs">
        <div><strong>Bill No:</strong> {data.billNo || '0001'}</div>
        <div><strong>Date:</strong> {data.date} {data.time}</div>
      </div>

      {/* Item Table */}
      <div className="mt-2 border-t border-b border-gray-300 py-2 overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="border-b border-gray-400">
              <th className="px-1">Sr</th>
              <th className="px-1">Product</th>
              <th className="px-1">Company</th>
              <th className="px-1">Product No.</th>
              <th className="px-1">HSN</th>
              <th className="px-1">Qty</th>
              <th className="px-1">Rate</th>
              <th className="px-1">Disc.</th>
              <th className="px-1">GST%</th>
              <th className="px-1">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => {
              const discountedPrice = (item.basePrice || 0) - (item.discount || 0);
              const priceWithGst = discountedPrice + (discountedPrice * (item.gstPercentage || 0)) / 100;
              const totalPrice = priceWithGst * (item.quantity || 1);
              return (
                <tr key={i} className="border-b border-gray-200">
                  <td className="px-1">{i + 1}</td>
                  <td className="px-1">{item.productName}</td>
                  <td className="px-1">{item.company}</td>
                  <td className="px-1">{item.productNumber}</td>
                  <td className="px-1">{item.hsn || '-'}</td>
                  <td className="px-1">{item.quantity}</td>
                  <td className="px-1">₹{(item.basePrice || 0).toFixed(2)}</td>
                  <td className="px-1">₹{(item.discount || 0).toFixed(2)}</td>
                  <td className="px-1">{item.gstPercentage || 0}%</td>
                  <td className="px-1">₹{totalPrice.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="mt-2 space-y-1 text-xs">
        <div className="flex justify-between"><span>Total:</span><span>₹{total.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Discount:</span><span>- ₹{discount.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>GST by Customer:</span><span>₹{gstByCustomer.toFixed(2)}</span></div>
        <div className="flex justify-between font-bold text-base border-t pt-1"><span>Net Amount:</span><span>₹{netAmount.toFixed(2)}</span></div>
      </div>

      {/* Footer */}
      <div className="mt-3 text-xs text-center border-t border-gray-300 pt-2">
        <strong>User Name:</strong> {data.userName || data.username || 'admin'}<br />
        <strong>Thank you for shopping with us!</strong>
      </div>
    </div>
  );
}
// ...existing code...