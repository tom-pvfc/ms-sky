import * as React from 'react';
import { NavMenu } from '../NavMenu/NavMenu';
import { iNavData } from '../../../models/models';
import { RES_URL } from '../../../config';

export interface HeaderProps {
    className?: string;
    navData: iNavData[];
    currSection: string;
}

export interface HeaderState {

}

export class Header extends React.Component<HeaderProps, HeaderState>{
    el: HTMLDivElement;
    constructor(p: HeaderProps) {
        super(p);
    }

    render() {
        const { props, state } = this,
            cls = this.props.className || "";

        return (
            <div className={"header " + cls} ref={e => this.el = e}>              
                <div className={`header__menu`}>
                    {props.navData && props.navData.length > 0 && (
                        <NavMenu
                            currSection={props.currSection}
                            navData={props.navData}
                        />
                    )}
                </div>
                <a href="">
                    <div className="header__logo">
                        <img src={RES_URL + "img/logo_3.png"} alt="Monitoring Program" />
                    </div>
                </a>
            </div>
        )
    }
}
