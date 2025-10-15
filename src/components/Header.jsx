import {useContext} from "react";
import { Bolt } from "lucide-react";
import { Link } from "react-router-dom";
import { DeviceContext } from "./DeviceContext";
import logo from '../assets/logo.png'

const Header = ({hardwareStatus=false, lastUpdated}) => {
  const {username, setUsername} = useContext(DeviceContext)
  setUsername(localStorage.getItem("username") || "");
  
  return (
    <div className="mb-4">
      <div className="flex-column items-center justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
          <img src={logo} width={48}></img>
          <h1 className="ms-2 text-2xl font-bold text-gray-900">
            Welcome {username}
          </h1>
          </div>
          <Link to="/settings">
          <button id="settingsBtn" className="bg-transparent">
            <Bolt size={30} />
          </button>
          </Link>
        </div>

        <p className="text-gray-600 mb-3">
          Monitor and control your connected devices
        </p>

        <div className="flex items-center justify-between">
          <div className="status-indicator flex items-center space-x-2">
            <div className={hardwareStatus?'w-3 h-3 bg-green-500 rounded-full':"w-3 h-3 bg-red-500 rounded-full"}></div>
            <span className="text-sm text-gray-600">
              {hardwareStatus?'Sytem Online':'System Offline'}</span>
          </div>

          <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
