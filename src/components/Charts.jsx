import { Card } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

const lineData = [
  { name: "00:00", value: 1200 },
  { name: "04:00", value: 2400 },
  { name: "08:00", value: 5000 },
  { name: "12:00", value: 8000 },
  { name: "16:00", value: 6500 }
];

const pieData = [
  { name: "Подтверждены", value: 80 },
  { name: "Ошибки", value: 10 },
  { name: "Проверка", value: 10 }
];

const COLORS = ["#52c41a", "#ff4d4f", "#faad14"];

export default function Charts() {
  return (
    <div className="charts-row">

      <Card title="Динамика обработки проводок" className="chart-card">

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={lineData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#1677ff"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>

      </Card>

      <Card title="Распределение счетов-фактур по статусам" className="chart-card">

        <ResponsiveContainer width="100%" height={320}>
          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={110}
              innerRadius={60}
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </Card>

    </div>
  );
}