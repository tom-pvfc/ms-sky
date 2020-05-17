import * as Promise from 'bluebird';

export class DataService {
    app: any;
    database: any;
    def: any;
    data: any;
    timeData: any;
    isDataLoaded: boolean;

    constructor() {
        this.isDataLoaded = false;
    }

    load() {
        return new Promise((res, rej) => {
            fetch("https://my-json-server.typicode.com/sky-uk/monitoring-tech-test/assets")
            .then(res => res.json())
            .then(
              (result) => {
                  this.isDataLoaded = true;
                    res(result);
              },
              (error) => {
                  console.log("error calling API " , error)
                  this.isDataLoaded = false;
              }
            )
        })
    }   

    loadTimeData() {
        return new Promise((res, rej) => {
            fetch("https://my-json-server.typicode.com/sky-uk/monitoring-tech-test/data")
            .then(res => res.json())
            .then(
              (result) => {
                  this.isDataLoaded = true;
                    res(result);
              },
              (error) => {
                  console.log("error calling API " , error)
                  this.isDataLoaded = false;
              }
            )
        })
    }   

    getByKey = (key: string) => {
        return this.data[key];
    }


    getNavBar = () => {
        return this.data.navBar;
    }

    getData() {
        return this.data;
    }

    getTimeData() {
        return this.timeData;
    }

}

const DATA_SERVICE = new DataService();

export default DATA_SERVICE;
