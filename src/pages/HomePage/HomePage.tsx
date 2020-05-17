import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { IStoreState } from '../../_reducers';
import { iData, iNavData, Dictionary, iTimeData } from '../../models/models';
import { Spinner } from '../../components/ui/Spinner/Spinner';
import TopSideLayout from '../../components/layouts/TopSideLayout/TopSideLayout';
import MainTitle from '../../components/ui/MainTitle/MainTitle';
import { DashboardViews } from '../../components/ui/DashboardViews/DashboardViews';
import { DashboardMovies } from '../../components/ui/DashboardMovies/DashboardMovies';

export interface HomePageProps extends ReactRedux.DispatchProp<any>, RouteComponentProps<any> {
    className?: string;
    deeplink: string;
    data: Dictionary<iData>;
    timeData: Dictionary<iTimeData>;
    navData: iNavData[];
}

const INIT_STATE: HomePageState = {
    showHeader: true,
    currentPage: ""
}

export interface HomePageState {
    showHeader: boolean
    currentPage: string;
}

export class HomePage extends React.Component<HomePageProps, HomePageState>{

    constructor(props: HomePageProps) {
        super(props);
        this.state = INIT_STATE;
    }

    componentDidMount() {
        //set current page to be the current url 
        this.setState({
            currentPage: this.props.match.params.key
        })
    }

    render() {
        const { props, state } = this;
        const cls = this.props.className || "";

        //if no data then show a spinner
        if (!props.data || props.data == undefined) {
            return <Spinner />
        }

        //fake data
        let title = "Movie Dashboard";
        let description = "Fusce ut mauris massa. Integer in eros libero. Curabitur enim diam, mattis eget justo id, sodales pulvinar justo. Aliquam nulla augue, aliquam id odio vitae, cursus volutpat nibh. Mauris aliquet lectus neque, et dignissim tortor dictum vel. Nulla eros nisi, bibendum et scelerisque nec, iaculis ac arcu. Suspendisse tincidunt accumsan ligula id rutrum.";

        return (
            <TopSideLayout 
                currSection={state.currentPage} 
                showHeader={state.showHeader}>                    
                    <>
                        <MainTitle 
                            title={title} //this would normally be dynamic from dataset
                            description={description} //this would normally be dynamic from dataset
                        />
                        <div className="home-page__content">
                            <div className="home-page__content--time animated zoomIn delay-5">
                                <DashboardViews 
                                    data={props.timeData} 
                                />
                            </div>
                            <div className="home-page__content--movies z-depth-2 animated zoomIn delay-6">
                                <DashboardMovies 
                                    data={props.data} 
                                />
                            </div>
                        </div>
                    </>
            </TopSideLayout>
        )
    }
}

const mapStateToProps = (state: IStoreState, ownProps): Partial<HomePageProps> => {
    return {
        data: state.app.data,
        timeData: state.app.timeData
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);