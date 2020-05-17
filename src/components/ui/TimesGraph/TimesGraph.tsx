import * as React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label
} from 'recharts';
import { SCREEN_WIDTH } from '../../../config';
import { NUMBER_FORMAT_FUNCTION } from '../../../constants';

export interface TimesGraphProps {
    className?: string;
    chartData: any[] | any;
}

export interface TimesGraphState {

}

export const CustomizedTooltip = (props) => {

    if (props.payload && props.payload[0]) {
        return (
            <div className="custom-tooltip">
                <div className="custom-tooltip__wrapper">
                    <p className="label">{`date: ${NUMBER_FORMAT_FUNCTION.convertDateOnly(props.payload[0].payload.timestamp)}`}</p>
                    <p className="label">{`time: ${NUMBER_FORMAT_FUNCTION.convertTimeOnly(props.payload[0].payload.timestamp)}`}</p>
                    <p className="desc">{"number of viewers: " + NUMBER_FORMAT_FUNCTION.decimal(props.payload[0].payload.value, 0)}</p>
                </div>
            </div>
        );
    }

    return null;
}

export class TimesGraph extends React.Component<TimesGraphProps, TimesGraphState>{
    el: HTMLDivElement;
    constructor(p: TimesGraphProps) {
        super(p);
    }

    setMargins = () => {
        if (SCREEN_WIDTH.IS_LARGE()) {
            return { top: 15, right: 30, left: 0, bottom: 17 }
        }
        return { top: 10, right: 30, left: 0, bottom: 12 };
    }

    render() {
        let { props, state } = this,
            cls = this.props.className || "";

        // console.log('times graph ', props.chartData)

        return (
            <div className="times-graph">
                <AreaChart
                    width={850}
                    height={400}
                    data={props.chartData}
                    margin={{
                        top: 10, right: 30, left: 0, bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" tickFormatter={(tick) => NUMBER_FORMAT_FUNCTION.convertTimeOnly(tick)} />
                    <YAxis dataKey="value" >
                        {/* label="number of views (thousands)" */}
                        <Label angle={-90} value='number of views (thousands)' position='insideLeft' style={{ textAnchor: 'middle' }} />

                    </YAxis>
                    <Tooltip content={<CustomizedTooltip />} />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </div>
        )
    }
}