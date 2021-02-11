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
import { TUnits } from '../../common/types';
import { timeToString } from '../../utils/timeToString';

type TProps = {
    units: TUnits;
    data: any;
};

export const Chart: FC<TProps> = ({ data, units }) => {
    const theme = useTheme();
    const u = units === 'metric' ? ' °C' : ' °F';

    let formatedData = [];
    let date = data.list.map((item: any) => {
        let str: string;
        str = item.dt_txt.slice(11, 16);
        str += ' ' + item.dt_txt.slice(5, 10);
        return str;
    });
    let temp = data.list.map((item: any) => Math.round(item.main.temp));

    for (let i = 0; i < date.length; i++) {
        formatedData.push({
            date: date[i],
            temp: temp[i],
        });
    }

    return (
        <div>
            <LineChart
                width={900}
                height={300}
                data={formatedData}
                margin={{
                    top: 5,
                    right: 50,
                    left: 20,
                    bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                    dataKey="date"
                    tickFormatter={(val) => val.slice(6)}
                    minTickGap={50}
                />
                <YAxis unit={u} />

                <Tooltip
                    contentStyle={{
                        backgroundColor: theme.palette.background.default,
                    }}
                    labelFormatter={(lab) => timeToString(lab)}
                    formatter={(val: any, name: any) => [
                        val + u,
                        name === 'temp' ? 'Temperature' : name,
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
