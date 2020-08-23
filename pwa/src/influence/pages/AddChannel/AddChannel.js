import React, { useState, useEffect } from 'react'
import './AddChannel.css'
import TwitterVerify from '../../shared/components/TwitterVerify'
import { FacebookVerify } from '../../shared/components/FacebookVerify';
import { YoutubeVerify } from '../../shared/components/YoutubeVerify';
import { InstagramVerify } from '../../shared/components/InstagramVerify'
import { TiktokVerify } from '../../shared/components/TiktokVerify'
import { Spinner } from 'react-bootstrap';
import { useStoreActions, useStoreState } from 'easy-peasy';


function AddChannel() {
    const [platform, setPlatform] = useState("");
    const [category, setCategory] = useState("");
    const loading = useStoreState(state => state.channels.loading)

    function onPlatformChange(e) {
        setPlatform(e.target.value)
    }
    function onCategoryChange(e) {
        setCategory(e.target.value)
    }

    return (

        <div className="add-channel">
            <div className="col-md-12 p-0">
                {
                    !loading ? '' :
                        <div className="loading-overlay d-flex align-items-center justify-content-center">

                            <Spinner animation="border" variant="success" />
                        </div>
                }
            </div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">

                <h2 className="m-0 font-weight-bold text-primary">Add New Channel</h2>



            </div>

            <form className="user">

                <div className="form-group">


                    <div className="form-group m-3 mb-sm-0">
                        <div className="col-md-12">
                            <label>Selelct Channel Category*</label>
                            <select className="browser-default custom-select h-auto pad-12" id="category" name="category" value={category} onChange={onCategoryChange}>
                                <option selected>Select</option>
                                <option value="animal">Animal</option>
                                <option value="art">Art</option>
                                <option value="beauty">Beauty</option>
                                <option value="books">Books</option>
                                <option value="business">Business</option>
                                <option value="causes">Causes</option>
                                <option value="comedy">Comedy</option>
                                <option value="dance">Dance</option>
                                <option value="diy">DIY</option>
                                <option value="education">Education</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="family">Family</option>
                                <option value="fashion">Fashion</option>
                                <option value="film">Film</option>
                                <option value="fitness">Fitness</option>
                                <option value="food">Food</option>
                                <option value="gaming">Gaming</option>
                                <option value="lifestyle">Lifestyle</option>
                                <option value="music">Music</option>
                                <option value="news">News</option>
                                <option value="photograpy">Photograpy</option>
                                <option value="politics">Politics</option>
                                <option value="science">Science</option>
                                <option value="sports">Sports</option>
                                <option value="tech">Tech</option>
                                <option value="travel">Travel</option>
                                <option value="tv">TV</option>

                            </select>

                            <div className="row">
                                <div className="col-md-3 my-3"><InstagramVerify category={category} /> </div>
                                <div className="col-md-2 my-3"><YoutubeVerify category={category}/> </div>
                                <div className="col-md-3 my-3"><TwitterVerify category={category} /> </div>
                                <div className="col-md-2 my-3"><TiktokVerify category={category} /> </div>
                                <div className="col-md-2 my-3"><FacebookVerify category={category}/> </div>

                            </div>



                        </div>
                    </div>



                </div>
            </form>
        </div>
    )
}

export default AddChannel