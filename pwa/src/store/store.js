import { createStore, action, thunk } from 'easy-peasy';
import { ChannelModel } from './channel.model'
import { UserModel } from './user.model';
import { BrandModel } from './brand.model';
import { CampaignModel } from './campaign.model';
import {InsightsModel} from './insights.model'

export const store = createStore({
    channels: ChannelModel,
    user: UserModel,
    brand: BrandModel,
    campaign: CampaignModel,
    insights: InsightsModel
    //notifications: thunk(notificationsReducer())
});
