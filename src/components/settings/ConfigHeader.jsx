import React from "react";

const ConfigHeader = () => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <span className="text-2xl">🏠</span>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Smart Home Configuration
        </h2>
        <p className="text-gray-600">Set up your smart home identification</p>
      </div>
    </div>
  );
};

export default ConfigHeader;
