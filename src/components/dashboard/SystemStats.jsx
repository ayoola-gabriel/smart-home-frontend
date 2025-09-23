import DashboardCard from "../cards/DashboardCard";
import { ceil } from "lodash";

const SystemStats = ({voltage, frequency, temperature, current}) => {
  const status = () => {
    if(voltage<180){
      return 'Undervoltage'
    } else if(voltage>240){
      return 'Overvoltage'
    } else if(current>150){
      return 'Overload'
    } else {
      return 'Good'
    }
  }
  
  return (
    <DashboardCard>
    <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
        <span className="text-2xl">📊</span>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Voltage</span>
          <span className="font-medium text-gray-900" id="voltageReading">
            {voltage?ceil(voltage):'0'}V
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Frequency</span>
          <span className="font-medium text-gray-900">{frequency?frequency:'0'}Hz</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Status</span>
          <span className="font-medium text-gray-900">{status()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Temperature</span>
          <span className="font-medium text-gray-900">{temperature?temperature:'0'}°C</span>
        </div>
      </div>
    </DashboardCard>
  );
};

export default SystemStats;
