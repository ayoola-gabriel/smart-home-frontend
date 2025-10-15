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
    </div>
  );
};

export default DeviceOfflineMessage;
