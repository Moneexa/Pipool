import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

const reportsList = new ReplaySubject(1);

export const reportsList$ = reportsList.asObservable();

export async function listReports() {
    const res = await axios.get(`${config.apiUrl}/admin/reports/`);
    console.log(res.data)
    reportsList.next(res.data);
}

listReports();
