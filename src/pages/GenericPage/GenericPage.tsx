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
import * as _ from 'lodash';
import { MovieGraph } from '../../components/ui/MovieGraph/MovieGraph';
import { TimesGraph } from '../../components/ui/TimesGraph/TimesGraph';

export interface GenericPageProps extends ReactRedux.DispatchProp<any>, RouteComponentProps<any> {
    className?: string;
    deeplink: string;
    data: Dictionary<iData>;
    timeData: Dictionary<iTimeData>;
    navData: iNavData[];
}

const INIT_STATE: GenericPageState = {
    showHeader: true,
    currentPage: ""
}

export interface GenericPageState {
    showHeader: boolean
    currentPage: string;
}

export class GenericPage extends React.Component<GenericPageProps, GenericPageState>{

    constructor(props: GenericPageProps) {
        super(props);
        this.state = INIT_STATE;
    }

    componentDidMount() {
        this.setPage();
    }

    componentDidUpdate(prevProps: GenericPageProps, prevState: GenericPageState) {
        if (prevProps.match.params.key !== this.props.match.params.key) {
            //update state if the url changes
            this.setPage();
        }
    }

    setPage = () => {
        //set current page to be the current u
        this.setState({
            currentPage: this.props.match.params.key
        })
    }

    getGraph = () => {
        switch (this.state.currentPage) {
            case "movies":
                return <MovieGraph 
                            chartData={this.props.data} 
                        />
            case "timeseries":
                return <TimesGraph 
                            chartData={this.props.timeData} 
                        />
            default:
                break;
        }
    }

    render() {
        const { props, state } = this;
        const cls = this.props.className || "";

        if (!props.data || props.data == undefined) {
            return <Spinner />
        }

        let title = _.capitalize(this.props.match.params.key);
        let description = "Fusce ut mauris massa. Integer in eros libero. Curabitur enim diam, mattis eget justo id, sodales pulvinar justo. Aliquam nulla augue, aliquam id odio vitae, cursus volutpat nibh. Mauris aliquet lectus neque, et dignissim tortor dictum vel. Nulla eros nisi, bibendum et scelerisque nec, iaculis ac arcu. Suspendisse tincidunt accumsan ligula id rutrum.";

        return (
            <TopSideLayout
                currSection={state.currentPage}
                showHeader={state.showHeader}>
                <>
                    <MainTitle
                        key={"gp-" + state.currentPage}
                        title={title} //this would normally be dynamic
                        description={description} //this would normally be dynamic
                    />
                    <div  className="generic-page__content hide-on-med-and-down">
                        <div className="generic-page__content--graph">
                            {
                                this.getGraph()
                            }
                        </div>
                    </div>
                </>
            </TopSideLayout>
        )
    }
}

const mapStateToProps = (state: IStoreState, ownProps): Partial<GenericPageProps> => {
    return {
        data: state.app.data,
        timeData: state.app.timeData
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GenericPage);