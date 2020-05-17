import * as React from 'react';
import { iTimeData, Dictionary } from '../../../models/models';
import { LinkButton } from '../Button/Button';
import * as _ from 'lodash';
import { NUMBER_FORMAT_FUNCTION } from '../../../constants';
import { Spinner } from '../Spinner/Spinner';

export interface DashboardViewsProps {
    className?: string;
    data: Dictionary<iTimeData>;
}

export interface DashboardViewsState {
    peakTime: any;
    dailyViews: number;
}

export class DashboardViews extends React.Component<DashboardViewsProps, DashboardViewsState>{
    el: HTMLDivElement;
    constructor(p: DashboardViewsProps) {
        super(p);

        this.state = {
            peakTime: null,
            dailyViews: -1
        }
    }

    componentDidMount() {
        this.calculatePeakTime();
        this.calculateDailyViews();
    }

    calculatePeakTime = () => {
        let data = this.props.data;
        let maxPeakTime = _.maxBy(_.toArray(data), (e: any) => {
            return e.value
        });

        this.setState({
            peakTime: maxPeakTime
        })
    }

    calculateDailyViews = () => {
        let data = this.props.data;

        let sum = _.sumBy(_.toArray(data), (e: any) => {
            return e.value
        });

        this.setState({
            dailyViews: sum
        })
    }

    render() {
        let { props, state } = this,
            cls = this.props.className || "";

        // console.log('dashboard views data ', props.data)

        if (!state.peakTime) {
            return <Spinner />
        }

        return (
            <div className="dashboard-views">
                <h1 className="dashboard-views__title hide-on-large-only">
                    Time/Views Stats
                </h1>

                <div className="dashboard-views__peak hide-on-large-only">
                    <p>
                        Current date: {NUMBER_FORMAT_FUNCTION.convertDateOnly(state.peakTime.timestamp)}
                    </p>
                    <p>
                        Peak Time: {NUMBER_FORMAT_FUNCTION.convertTimeOnly(state.peakTime.timestamp)}
                    </p>
                    <p>
                        Viewers: {state.peakTime.value}
                    </p>
                </div>

                <div className="dashboard-views__totalviews hide-on-large-only">
                    <p>
                        Total Daily Views: {NUMBER_FORMAT_FUNCTION.numberWithCommas(state.dailyViews)}
                    </p>
                </div>

                <div className="dashboard-views__card z-depth-2 hide-on-med-and-down">
                    <div className="dashboard-views__card--left">
                        <i className="icon-spinner" />
                    </div>
                    <div className="dashboard-views__card--right">
                        <p>
                            Peak Time: {NUMBER_FORMAT_FUNCTION.convertTimeOnly(state.peakTime.timestamp)}
                        </p>
                    </div>
                </div>

                <div className="dashboard-views__card z-depth-2 hide-on-med-and-down">
                    <div className="dashboard-views__card--left">
                        <i className="icon-switch" />
                    </div>
                    <div className="dashboard-views__card--right">
                        <p>
                            Total Daily Views: {NUMBER_FORMAT_FUNCTION.numberWithCommas(state.dailyViews)}
                        </p>
                    </div>
                </div>

                <LinkButton href="#/timeseries" className="dashboard-views__btn hide-on-large-only">
                    See Full Data
                </LinkButton>
            </div>
        )
    }
}