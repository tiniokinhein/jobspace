import React from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const VisitorChart = ({data}) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart margin={{top: 15, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="1 0" vertical={false}/>
                <XAxis
                    dataKey="day"
                    type="category"
                    allowDuplicatedCategory={true}
                />
                <YAxis
                    dataKey="value"
                    label={{
                        value: 'Page views',
                        angle: -90,
                        position: 'insideLeft',
                    }}
                    axisLine={false}
                />
                <Tooltip/>
                <Line dataKey="value" data={data}/>
            </LineChart>
        </ResponsiveContainer>
    );
}

export default VisitorChart;