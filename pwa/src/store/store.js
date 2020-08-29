import { createStore } from 'easy-peasy';
import { ChannelModel } from './channel.model'
import { UserModel } from './user.model';
import { BrandModel } from './brand.model';
import { CampaignModel } from './campaign.model';
import {InsightsModel} from './insights.model'
import {proposalModel} from './proposals.model'

export const store = createStore({
    channels: ChannelModel,
    user: UserModel,
    brand: BrandModel,
    campaign: CampaignModel,
    insights: InsightsModel,
    proposals: proposalModel
    //notifications: thunk(notificationsReducer())
});
