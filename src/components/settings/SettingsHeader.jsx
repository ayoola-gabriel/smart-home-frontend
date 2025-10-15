import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SettingsHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center">
        <Link to="/">
        <button className="p-1 rounded-lg me-2">
          <ChevronLeft />
        </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure your smart home system</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsHeader;
