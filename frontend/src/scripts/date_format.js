export function formatHumanDate(date) {
    if (date == null)
        return 'Не указана';
    if (typeof date === 'string') {
        date = new Date(date);
    }
    else if (typeof date === 'number') {
        date = new Date(date * 1000);
    }

    return getDateMMDDYYYYHHSS(date);
}

function getDateMMDDYYYYHHSS(date = 'now') {
    date = (date === 'now') ? new Date() : date;

    let minutes = date.getMinutes();
    let hours = date.getHours();
    let month = date.getMonth() + 1;
    let dateTemp = date.getDate();
    if (minutes < 10) minutes = `0${ minutes }`;
    if (hours < 10) hours = `0${ hours }`;
    if (dateTemp < 10) dateTemp = `0${ dateTemp }`;
    if (month < 10) month = `0${ month }`;

    return `${ dateTemp }.${ month }.${ date.getFullYear() } ${ hours }:${ minutes }`;
}

export default {
    formatHumanDate
};