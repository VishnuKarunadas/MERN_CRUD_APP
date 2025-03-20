import React from 'react';

const Popup = ({ message, onClose, type }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="text-center">
          <p className={`font-semibold ${type === 'error' ? 'text-red-600' : 'text-green-600'}`}>{message}</p>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="bg-slate-700 text-white px-6 py-2 rounded-lg hover:bg-slate-600"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
