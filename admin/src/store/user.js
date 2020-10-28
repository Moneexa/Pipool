import axios from 'axios';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import config from 'config.json';
import * as toastr from 'toastr';


//----------------- Initialization ----------------//
let localStorageData = JSON.parse(localStorage.getItem('userInfo') || "{}");
// safety check
if (!localStorageData?.token?.expiry) {
    localStorageData = Object.assign({}, localStorageData, {
        token: {
            expiry: new Date(-8640000000000000)
        }
    })
}
const expiry = new Date(localStorageData?.token?.expiry);


//----------------- Subjects ----------------//
const isLoggedIn = new BehaviorSubject(expiry > new Date());
const loading = new BehaviorSubject(false);
const user = new ReplaySubject(1);

if (expiry > new Date()) {
    user.next(localStorageData)
}

export const isLoggedIn$ = isLoggedIn.asObservable();
export const loading$ = loading.asObservable();
export const user$ = user.asObservable();

//----------------- xxxxxxxx ----------------//


export async function login(token) {
    try {
        loading.next(true);
        const { data } = await axios.post(`${config.apiUrl}/auth/login/admin`, { token })
        isLoggedIn.next(true);
        user.next(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        loading.next(false);
        toastr.error("Invalid login token provided")
    }

}
