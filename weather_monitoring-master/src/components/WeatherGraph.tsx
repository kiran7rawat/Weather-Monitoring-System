import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface WeatherGraphProps {
  data: Array<{
    date: string;
    temperature: number;
  }>;
  isCelsius: boolean;
}

export const WeatherGraph: React.FC<WeatherGraphProps> = ({ data, isCelsius }) => {
  const convertedData = data.map(point => ({
    ...point,
    temperature: isCelsius ? point.temperature : (point.temperature * 9/5) + 32
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Temperature Forecast</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={convertedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              label={{
                value: `Temperature (°${isCelsius ? 'C' : 'F'})`,
                angle: -90,
                position: 'insideLeft'
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}