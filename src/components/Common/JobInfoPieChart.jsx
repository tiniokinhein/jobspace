import React from "react";
import {Box} from "@mui/material";
import {Cell, Pie, PieChart, ResponsiveContainer} from "recharts";

const JobInfoPieChart = ({data}) => {

    const analysis = () => {
        if (data.candidate || data.prescreens || data.considering ||
            data.shortlists || data.interviews || data.hired ||
            data.not_suitable) {

            return [
                {name: "Candidates", value: data.candidate},
                {name: "Prescreen", value: data.prescreens},
                {name: "Considering", value: data.considering},
                {name: "Not Suitable", value: data.not_suitable},
                {name: "Shortlisted", value: data.shortlists},
                {name: "Interview", value: data.interviews},
                {name: "Hired", value: data.hired}
            ]
        } else {
            return [{name: "No Data", value: 1}];
        }
    }

    const colors = () => {
        if (data.candidate || data.prescreens || data.considering ||
            data.shortlists || data.interviews || data.hired ||
            data.not_suitable) {
            return ["#FF9635", "#00A0DC", "#EF5DA8", "#FFE15A", "#B0F330", "#92E3A9", "#FF0000"];
        } else {
            return ["#A1A1A1"];
        }
    }

    return (
        <Box sx={{ width: '100%', height: {xs: 300, sm: 400}, display: 'flex', justifyContent: "space-around" }}>
            <ResponsiveContainer minWidth={260} minHeight={240}>
                <PieChart>
                    <Pie
                        data={analysis()}
                        // cx={200}
                        // cy={200}
                        labelLine={false}
                        label={false}
                        outerRadius="100%"
                        fill="#8884d8"
                        dataKey="value"
                        stroke='none'
                    >
                        {analysis().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors()[index % colors().length]}/>
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
}

export default JobInfoPieChart;