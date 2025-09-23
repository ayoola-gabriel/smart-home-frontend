import React from "react";
import { ENDPOINT } from "../pages/Dashboard";
import { Link } from "react-router-dom";

const NoDeviceMessage = () => {
  return (
    <div id="noDevicesMessage" className="text-center py-12">
      <div className="text-6xl mb-4">🏠</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No Rooms Configured
      </h3>
      <p className="text-gray-600 mb-4">
        Add rooms in settings to start controlling your devices
      </p>
      <Link to="/settings">
      <button
        id="goToSettingsBtn"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
      >
        Go to Settings
      </button>
      </Link>
    </div>
  );
};

export default NoDeviceMessage;
