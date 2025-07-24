
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import PrintableInvoice from "./PrintableInvoice";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

export default function InvoiceModal({ isOpen, setIsOpen, invoiceInfo, items }) {
  const closeModal = () => setIsOpen(false);

  // Construct full invoice data
  const invoiceData = {
    ...invoiceInfo,
    customerPhone: invoiceInfo.phone,
    username: invoiceInfo.userName,
    items: items.map(item => ({
      ...item,
      rate: parseFloat(item.rate) || 0,
      qty: parseInt(item.qty) || 1,
    })),
    discount: parseFloat(invoiceInfo.discount) || 0,
    gstByCustomer: parseFloat(invoiceInfo.gstByCustomer) || 0,
    date: invoiceInfo.date,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  const downloadPDF = () => {
    const node = document.getElementById("invoice-capture");
    toPng(node, { quality: 1 })
      .then((dataUrl) => {
        const pdf = new jsPDF("p", "pt", "a4");
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("invoice.pdf");
      })
      .catch((err) => {
        console.error("PDF generation error:", err);
      });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                <div id="invoice-capture">
                  <PrintableInvoice data={invoiceData} />
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button className="btn-ghost" onClick={closeModal}>Close</button>
                  <button className="btn-ghost bg-blue-600 text-white hover:bg-blue-700" onClick={downloadPDF}>Download</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

