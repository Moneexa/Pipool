import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

const loading = new BehaviorSubject(false);
const disputes = new ReplaySubject(1);

export const loading$ = loading.asObservable();
export const disputes$ = disputes.asObservable();

export async function listDisputes() {

    try {
        console.log('listing disputes')
        loading.next(true);

        const res = await axios.get(`${config.apiUrl}/admin/campaigns/disputed`);
        console.log(res.data)
        loading.next(false);
        disputes.next(res.data);

    } catch (error) {
        toastr.error("Something went wrong while fetching campaigns")
    }
}

listDisputes();
