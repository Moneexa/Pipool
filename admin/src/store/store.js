import { createStore } from 'easy-peasy';
import {CampaignInsightsModel} from './campaigns-insights.model'
import {reportsAdminModel} from './reports-admin.model'

export const store = createStore({
    campaignInsights: CampaignInsightsModel,
    reportsAdmin : reportsAdminModel
    
    //notifications: thunk(notificationsReducer())
});
