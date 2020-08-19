import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';


const { action, thunk } = require("easy-peasy");
export const InsightsModel = {
    instagram: {}, instagramAge: {}, instagramCities: {}, instagramCountries: {},
    instagramResponse: {},
    facebook: {}, fbAge: {}, fbCities: {}, fbCountries: {},
    fbResponse: {}, youtubeAge: {}, youtubeGender: {},
    lastFetched: "",
    youtubeViews: {}, youtubeComments: {}, youtubeLikes: {},
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
    setFbAge: action((state, payload) => {
        state.fbAge = payload;
    }),
    setFbCities: action((state, payload) => {
        state.fbCities = payload;
    }),
    setFbCountries: action((state, payload) => {
        state.fbCountries = payload;
    }),
    setFbResponse: action((state, payload) => {
        state.fbResponse = payload;
    }),

    setYoutubeGender: action((state, payload) => {
        state.youtubeGender = payload;
    }),
    setYoutubeAge: action((state, payload) => {
        state.youtubeAge = payload;
    }),

    setYoutubeLikes: action((state, payload) => {
        state.youtubeLikes = payload;
    }),
    setYoutubeComments: action((state, payload) => {
        state.youtubeComments = payload;
    }),
    setYoutubeViews: action((state, payload) => {
        state.youtubeViews = payload;
    }),
    instaInsights: thunk(async (actions, payload) => {
        try {
            if (payload.hasOwnProperty("token")) {
                var res = await axios.post(`${config.apiUrl}/channels/insights/instagram/`, payload)
            }
            else {
                var res = await axios.get(`${config.apiUrl}/channels/insights/${payload.channelId}/instagram`)

            }
            var gender = res.data.gender

            gender = gender.map(value => { return (value.genderCount) })
            console.log("this is new array" + " " + gender)
            var ageGroup = res.data.ageGroup
            ageGroup = ageGroup.map(value => { return (value.ageGroupCount) })
            var cities = [], cityNames = []
            cities = res.data.cities.map(value => { return (value.noOfAudience) })
            cityNames = res.data.cities.map(value => { return (value.cityName) })
            var countries = [], countryNames = []
            countries = res.data.countries.map(value => { return (value.noOfAudience) })
            countryNames = res.data.countries.map(value => { return (value.countryName) })
            var impressions = res.data.impressions,
                reach = res.data.reach,
                dates = []
            dates = res.data.impressions.map(value => {

                return (value.date)



            })
            console.log(countries)
            impressions = impressions.map(value => {
                return (value.count)

            })
            reach = reach.map(value => {
                return (value.count)

            })

            console.log(impressions)
            console.log(reach)
            actions.setLastFetched(res.data.lastFetched);

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
                labels: dates,
                datasets: [
                    {
                        label: 'Impressions',
                        data: impressions,
                        fill: true,
                        lineTension: 0.5,
                        backgroundColor: 'rgb(138, 177, 226 )',
                        hoverBackgroundColor: 'rgb(255, 99, 132)',
                    },

                    {
                        label: 'Reach',
                        data: reach,
                        fill: true,
                        lineTension: 0.5,
                        backgroundColor: 'rgb(17, 15, 240 )',
                        hoverBackgroundColor: 'rgb(255, 99, 132)',
                    },
                ]
            }
            actions.setInstagramResponse(insightsImp);
        }
        catch (error) {
            if (error.message.slice(32, 35) === "404") {
                toastr.error("try to fetch insights")
            }
            else if (error.message.slice(32, 35) === "500") {
                toastr.error("there went something wrong while fetching insights, try again")
            }
        }

    }),

    fbInsights: thunk(async (actions, payload) => {
        try {
            if (payload.hasOwnProperty("token")) {
                var res = await axios.post(`${config.apiUrl}/channels/insights/facebook/`, payload)
            }
            else {
                var res = await axios.get(`${config.apiUrl}/channels/insights/${payload.channelId}/facebook`)

            }
            var gender = res.data.gender

            gender = gender.map(value => { return (value.genderCount) })
            console.log("this is new array" + " " + gender)
            var ageGroup = res.data.ageGroup
            ageGroup = ageGroup.map(value => { return (value.ageGroupCount) })
            var cities = [], cityNames = []
            cities = res.data.cities.map(value => { return (value.noOfAudience) })
            cityNames = res.data.cities.map(value => { return (value.cityName) })
            var countries = [], countryNames = []
            countries = res.data.countries.map(value => { return (value.noOfAudience) })
            countryNames = res.data.countries.map(value => { return (value.countryName) })
            var impressions = res.data.impressions,
                reach = res.data.reach, dates = []
            dates = res.data.impressions.map(value => {

                return (value.date)



            })
            console.log(countries)
            reach = reach.map(value => {
                return (value.count)

            })
            impressions = impressions.map(value => {
                return (value.count)

            })

            console.log(impressions)
            console.log(reach)
            actions.setLastFetched(res.data.lastFetched);

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
            actions.setFacebook(insights);

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
            actions.setFbAge(insightsGender);
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
            actions.setFbCities(insightsCities);
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
            actions.setFbCountries(insightsCountries);
            const insightsImp = {
                labels: dates,
                datasets: [
                    {
                        label: 'Impressions',
                        data: impressions,
                        fill: true,
                        lineTension: 0.5,
                        backgroundColor: 'rgb(138, 177, 226 )',
                        hoverBackgroundColor: 'rgb(255, 99, 132)',
                    },
                    {
                        label: 'Reach',
                        data: reach,
                        fill: true,
                        //                   lineTension: 0.5,
                        backgroundColor: 'rgb(12, 17, 230 )',
                        hoverBackgroundColor: 'rgb(255, 99, 132)',
                    },

                ]
            }
            actions.setFbResponse(insightsImp);
        }
        catch (error) {
            if (error.message.slice(32, 35) === "404") {
                toastr.error("try to fetch insights")
            }
            else if (error.message.slice(32, 35) === "500") {
                toastr.error("there went something wrong while fetching insights, try again")
            }
        }

    }),
    youtubeInsights: thunk(async (actions, payload) => {
        try {
            if (payload.hasOwnProperty("token")) {
                var res = await axios.post(`${config.apiUrl}/channels/insights/youtube/`, payload)
            }
            else {
                var res = await axios.get(`${config.apiUrl}/channels/insights/${payload.channelId}/youtube`)

            }
            console.log(res)

            var gender = res.data.gender

            gender = gender.map(value => { return (value.genderCount) })
            console.log("this is new array" + " " + gender)
            var ageGroup = res.data.ageGroup, _ageGroup = [], _labels = []
            _ageGroup = ageGroup.map(value => { return (value.ageGroupCount) })
            _labels = ageGroup.map(value => { return (value.ageGroup) })
            var countries = [], countryNames = []
            countries = res.data.countries.map(value => { return (value.noOfAudience) })
            countryNames = res.data.countries.map(value => { return (value.countryName) })
            var likes = res.data.likes,
                comments = res.data.comments, views = res.data.views,
                dates = []
            dates = res.data.likes.map(value => {

                return (value.date)



            })
            console.log(countries)
            likes = likes.map(value => {
                return (value.count)

            })
            comments = comments.map(value => {
                return (value.count)

            })
            views = views.map(value => {
                return (value.count)

            })

            actions.setLastFetched(res.data.lastFetched);

            const insights = {
                labels: ['Female', 'Male', 'Unidentified'],
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
            actions.setYoutubeGender(insights);

            const insightsGender = {
                labels: _labels,
                datasets: [
                    {
                        label: 'Age Distribution',
                        backgroundColor: [
                            '#3390FF',
                            '#33E0FF',



                        ],
                        hoverBackgroundColor: [
                            '#A0C2F9',
                            '#91C9F5',


                        ],
                        data: _ageGroup
                    }
                ]
            }

            console.log(insightsGender);
            actions.setYoutubeAge(insightsGender);

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
            actions.setFbCountries(insightsCountries);
            const insightsImp = {
                labels: dates,
                datasets: [
                    {
                        label: 'Likes',
                        data: likes,
                        fill: true,
                        lineTension: 0.5,
                        backgroundColor: 'rgb(138, 177, 226 )',
                        hoverBackgroundColor: 'rgb(255, 99, 132)',
                    },
                    {
                        label: 'Comments',
                        data: comments,
                        fill: true,
                        //                   lineTension: 0.5,
                        backgroundColor: 'rgb(14, 17, 255 )',
                        hoverBackgroundColor: 'rgb(255, 99, 132)',
                    },
                    {
                        label: 'Views',
                        data: views,
                        fill: true,
                        //                   lineTension: 0.5,
                        backgroundColor: 'rgb(135, 111, 255 )',
                        hoverBackgroundColor: 'rgb(255, 99, 132)',
                    },

                ]
            }
            actions.setFbResponse(insightsImp);
        } catch (error) {
            if (error.message.slice(32, 35) === "404") {
                toastr.error("try to fetch insights")
            }
            else if (error.message.slice(32, 35) === "500") {
                toastr.error("there went something wrong while fetching insights, try again")
            }

        }


    })

};