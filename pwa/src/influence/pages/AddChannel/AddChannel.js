import React, { useState } from 'react'
import './AddChannel.css'
import TwitterVerify from '../../shared/components/TwitterVerify'
import { FacebookVerify } from '../../shared/components/FacebookVerify';
import { YoutubeVerify } from '../../shared/components/YoutubeVerify';
import { InstagramVerify } from '../../shared/components/InstagramVerify'
import { TiktokVerify } from '../../shared/components/TiktokVerify'
import { Spinner } from 'react-bootstrap';
import { useStoreState } from 'easy-peasy';
import ReactQuill from 'react-quill';


function AddChannel() {
    const [category, setCategory] = useState("");
    const [basicPrice, setBasicPrice] = useState("");
    const [basicDescription, setBasicDescription] = useState("");
    const [standardPrice, setStandardPrice] = useState("");
    const [standardDescription, setStandardDescription] = useState("");
    const [premiumPrice, setPremiumPrice] = useState("");
    const [premiumDescription, setPremiumDescription] = useState("");
    const loading = useStoreState(state => state.channels.loading)

    const [editorConfig, _] = useState({
        toolbar: {
            container: [
                [{ size: [] }],
                ['bold', 'italic', 'underline'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link']
            ]
        },
    })

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
                            <select className="browser-default custom-select rounded-sm h-auto pad-12" id="category" name="category" value={category} onChange={onCategoryChange}>
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

                            <div className="d-flex package-container mt-3">
                                <div className="package mb-3">
                                    <div className="package-header border border-right-0 border-top-left d-flex align-items-center justify-content-center">
                                        Basic
                                    </div>
                                    <div className="package-body p-3 border border-right-0 border-top-0">
                                        <div className="form-group">
                                            <input onChange={(event) => setBasicPrice(event.target.value)} type="number" className="form-control rounded-sm" placeholder="Price" />
                                        </div>
                                        <div className="desc-container">
                                            <ReactQuill
                                                theme="snow"
                                                className=""
                                                style={{ height: '300px' }}
                                                value={basicDescription}
                                                onChange={(e) => { setBasicDescription(e) }}
                                                name="proposal"
                                                modules={editorConfig}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="package mb-3">
                                    <div className="package-header border border-right-0 d-flex align-items-center justify-content-center">
                                        Standard
                                    </div>
                                    <div className="package-body p-3 border border-right-0 border-top-0">
                                        <div className="form-group">
                                            <input onChange={(event) => setStandardPrice(event.target.value)} type="number" className="form-control rounded-sm" placeholder="Price" />
                                        </div>
                                        <div className="desc-container">
                                            <ReactQuill
                                                theme="snow"
                                                className=""
                                                style={{ height: '300px' }}
                                                value={standardDescription}
                                                onChange={(e) => { setStandardDescription(e) }}
                                                name="proposal"
                                                modules={editorConfig}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="package mb-3">
                                    <div className="package-header border border-top-right d-flex align-items-center justify-content-center">
                                        Premium
                                    </div>
                                    <div className="package-body p-3 border border-top-0">
                                        <div className="form-group">
                                            <input onChange={(event) => setPremiumPrice(event.target.value)} type="number" className="form-control rounded-sm" placeholder="Price" />
                                        </div>
                                        <div className="desc-container">
                                            <ReactQuill
                                                theme="snow"
                                                className=""
                                                style={{ height: '300px' }}
                                                value={premiumDescription}
                                                onChange={(e) => { setPremiumDescription(e) }}
                                                name="proposal"
                                                modules={editorConfig}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-3 my-3">
                                    <InstagramVerify
                                        category={category}
                                        basicPrice={basicPrice}
                                        basicDescription={basicDescription}
                                        standardPrice={standardPrice}
                                        standardDescription={standardDescription}
                                        premiumPrice={premiumPrice}
                                        premiumDescription={premiumDescription} />
                                </div>
                                <div className="col-md-2 my-3">
                                    <YoutubeVerify
                                        category={category}
                                        basicPrice={basicPrice}
                                        basicDescription={basicDescription}
                                        standardPrice={standardPrice}
                                        standardDescription={standardDescription}
                                        premiumPrice={premiumPrice}
                                        premiumDescription={premiumDescription} />
                                </div>
                                <div className="col-md-2 my-3">
                                    <FacebookVerify
                                        category={category}
                                        basicPrice={basicPrice}
                                        basicDescription={basicDescription}
                                        standardPrice={standardPrice}
                                        standardDescription={standardDescription}
                                        premiumPrice={premiumPrice}
                                        premiumDescription={premiumDescription} />
                                </div>
                                {/* <div className="col-md-3 my-3">
                                    <TwitterVerify
                                        category={category}
                                        basicPrice={basicPrice}
                                        basicDescription={basicDescription}
                                        standardPrice={standardPrice}
                                        standardDescription={standardDescription}
                                        premiumPrice={premiumPrice}
                                        premiumDescription={premiumDescription} />
                                </div>
                                <div className="col-md-2 my-3">
                                    <TiktokVerify
                                        category={category}
                                        basicPrice={basicPrice}
                                        basicDescription={basicDescription}
                                        standardPrice={standardPrice}
                                        standardDescription={standardDescription}
                                        premiumPrice={premiumPrice}
                                        premiumDescription={premiumDescription} />
                                </div> */}
                            </div>
                        </div>
                    </div>



                </div>
            </form>
        </div>
    )
}

export default AddChannel