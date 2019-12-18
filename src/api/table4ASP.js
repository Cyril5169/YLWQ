import { get, post, patch, put } from './httpASP'

export function SearchCardList(data, config = {}) {
    return post('/PUR_HEAD/SearchCardList', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function SearchCardTotal(data, config = {}) {
    return post('/PUR_HEAD/SearchCardTotal', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function SearchBookList(data, config = {}) {
    return post('/PUR_HEAD/SearchBookList', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function SearchBookTotal(data, config = {}) {
    return post('/PUR_HEAD/SearchBookTotal', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function CardExcel(data, config = {}) {
    return post('/PUR_HEAD/CardExcel', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function GetCardYear(data, config = {}) {
    return post('/PUR_HEAD/GetCardYear', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function GetBookYear(data, config = {}) {
    return post('/PUR_HEAD/GetBookYear', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}