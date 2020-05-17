import * as React from 'react';

const MainTitle = (props) => {
    return (
        <div className="main-title ">
            <div className="main-title__block main-title__header animated fadeIn delay-2">
                <h1>
                    {
                        props.title
                    }
                </h1>
            </div>
            <div className="main-title__block main-title__description animated fadeIn delay-4">
                <p>
                    {
                        props.description
                    }
                </p>
            </div>
        </div>
    )
}

export default MainTitle;