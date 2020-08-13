import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';


const { action, thunk } = require("easy-peasy");
export const InsightsModel = {
    instagram: {}, instagramAge: {}, instagramCities: {}, instagramCountries: {},
    instagramResponse: {},
    facebook: [],
    lastFetched: "",
    youtubeViews: [], youtubeSubscribers: [], youtubeEstTime: [],
    setInstagram: action((state, payload) => {
        state.instagram = payload;
        console.log(state.instagram)
    }),
    setInstagramAge: action((state, payload) => {
        state.instagramAge = payload;
    }),
    setInstagramCities: action((state, payload) => {
        state.instagramCities = payload;
    }),
    setInstagramCountries: action((state, payload) => {
        state.instagramCountries = payload;
    }),
    setInstagramResponse: action((state, payload) => {
        state.instagramResponse = payload;
    }),
    setLastFetched: action((state, payload) => {
        state.lastFetched = payload;
    }),
    setFacebook: action((state, payload) => {
        state.facebook = payload;
    }),
    setYoutubeViews: action((state, payload) => {
        state.youtubeViews = payload;
    }),
    setYoutubeSubscribers: action((state, payload) => {
        state.youtubeSubscribers = payload;
    }),

    setYoutubeEstTime: action((state, payload) => {
        state.youtubeEstTime = payload;
    }),
    instaInsights: thunk(async (actions, payload) => {
        if (payload.hasOwnProperty("token")) {
            var res = await axios.post(`${config.apiUrl}/channels/insights/instagram/`, payload)
        }
        else {
            var res = await axios.get(`${config.apiUrl}/channels/insights/${payload.channelId}/instagram`)

        }
            var gender = res.data.Gender

            gender=gender.map(value=>{return(value.genderCount)})
            console.log("this is new array"+" "+gender)
            var ageGroup = res.data.AgeGroup
            ageGroup=ageGroup.map(value=>{return(value.ageGroupCount)})
            var cities =[], cityNames=[]
            cities= res.data.Cities.map(value=>{return(value.noOfAudience)})
            cityNames=  res.data.Cities.map(value=>{return(value.cityName)})
            var countries = [], countryNames=[]
            countries=res.data.Countries.map(value=>{return(value.noOfAudience)})
            countryNames=res.data.Countries.map(value=>{return(value.countryName)})
            var response=res.data.response
            console.log(countries)
            const impressions = response.map(value=>{
                if(value.responseType==="impression"){
                    return(value.count)
                }
            })
            const reach = response.map(value=>{
                if(value.responseType==="reach"){
                    return(value.count)
                }
            })
            const followers = response.map(value=>{
                if(value.responseType==="followers"){
                    return(value.count)
                }
            })
            actions.setLastFetched(res.data.lastFetched);
            if (res.status != "200") {
                toastr.error("Something went wrong")
            }
            const insights = {
                labels: ['Female', 'Male', 'Inidentified'],
                datasets: [
                    {
                        label: 'Gender Distribution',
                        backgroundColor: [
                            '#3390FF',
                            '#33E0FF',
                            '#9FE2F8',

                        ],
                        hoverBackgroundColor: [
                            '#A0C2F9',
                            '#91C9F5',
                            '#B5F8EE',

                        ],
                        data: gender
                    }
                ]
            }
            actions.setInstagram(insights);

            const insightsGender = {
                labels: ['13-17', '18-24', '25-34', '35-44', '45-54', '55-64'],
                datasets: [
                    {
                        label: 'Age Distribution',
                        backgroundColor: [
                            '#3390FF',
                            '#33E0FF',
                            '#9FE2F8',
                            '#3390FF',
                            '#33E0FF',
                            '#9FE2F8',
                            '#33E0FF',


                        ],
                        hoverBackgroundColor: [
                            '#A0C2F9',
                            '#91C9F5',
                            '#B5F8EE',
                            '#A0C2F9',
                            '#91C9F5',
                            '#B5F8EE',
                            '#91C9F5',


                        ],
                        data: ageGroup
                    }
                ]
            }

            console.log(insightsGender);
            actions.setInstagramAge(insightsGender);
            const insightsCities = {
                labels: cityNames,
                datasets: [
                    {
                        label: 'City Distribution',
                        data: cities,
                        backgroundColor: 'rgb(138, 177, 226 )',
                        hoverBackgroundColor: 'rgb(255, 99, 132)'

                    }
                ]
            }

            console.log(insightsCities);
            actions.setInstagramCities(insightsCities);
            const insightsCountries = {
                labels: countryNames,
                datasets: [
                    {
                        label: 'Country Distribution',
                        data: countries,
                        backgroundColor: 'rgb(138, 177, 226 )',
                        hoverBackgroundColor: 'rgb(255, 99, 132)',
                    }
                ]
            }

            console.log(insightsCountries);
            actions.setInstagramCountries(insightsCountries);
            const insightsImp = {
                labels: 'Response',
                datasets: [
                    {
                        label: 'Impressions',
                        data: impressions,
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgb(138, 177, 226 )',
                        hoverBackgroundColor: 'rgb(255, 99, 132)',
                    },
                    {
                        label: 'Followers',
                        data: followers,
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgb(12, 17, 230 )',
                        hoverBackgroundColor: 'rgb(255, 99, 132)',
                    },
                    {
                        label: 'Reach',
                        data: reach,
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgb(17, 15, 240 )',
                        hoverBackgroundColor: 'rgb(255, 99, 132)',
                    },
                ]
            }
            actions.setInstagramResponse(insightsImp);

       
    }),

    fbInsights: thunk(async (actions, payload) => {
        const insights = []
        const res = await axios.post(`${config.apiUrl}/channels/insights/facebook/`, payload)
        console.log(res.data)
        if (res.status != "200") {
            toastr.error("Something went wrong")
        }
        for (let insight of res.data.data) {
            insights.push({
                animationEnabled: true,
                theme: "light2",
                axisX: {
                    title: "Time Period",
                },
                axisY: {
                    title: insight.title,
                },
                data: [{
                    type: "column",
                    dataPoints: insight.values.map((data => {
                        return { y: data.value, label: data.end_time.substring(0, 10) }
                    }))
                }]
            });
        }
        actions.setFacebook(insights);
    }),
    youtubeInsights: thunk(async (actions, payload) => {
        const viewinsights = [], estTime = [], subscribersGained = [];
        const res = await axios.post(`${config.apiUrl}/channels/insights/youtube`, payload)
        console.log(res.data.columnHeaders)
        if (res.status != "200") {
            toastr.error("something went wrong")
        }
        const viewdataPoints = [], estTimedataPoints = [], subsdataPoints = [];
        for (let insight of res.data.rows) {
            viewdataPoints.push({ date: insight[0], views: insight[1] });
            subsdataPoints.push({ date: insight[0], subs: insight[3] });
            estTimedataPoints.push({ date: insight[0], est: insight[2] });


        }

        viewinsights.push({
            animationEnabled: true,
            theme: "light2",
            axisX: {
                title: "Time Period",
            },
            axisY: {
                title: "Views",
            },
            data: [{
                type: "column",
                dataPoints: viewdataPoints.map((data, index) => {
                    console.log(data)
                    return { y: index, label: data.date, x: data.views }
                })
            }]
        });
        estTime.push({
            animationEnabled: true,
            theme: "light2",
            axisX: {
                title: "Time Period",
            },
            axisY: {
                title: "Estimated Minutes Watched",
            },
            data: [{
                type: "column",
                dataPoints: estTimedataPoints.map((data, index) => {
                    console.log(data)
                    return { y: index, label: data.date, x: data.est }
                })
            }]
        });
        subscribersGained.push({
            animationEnabled: true,
            theme: "light2",
            axisX: {
                title: "Time Period",
            },
            axisY: {
                title: "Subscribers Gained",
            },
            data: [{
                type: "column",
                dataPoints: subsdataPoints.map((data, index) => {
                    console.log(data)
                    return { y: index, label: data.date, x: data.subs }
                })
            }]
        });

        actions.setYoutubeViews(viewinsights);
        actions.setYoutubeEstTime(estTime);
        actions.setYoutubeSubscribers(subscribersGained);

    })

};