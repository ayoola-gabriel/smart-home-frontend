import React from "react";

const DeviceOfflineMessage = ({retryFn}) => {
  return (
    <div id="deviceOfflineMessage" className="text-center py-12">
      <div className="text-6xl mb-4">🔌</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Device Offline
      </h3>
      <p className="text-gray-600 mb-4">
        Your device is not connected. Please check its power and network connection.
      </p>
      <button
        id="retryConnectionBtn"
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium"
        onClick={retryFn}
         >
        Retry Connection
      </button>
    </div>
  );
};

export default DeviceOfflineMessage;
