import * as React from 'react';
import { iNavData } from '../../../models/models';

export interface NavMenuProps {
    className?: string;
    navData: iNavData[];
    currSection: string;
}

export const NavMenu: React.SFC<NavMenuProps> = (props) => {
    const cls = props.className || "";

    return (
        <ul className={"nav-menu " + cls}>
            {props.navData.map((item: iNavData, i) => (
                <li
                    key={item.key}
                    className={`nav-menu__item ${(props.currSection == item.key ? "nav-menu__item--active " : "")}`}
                >
                    <a className="nav-menu__link" href={`#${item.url}`}>
                        {item.title}
                    </a>
                    {item.children && item.children.length > 0 && (
                        <ul className="nav-menu__sub-list">
                            {item.children.map(subItem => (
                                <li key={subItem.key} className="nav-menu__sub-item">
                                    <a href={subItem.url} className="nav-menu__sub-item-link">
                                        {subItem.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    )
}
