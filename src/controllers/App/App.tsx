import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, } from 'react-router-dom';
import { ACTIONS } from './Actions';
import { AppProps, inAppState, inAppInitialState } from './StateAndProps';
import HomePage from '../../pages/HomePage/HomePage';
import DATA_SERVICE from '../../services/DataService';
import GenericPage from '../../pages/GenericPage/GenericPage';
import { Spinner } from '../../components/ui/Spinner/Spinner';

export const STATE_KEY = 'app';

class App extends React.Component<AppProps, inAppState>{
    constructor(props: AppProps) {
        super(props);
        this.state = inAppInitialState;
    }

    componentDidMount() {
        //get data
        if (DATA_SERVICE.isDataLoaded) {
            this.props.loadData(DATA_SERVICE.getData(), DATA_SERVICE.getTimeData());
        } else {
            //get first API data  and put into redux
            DATA_SERVICE.load().then((e) => {
                //get second API data and put into redux
                DATA_SERVICE.loadTimeData().then((f) => {
                    this.props.loadData(e , f);
                })
            })
        }
        window.addEventListener("resize", this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }

    resize = () => {
        this.forceUpdate();
    };

    render() {
        if (!DATA_SERVICE.isDataLoaded) {
            return <Spinner />
        }
        
        return (
            <div className={`app`}>
                <Router hashType="noslash">
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/:key?" component={GenericPage} />
                    </Switch>
                </Router>
            </div>
        );
    }
};

function mapStateToProps(state: any, ownProps) {
    return {
        appState: state.app
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ loadData: ACTIONS.DATA_LOADED }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);