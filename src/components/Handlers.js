import {isEmpty} from 'lodash';

export function getYears() {
    const lastYear = new Date().getFullYear();
    let years = [];
    for(let i=2010; i <= lastYear; i++) {
        years.push(i);
    }
    return years;
}
export function getCurrentYear() {
    return new Date().getFullYear();
}

export function getTimeInMs() {
    return new Date().getTime();
}
export function getFromTo(arrEl, from, to) {
    const data = [];
    let toLen = (arrEl.length < to) ? arrEl.length : to;
    for(let i = from; i <= toLen; i++) {
        data.push(arrEl[i]);
    }
    return data;
}
export const getFormattedDate = (sDate) => {
    return `${sDate.getDate()}_${sDate.getMonth()+1}_${sDate.getFullYear()}`;
}
export const getTodaysDate = () => {
    const sDate = new Date();
    return `${sDate.getDate()}/${sDate.getMonth()+1}/${sDate.getFullYear()}`;
}
export const isValidUser = (userData) => {
    return !isEmpty(userData) && !isEmpty(userData.currentUser) && !isEmpty(userData.currentUser.user)
}