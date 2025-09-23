import React from "react";
import { useNavigate } from "react-router-dom";

const NoIDMessage = () => {
  const navigate = useNavigate();

  const handleGoToSettings = () => {
    navigate("/settings");
  };

  return (
    <div id="noDevicesMessage" className="text-center py-12">
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No Device ID Found
      </h3>
      <p className="text-gray-600 mb-4">
        Please add a device ID in settings to start controlling your hardware
      </p>
      <button
        onClick={handleGoToSettings}
        id="goToSettingsBtn"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
      >
        Go to Settings
      </button>
    </div>
  );
};

export default NoIDMessage;
