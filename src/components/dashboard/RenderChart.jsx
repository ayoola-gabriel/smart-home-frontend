import DashboardCard from "../cards/DashboardCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RenderChart = ({ minValue, maxValue, title, data, color = "#8884d8", unit }) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="time" />
          <YAxis
            domain={[minValue,maxValue]}
            // width="auto"
            // label={{ value: title, position: "insideLeft", angle: -90 }}
          />
          <Tooltip formatter={(value) => `${value} ${unit}`} />
          {/* <Legend /> */}
          <Line
            type="monotone"
            dataKey={title}
            stroke={color}
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RenderChart;
