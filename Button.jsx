import React from 'react'

function Button({ children, onClick }) {
  return (
    <button
      className="px-4 py-2 bg-black text-white rounded cursor-pointer"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export default Button
