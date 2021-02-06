import { useTheme } from '@material-ui/core';
import { FC } from 'react';
import {
    CartesianGrid,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

export const Chart: FC<any> = ({ data, units }) => {
    const theme = useTheme();
    units = 'metric';
    let u = units === 'metric' ? ' °C' : ' °F';

    return (
        <div>
            <LineChart
                width={900}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                    dataKey="date"
                    tickFormatter={(val) => val.slice(6)}
                    minTickGap={50}
                />
                <YAxis />
                <Tooltip
                    contentStyle={{
                        backgroundColor: theme.palette.background.default,
                    }}
                    formatter={(val: any, name: any) => [
                        val + u,
                        name.toUpperCase(),
                    ]}
                />
                <Line
                    type="monotone"
                    dataKey="temp"
                    stroke={theme.palette.primary.main}
                />
            </LineChart>
        </div>
    );
};
