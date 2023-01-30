import React from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import {Box} from "@mui/material";

const UserAppliedChart = ({data}) => {
    return (
        <Box>
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                    width={500}
                    height={367}
                    data={data}
                    syncId="anyId"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Area type="monotone" dataKey="applied" stroke="#A368F1" fill="#D2B6FB"/>
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    );
}

export default UserAppliedChart;