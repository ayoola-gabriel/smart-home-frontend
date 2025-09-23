import React, { useEffect } from "react";

const Alert = ({ message, type = "success", onClose }) => {
  // Map alert types to Tailwind colors
  const typeClasses = {
    success: "bg-green-100 text-black",
    error: "bg-red-600 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-600 text-white",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Auto-close after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup
  }, [onClose]);

  return (
    <div
      className={`mt-3 px-6 py-2 rounded-sm font-medium shadow-md transition-opacity duration-500 ${typeClasses[type]}`}
    >
      {message}
    </div>
  );
};

export default Alert;
