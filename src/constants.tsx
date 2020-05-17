export const APP_START = 0x0100000;

export const NUMBER_FORMAT_FUNCTION = {
    numberWithCommas: (x) => {
        let s: string = ",";
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, s);
    },
    currencyNumber: (x, symbol) => {
        x = parseInt(x).toFixed(0);
        return x === "£-" ? "N/A" : (x < 0 ? "-" : "") + symbol + Math.abs(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    decimal: (x, decimalPoints) => {
        return parseFloat(x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")).toFixed(decimalPoints);
    },
    percent: (x) => {
        x = x * 100;
        return (x).toFixed(x < 1 ? 2 : x < 10 ? 1 : 0) + "%";
    },
    seCurrency: (x, symbol) => {
        x = parseInt(x).toFixed(0);
        return x === "£-" ? "N/A" : (x < 0 ? "-" : "+") + symbol + Math.abs(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    reverseCurrencyNumber: function (x, symbol) {
        x = parseInt(x).toFixed(0);
        return Math.abs(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + symbol;
    },
    addPostFix: (labelValue: number, decimalPlaces: number, label: string) => {
        return Math.abs(Number(labelValue)) >= 1.0e+9
            ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(decimalPlaces) + label
            // Six Zeroes for Millions
            : Math.abs(Number(labelValue)) >= 1.0e+6
                ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(decimalPlaces) + label
                // Three Zeroes for Thousands
                : Math.abs(Number(labelValue)) >= 1.0e+3
                    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(decimalPlaces) + label
                    : Math.abs(Number(labelValue));
    },
    convertDate: (value: number) => {
        let timestamp = value;
        let date = new Date(timestamp * 1000);

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        return (year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds)
    },
    convertDateOnly: (value: number) => {
        let timestamp = value;
        let date = new Date(timestamp * 1000);

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return (year + "-" + month + "-" + day)
    },
    convertTimeOnly: (value: number) => {
        let timestamp = value;
        // let date = new Date(timestamp * 1000);
        // let hours = date.getHours();
        // let minutes = date.getMinutes();
        // let seconds = date.getSeconds();
        let date = new Date(timestamp * 1000);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? minutes : minutes;
        var strTime = hours + '' + ampm;
        return strTime;

        // return (hours + ":" + minutes + ":" + seconds)
    }
}
