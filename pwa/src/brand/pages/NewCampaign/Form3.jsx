import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'react-bootstrap'
import { useStoreActions, useStoreState } from 'easy-peasy';
import RangeSlider from 'react-bootstrap-range-slider';

export function Form3({ onFinish, onPrevious }) {
    const { register, handleSubmit, watch, errors } = useForm();
    const [interests, setInterests] = useState(interestVals);
    const loading = useStoreState(state => state.campaign.loading)
    const [value, setValue] = useState(0);

    function toggleInterest(index) {
        const list = JSON.parse(JSON.stringify(interests));
        list[index].value = !list[index].value;
        setInterests(list);
    }

    function submit(values) {
        const selectedInterests = interests
            .filter((interest) => interest.value)
            .map(interest => interest.name.toLowerCase())
        onFinish(Object.assign({}, values, { interests: selectedInterests }))
    }

    return (<>
        <div className="col-md-12 p-0">
            {
                !loading ? '' :
                    <div className="loading-overlay d-flex align-items-center justify-content-center">

                        <Spinner animation="border" variant="success" />
                    </div>
            }
        </div>
        <form onSubmit={handleSubmit(submit)}>
            <div className="form-group row" >
                <div className="form-group col-12">
                    <p style={{ fontSize: "22px", textAlign: "center" }}> Here you can set the criteria that will define the selection of influencers to whom your campaign will be visible to. Interested influencers will then send you post proposals for approval. </p>
                </div>
            </div>
            <div className="form-group row" >
                <div className="form-group col-sm-6 mb-3 mb-sm-0">
                    <label>Gender</label>
                    <select ref={register()} className="browser-default custom-select" id="gender" name="gender">
                        <option value="Any">Any</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="form-group col-sm-6 mb-3 mb-sm-0">
                    <label>Location</label>
                    <select ref={register} className="browser-default custom-select" name="location">
                        <option value="Region">Region</option>
                        <option value="Northern America">Northern America</option>
                        <option value="Western Europe">Western Europe</option>
                        <option value="Eastern Europe">Eastern Europe</option>
                        <option value="Australia and New Zealand">Australia and New Zealand</option>
                        <option value="Asia">Asia</option>
                    </select>


                </div>
            </div>

            <div className="form-group row" >
                <div className="form-group col-sm-6 mb-3 mb-sm-0">
                    <label>Age</label><br />
                    <input ref={register({ required: true })} type="range" min="1" max="100" className="slider w-100" name="age" />
                </div>
                <div className="form-group col-sm-6 mb-3 mb-sm-0">
                    <label>Posting languages</label>
                    <select ref={register} className="browser-default custom-select" name="postingLanguages">
                        <option value="English">English</option>
                        <option value="French">French</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Italian">Italian</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Portuguese">Portuguese</option>
                        <option value="Russian">Russian</option>
                        <option value="German">German</option>
                    </select>


                </div>
            </div>
            <div className="form-group row" >
                <div className="form-group col-sm-6 col-12">
                    <label>Minimum number of followers </label><br />
                    <RangeSlider
                        ref={register({required:true})}
                        value={value}
                        onChange={changeEvent => setValue(changeEvent.target.value)}
                        
                    />
                    <input ref={register({ required: true })} name="minFollowers" type="range" min="1" max="100" className="slider w-100" id="minFollowers" data-slider-tooltip="show" />
                </div>
            </div>

            <div className="form-group row" >
                <hr style={{ border: "1px solid #f0f0f0 !important", width: "100%" }} />
            </div>

            <div className="form-group row" >
                <div className="form-group col-sm-12 mb-3 mb-sm-0">
                    Include influencers with interests in :
                                    </div>
            </div>
            <div className="form-group row" >
                <div id="img_row" className="form-group col-sm-12 mb-3 mb-sm-0">
                    <div className="clearfix">
                        <button className="select select-button">SELECT ALL</button>

                        <button className="check-mark send" data-counter="0">✔</button>
                    </div>
                    <div className="interests_wrapper row">
                        {interests.map((interest, index) => {
                            return (
                                <div
                                    key={index}
                                    className="col-xs-6 col-md-3 col-lg-2"
                                    onClick={() => toggleInterest(index)}
                                >
                                    <div className="interest_card"
                                        style={{ backgroundImage: `url(${interest.url})`, backgroundSize: 'cover' }}>
                                        <div className={`interest_name  ${interest.value ? 'selected' : ''}`}>
                                            {interest.name}
                                            {
                                                interest.value ?
                                                    <div className="check-mark">
                                                        <FontAwesomeIcon className="mr-2 text-success" style={{ color: 'yellowgreen' }} icon={faCheckCircle} />
                                                    </div> : ''
                                            }

                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="mt-5 d-flex justify-content-center align-items-center w-100">
                <button
                    onClick={() => onPrevious()}
                    type="button"
                    className="btn btn-secondary btn-user text-white next-button">
                    Previous
                </button>
                <button
                    type="submit"
                    className="btn btn-success btn-user text-white next-button">
                    Finish
                </button>

            </div>
        </form>
    </>
    )
}




const interestVals = [
    {
        "url": "https://www.ifluenz.com/img/interests/animals.jpeg",
        "value": false,
        "name": "ANIMALS"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/art.jpeg",
        "value": false,
        "name": "ART"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/beauty.jpeg",
        "value": false,
        "name": "BEAUTY"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/books.jpeg",
        "value": false,
        "name": "BOOKS"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/business.jpeg",
        "value": false,
        "name": "BUSINESS"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/causes.jpeg",
        "value": false,
        "name": "CAUSES"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/comedy.jpeg",
        "value": false,
        "name": "COMEDY"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/dance.jpeg",
        "value": false,
        "name": "DANCE"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/diy.jpeg",
        "value": false,
        "name": "DIY"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/education.jpeg",
        "value": false,
        "name": "EDUCATION"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/entertainment.jpeg",
        "value": false,
        "name": "ENTERTAINMENT"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/family.jpeg",
        "value": false,
        "name": "FAMILY"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/fashion.jpeg",
        "value": false,
        "name": "FASHION"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/film.jpeg",
        "value": false,
        "name": "FILM"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/fitness.jpeg",
        "value": false,
        "name": "FITNESS"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/food.jpeg",
        "value": false,
        "name": "FOOD"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/gaming.jpeg",
        "value": false,
        "name": "GAMING"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/lifestyle.jpeg",
        "value": false,
        "name": "LIFESTYLE"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/music.jpeg",
        "value": false,
        "name": "MUSIC"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/news.jpeg",
        "value": false,
        "name": "NEWS"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/photography.jpeg",
        "value": false,
        "name": "PHOTOGRAPHY"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/politics.jpeg",
        "value": false,
        "name": "POLITICS"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/science.jpeg",
        "value": false,
        "name": "SCIENCE"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/sport.jpeg",
        "value": false,
        "name": "SPORT"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/tech.jpeg",
        "value": false,
        "name": "TECH"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/travel.jpeg",
        "value": false,
        "name": "TRAVEL"
    },
    {
        "url": "https://www.ifluenz.com/img/interests/tv.jpeg",
        "value": false,
        "name": "TV"
    }
]