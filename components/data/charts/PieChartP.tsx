"use client"
import React, { PureComponent } from 'react';
import { PieChart, ResponsiveContainer, Pie, Cell, Tooltip} from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomTooltip = ({ active, payload }: { active: boolean , payload: any[]}) => {
    if (active && payload && payload.length) {
        const dataPoint = payload[0].payload;
        return (
            <div className="bg-white shadow-md p-2 rounded-sm">
                <p className="text-[12px] font-normal">{`Name: ${dataPoint.name}`}</p>
                <p className="text-[12px] font-normal">{`Value: ${dataPoint.value}`}</p>
            </div>
        );
    }
};

export const PieChartP = () => {
    return (
        <div>
            {/* <ResponsiveContainer> */}
                <PieChart width={300} height={400}>
                    <Tooltip
                        content={<CustomTooltip active={true} payload={data} />}
                        cursor={{ fill: "transparent" }}
                    />
                    <Pie
                        data={data}
                        cx={120}
                        cy={200}
                        innerRadius={60}
                        outerRadius={80}
                        width={200}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            {/* </ResponsiveContainer> */}
        </div>
    )
}