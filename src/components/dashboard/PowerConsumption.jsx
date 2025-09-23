import DashboardCard from "../cards/DashboardCard"
import { ceil } from "lodash"

const PowerConsumption = ({current, total_power}) => {
  
  const makePowerBar = ({current}) => {
    const powerBar = Math.ceil((Number(current)/150)*100)
    return String(powerBar)
  }

  const powerStyle = (value) => {
    let power = Number(value)
    let style=''
    if(power>=75){
      style='bg-red-600'
    } else if(power<90 && power>=25){
      style='bg-green-600'
    } else if(power<25){
      style='bg-yellow-500'
    }
    return style
  }

  return (
    <DashboardCard>
    <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Power Consumption
          </h3>
          <span className="text-2xl">⚡</span>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Total Power</span>
              <span id="totalPower">{total_power?(ceil((total_power/1000),2)):0}KW</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                id="powerBar"
                className={`${powerStyle(makePowerBar({current}))} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${makePowerBar({current})}%`}}
              ></div>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <div
              className="text-2xl font-bold text-gray-900"
              id="currentReading"
            >
              {current?ceil(current,1):'0'}A
            </div>
            <div className="text-sm text-gray-600">Current Draw</div>
          </div>
        </div>
      </DashboardCard>
  )
}

export default PowerConsumption