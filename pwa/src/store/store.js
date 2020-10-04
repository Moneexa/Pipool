import { createStore } from 'easy-peasy';
import { ChannelModel } from './channel.model'
import { UserModel } from './user.model';
import { BrandModel } from './brand.model';
import { BrandsCampaignsModel } from './brands-campaigns.model';
import { InfluencersCampaignsModel } from './influencers-campaigns.model';
import { InsightsModel } from './insights.model'
import { influencersProposalModel } from './influencers-proposals.model'
import { brandsProposalModel } from './brands-proposals.model'
import { videosModel } from './videos.model'
import { ChatModel } from './chat.model'
import { CustomerModel } from './customer.model';
import {OfferModel} from './offer.model'
export const store = createStore({
    channels: ChannelModel,
    user: UserModel,
    brand: BrandModel,
    influencersCampaigns: InfluencersCampaignsModel,
    brandsCampaignsModel: BrandsCampaignsModel,
    insights: InsightsModel,
    influencersProposals: influencersProposalModel,
    brandsProposals: brandsProposalModel,
    videos: videosModel,
    chats: ChatModel,
    customer: CustomerModel,
    offer: OfferModel,
    //notifications: thunk(notificationsReducer())
});
