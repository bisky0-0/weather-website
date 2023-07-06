import { addSeconds, format, fromUnixTime } from "date-fns";

export function formatingDate(unixAmount, timezoneOffset, Timeformat) {
    return format(addSeconds(fromUnixTime(unixAmount), timezoneOffset + new Date().getTimezoneOffset() * 60), Timeformat)
}

export function fahr(amount) {
    return Math.round((amount - 273.15) * 9 / 5 + 32);
}

export function celi(amount) {
    return Math.round(amount - 273.15);
}

export function inputRegxp(input) {
    return input
        .replace(/(\s+$|^\s)/g, '')//remove any whitespace in the end and begginig
        .replace(/(,\s+)/g, ',')//remove any whitespace after comma
        .replace(/(\s+,)/g, ',')//remove any whitespace before comma
        .replace(/(\s+)/g, '+')//remove any whitespcae existes without comma afteror before and replace it with (-)
        .replace(/([A-Z]+)/g, (match) => {
            return match.toLowerCase()
        })//convert all uppercase letter to lowercase
}


