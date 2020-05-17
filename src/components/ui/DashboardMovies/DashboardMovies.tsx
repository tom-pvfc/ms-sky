import * as React from 'react';
import { iData, Dictionary } from '../../../models/models';
import { Spinner } from '../Spinner/Spinner';
import { NUMBER_FORMAT_FUNCTION } from '../../../constants';
import { LinkButton } from '../Button/Button';

export interface DashboardMoviesProps {
    className?: string;
    data: Dictionary<iData>;
}

export interface DashboardMoviesState {
    highestSkyGo: any;
    lowestSkyGo: any;
    highestNowTV: any;
    lowestNowTV: any;
    showMovies: boolean;
}


export class DashboardMovies extends React.Component<DashboardMoviesProps, DashboardMoviesState>{
    el: HTMLDivElement;
    constructor(p: DashboardMoviesProps) {
        super(p);

        this.state = {
            highestSkyGo: null,
            lowestSkyGo: null,
            highestNowTV: null,
            lowestNowTV: null,
            showMovies: true
        }
    }

    componentDidMount() {
        this.calculateViews();
    }

    calculateViews = () => {
        let allData = this.props.data;

        let maxSkyItem = this.getMax(allData, "skygoTotalViews");
        let minSkyItem = this.getMin(allData, "skygoTotalViews");

        let maxItemNowTv = this.getMax(allData, "nowtvTotalViews");
        let minItemNowTv = this.getMin(allData, "nowtvTotalViews");


        this.setState({
            highestSkyGo: maxSkyItem,
            lowestSkyGo: minSkyItem,
            highestNowTV: maxItemNowTv,
            lowestNowTV: minItemNowTv
        })

    }

    calculateCircleSize = (val) => {
        let ans = (val / 1000) * 25;
        return ans;
        // let area = Math.PI * (div * div);
    }


    getMax = (arr, prop) => {
        var max;
        for (var i = 0; i < arr.length; i++) {
            if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
                max = arr[i];
        }
        return max;
    }

    getMin = (arr, prop) => {
        var max;
        for (var i = 0; i < arr.length; i++) {
            if (max == null || parseInt(max[prop]) > parseInt(arr[i][prop]))
                max = arr[i];
        }
        return max;
    }

    toggleMovies = () => [
        this.setState({
            showMovies: !this.state.showMovies
        })
    ]

    render() {
        let { props, state } = this,
            cls = this.props.className || "";

        // console.log('dashboard movies data ', props.data)

        if (!state.highestSkyGo || !state.lowestSkyGo) {
            return <Spinner />
        }

        return (
            <div className="dashboard-movies">
                <div className={`dashboard-movies__title ${state.showMovies ? 'dashboard-movies__up' : "dashboard-movies__down"}`} onClick={this.toggleMovies}>
                    <h1>
                        Movie Stats
                    </h1>
                    <i className={`icon-arrow`} />
                </div>

                {
                    state.showMovies && <div className="dashboard-movies__wrapper animated fadeIn delay-5 ">

                        <div className="dashboard-movies__overall">
                            <h3 className="dashboard-movies__sub">
                                Sky Go Movies
                        </h3>
                            <div className="dashboard-movies__skygo--title">
                                <p>
                                    Highest and Lowest Viewed Movie:
                                </p>
                            </div>
                            <div className="dashboard-movies__card">
                                {/* this would normally be split into own functional component */}
                                <div className="dashboard-movies__skygo">
                                    <div className="sky-go-max-circle circle z-depth-2"
                                        style={{ height: this.calculateCircleSize(state.highestSkyGo.skygoTotalViews), width: this.calculateCircleSize(state.highestSkyGo.skygoTotalViews), backgroundImage: "url(" + state.highestSkyGo.assetImage + ")" }}>
                                        <h1>
                                            {
                                                NUMBER_FORMAT_FUNCTION.numberWithCommas(state.highestSkyGo.skygoTotalViews)
                                            }
                                        </h1>
                                        <div className="circle__tooltip">
                                            <p>
                                                <b>Movie:</b> {state.highestSkyGo.name}
                                            </p>
                                            <p>
                                                <b>Description:</b> {state.highestSkyGo.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="sky-go-min-circle circle z-depth-2" style={{ height: this.calculateCircleSize(state.lowestSkyGo.skygoTotalViews), width: this.calculateCircleSize(state.lowestSkyGo.skygoTotalViews), backgroundImage: "url(" + state.lowestSkyGo.assetImage + ")" }}>
                                        <h1>
                                            {
                                                NUMBER_FORMAT_FUNCTION.numberWithCommas(state.lowestSkyGo.skygoTotalViews)
                                            }
                                        </h1>
                                        <div className="circle__tooltip">
                                            <p>
                                                <b>Movie:</b> {state.lowestSkyGo.name}
                                            </p>
                                            <p>
                                                <b>Description:</b> {state.lowestSkyGo.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard-movies__overall">
                            <h3 className="dashboard-movies__sub">
                                Now TV Movies
                        </h3>
                            <div className="dashboard-movies__skygo--title">
                                <p>
                                    Highest and Lowest Viewed Movie:
                                </p>
                            </div>
                            <div className="dashboard-movies__card">

                                {/* this would normally be split into own functional component */}
                                <div className="dashboard-movies__nowtv">

                                    <div className="sky-go-max-circle circle z-depth-2"
                                        style={{ height: this.calculateCircleSize(state.highestNowTV.nowtvTotalViews), width: this.calculateCircleSize(state.highestNowTV.nowtvTotalViews), backgroundImage: "url(" + state.highestNowTV.assetImage + ")" }}>
                                        <h1>
                                            {
                                                NUMBER_FORMAT_FUNCTION.numberWithCommas(state.highestNowTV.nowtvTotalViews)
                                            }
                                        </h1>
                                        <div className="circle__tooltip">
                                            <p>
                                                <b>Movie:</b> {state.highestNowTV.name}
                                            </p>
                                            <p>
                                                <b>Description:</b> {state.highestNowTV.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="sky-go-min-circle circle z-depth-2" style={{ height: this.calculateCircleSize(state.lowestNowTV.nowtvTotalViews), width: this.calculateCircleSize(state.lowestNowTV.nowtvTotalViews), backgroundImage: "url(" + state.lowestNowTV.assetImage + ")" }}>
                                        <h1>
                                            {
                                                NUMBER_FORMAT_FUNCTION.numberWithCommas(state.lowestNowTV.nowtvTotalViews)
                                            }
                                        </h1>
                                        <div className="circle__tooltip">
                                            <p>
                                                <b>Movie:</b> {state.lowestNowTV.name}
                                            </p>
                                            <p>
                                                <b>Description:</b> {state.lowestNowTV.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }


                <LinkButton href="#/movies" className="dashboard-views__btn">
                    See Full Movie Data
                </LinkButton>
            </div>
        )
    }
}