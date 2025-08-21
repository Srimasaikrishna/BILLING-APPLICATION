import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../assets/logo2.jpg';
import './InvoiceDetails.css';

const InvoiceDetails = () => {
  const invoiceRef = useRef();

  const handleDownload = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgProps = canvas.width / canvas.height;
    const imgHeight = pdfWidth / imgProps;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight > pdfHeight ? pdfHeight : imgHeight);
    pdf.save('invoice.pdf');
  };

  return (
    <div className="invoice-wrapper">
      <div className="invoice-background" style={{ backgroundImage: `url(${logo})` }} />
      <div className="invoice-foreground">
        <div className="invoice-navbar">
          <div className="navbar-user">
            <div className="user-avatar">
              <span role="img" aria-label="avatar">👤</span>
            </div>
            <span className="username">Username</span>
          </div>
          <button className="back-button">Back</button>
        </div>

        <div ref={invoiceRef} className="invoice-content">
          <div className="invoice-header">
            <div className="invoice-meta">
              <a href="#" className="invoice-number">Invoice Number : 1234567890</a>
              <div className="invoice-dates">
                <div>Issued Date: <strong>20 Jul, 2025</strong></div>
                <div>Due Date: <strong>20 Aug, 2025</strong></div>
              </div>
            </div>
            <div className="invoice-status">
              Partially Paid
              <span className="status-dot yellow"></span>
            </div>
          </div>

          <div className="invoice-box">
            <div className="billed-to">
              <div className="label">Billed to :</div>
              <div className="details">
                Customer name <br />
                Email id <br />
                Phone number
              </div>
            </div>

            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Product / Service</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="empty-row">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="total-label">Grand Total</td>
                  <td></td>
                  <td></td>
                  <td className="total-value">20000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="payment-info">
            Paid amount : ₹ 12500 <br />
            Balance due : ₹ 8500
          </div>

          <div className="invoice-buttons">
            <button className="pay-button">Pay Now</button>
            <button className="download-button" onClick={handleDownload}>Download</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;