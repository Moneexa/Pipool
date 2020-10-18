import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

const loading = new BehaviorSubject(false);
const adsRequests = new ReplaySubject(1);

export const loading$ = loading.asObservable();
export const adsRequests$ = adsRequests.asObservable();

export async function listAdsRequests() {

    try {
        console.log('listing ads')
        loading.next(true);

        const res = await axios.get(`${config.apiUrl}/admin/ads-requests/`);
        console.log(res.data)
        loading.next(false);
        adsRequests.next(res.data);

    } catch (error) {
        toastr.error("Something went wrong while fetching ads")
    }
}

listAdsRequests();
