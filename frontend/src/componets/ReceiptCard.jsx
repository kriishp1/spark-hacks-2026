import React from "react";

// ReceiptCard component displays all receipt information in a styled card
// Props: receipt (object with all receipt details), onDelete (function to call when delete is clicked)
const ReceiptCard = ({ receipt, onDelete }) => {
  // Destructure receipt details
  const {
    svg,
    purchaseDate,
    storeName,
    items,
    totalPrice,
    returnPolicy,
    expiryDate,
  } = receipt;

  return (
    <div className="bg-[#E8E2D8] rounded-xl shadow-lg p-6 mb-6 border-2 border-[#BFC6C4] max-w-md w-full">
      {/* Receipt SVG */}
      <div className="flex justify-center mb-4">
        {/* Place for receipt SVG */}
        {svg ? (
          <span dangerouslySetInnerHTML={{ __html: svg }} />
        ) : (
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#6F8F72">
            <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
            <path d="M8 8h8M8 12h8M8 16h4" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </div>

      {/* Purchase Date and Store Name */}
      <div className="flex justify-between items-center mb-2">
        {/* Date of purchase */}
        <span className="text-[#6F8F72] font-semibold">{purchaseDate}</span>
        {/* Store name */}
        <span className="text-[#6F8F72] font-bold">{storeName}</span>
      </div>

      {/* List of items bought with their cost (scrollable in a div) */}
      <div className="mb-4">
        <div className="max-h-32 overflow-y-auto rounded bg-[#F8F6F2] p-2 border border-[#BFC6C4]">
          <ul className="divide-y divide-[#BFC6C4]">
            {items && items.length > 0 ? (
              items.map((item, idx) => (
                <li key={idx} className="flex justify-between py-1">
                  {/* Item name */}
                  <span className="text-gray-700">{item.name}</span>
                  {/* Item cost */}
                  <span className="text-gray-700 font-medium">${item.cost.toFixed(2)}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-400 italic">No items listed</li>
            )}
          </ul>
        </div>
      </div>

      {/* Total price */}
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-[#6F8F72]">Total:</span>
        <span className="font-bold text-[#6F8F72]">${totalPrice?.toFixed(2) || '0.00'}</span>
      </div>

      {/* Return policy and expiry date */}
      <div className="mb-4">
        {/* Return policy */}
        <p className="text-sm text-[#6F8F72] mb-1">Return Policy: {returnPolicy || 'N/A'}</p>
        {/* Expiry date */}
        <p className="text-sm text-[#6F8F72]">Expires: {expiryDate || 'N/A'}</p>
      </div>

      {/* Delete button (red, centered) */}
      <div className="flex justify-center">
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-800 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ReceiptCard;
