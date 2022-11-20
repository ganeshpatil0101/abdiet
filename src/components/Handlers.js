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

const sortDates = (a,b)=>{
    if(a.formatted == b.formatted){ 
       return 0
    } 
    if(a.formatted < b.formatted){
      return 1
    }else{
      return -1
    }
}

export function removeOldData(arr, seperator="_") {
    console.log('====>>> arr ', arr);
    const dateConverted = arr.map(date=>{ 
        const data_arr = date.split(seperator);
        return {formatted:new Date(data_arr[2],data_arr[1]-1,data_arr[0]),raw:date};
    });

    const filteredSorted = dateConverted.filter(x=>(x.formatted<new Date())).sort(sortDates);

    const [a,b,...data] = filteredSorted;

    return (data||[]).map(x=>x.raw);
}


// const arr =['12_09_2022',
//  '10_09_2022',
//  '11_09_2022',
//  '07_09_2022',
//  '05_09_2022',
//  '22_11_2022'];

// console.log(testme(arr,"_"));