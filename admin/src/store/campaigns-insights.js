import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

const loading = new BehaviorSubject(false);
const campaignList = new ReplaySubject(1);

export const loading$ = loading.asObservable();
export const campaignList$ = campaignList.asObservable();

export async function listCampaign() {
    console.log('listing campaigns')
    loading.next(true);

    const res = await axios.get(`${config.apiUrl}/admin/campaigns/`);
    console.log(res.data)
    loading.next(false);
    campaignList.next(res.data);

}

listCampaign();
