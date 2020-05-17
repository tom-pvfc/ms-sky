export interface iActionType {
    type: number,
    data: any | any[],
    timeData: any | any[]
}

export interface Dictionary<T> {
    [idx: string]: T;
}

export interface iValue {
    key: string | number;
    value: React.ReactNode;
}

export interface iNavData {
    key: string;
    title: string;
    parent: string;
    url: string;
    children?: iNavData[];
    order?: number;
}

export interface iData {
    //movie views data
    key: string;
    title: string;
    description: string;
    skyViews: number;
    nowTvViews: number;
    data: any[] | any;
}


export interface iTimeData {
    //timeseries data
    key?: string;
    time: string;
    value: string;
}