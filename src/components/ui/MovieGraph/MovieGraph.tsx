import * as React from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label,
  } from 'recharts';
import { NUMBER_FORMAT_FUNCTION } from '../../../constants';

export interface MovieGraphProps {
    className?: string;
    chartData: any[] | any;
}

export interface MovieGraphState {

}

   export const CustomAxisTick = (props) => {
    const { x, y, stroke, payload } = props;
    // console.log("payload " , payload)
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="start" fill="#666" transform="rotate(45)">
                {payload.value}
            </text>
        </g>
    )
}
export class MovieGraph extends React.Component<MovieGraphProps, MovieGraphState>{
    el: HTMLDivElement;
    constructor(p: MovieGraphProps) {
        super(p);
    }

    render() {
        let { props, state } = this,
            cls = this.props.className || "";

        // console.log('movie graph ', props.chartData)
        return (
            <div className="movie-graph">
                <BarChart
                    width={750}
                    height={600}
                    data={props.chartData}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 85,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tickCount={0} height={200} tick={<CustomAxisTick/>} allowDataOverflow={true} interval={0} />
                    <YAxis   tickFormatter={(tick) => NUMBER_FORMAT_FUNCTION.numberWithCommas(tick)}/>
                    <Tooltip offset={150} />
                    <Legend align="center" verticalAlign="top" margin={{top: -20}} />
                    <Bar dataKey="nowtvTotalViews" stackId="a" fill="#8884d8" />
                    <Bar dataKey="skygoTotalViews" stackId="a" fill="#82ca9d" />
                </BarChart>
            </div>
        )
    }
}