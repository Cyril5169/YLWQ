import { get, post, patch, put } from './httpASP'

export function UpdateState(data, config = {}) {
    return post('/CUSTOMERINFOCARD/UpdateState', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function GetCardByCustomer(data, config = {}) {
    return post('/CUSTOMERINFOCARD/GetCardByCustomer', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function GetYlContractByCustomer(data, config = {}) {
    return post('/YLCONTRACTENTRY/GetYlContractByCustomer', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function UpdateContractState(data, config = {}) {
    return post('/YLCONTRACTENTRY/UpdateContractState', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function GetCardAndContract(data, config = {}) {
    return post('/CUSTOMERINFOCARD/GetCardAndContract', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function QueryWebMenuByUserId(data, config = {}) {
    return post('/WEB_MENU/QueryWebMenuByUserId', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}