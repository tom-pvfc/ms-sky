import * as React from 'react';
import { Header } from '../../ui/Header/Header';

const TopSideLayout = (props) => {
    return (
        <div className="top-side-layout">
            {
                props.showHeader &&
                    <div className="top-side-layout__header z-depth-2">
                        <Header 
                            navData={NAV_DATA}
                            currSection={props.currSection}
                        />
                    </div>
            }
            <div className="top-side-layout__body">
                {
                    props.children
                }
            </div>
        </div>
    )
}

export default TopSideLayout;

const NAV_DATA = [
    {
        key: "dashboard",
        title: "Dashboard",
        url: "",
        parent: ""
    },
    {
        key: "movies",
        title: "Movies",
        url: "/movies",
        parent: ""
    },
    {
        key: "timeseries",
        title: "TimeSeries",
        url: "/timeseries",
        parent: ""
    }
]