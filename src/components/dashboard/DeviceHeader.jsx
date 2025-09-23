import { RefreshCcw } from "lucide-react";

const DeviceHeader = ({ active = "0", all = "0" }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold text-gray-900">Device Controls</h2>
      <div className="text-sm text-gray-500" id="deviceCount">
        {active} of {all} devices active
      </div>
    </div>
  );
};

export default DeviceHeader;
