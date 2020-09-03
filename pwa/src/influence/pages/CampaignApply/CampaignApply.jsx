import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect, useState, useCallback } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from "react-hook-form";
import styles from './CampaignApply.module.css';
import { useRef } from 'react';
import { Modal, Button } from 'react-bootstrap'


// const Video = Quill.import('formats/video');
// const Link = Quill.import('formats/link');
// class CoustomVideo extends Video {
//     static create(value) {
//         const node = super.create(value);

//         const video = document.createElement('video')
//         video.setAttribute('controls', true);
//         video.setAttribute('type', "video/mp4");
//         video.setAttribute('style', "height: 200px; width: 100%");
//         video.setAttribute('src', this.sanitize(value));
//         node.appendChild(video);

//         return node;
//     }

//     static sanitize(url) {
//         return Link.sanitize(url);
//     }
// };
// CoustomVideo.blotName = 'video';
// CoustomVideo.className = 'ql-video';
// CoustomVideo.tagName = 'DIV';

// Quill.register('formats/video', CoustomVideo);

export default function CampaignInfo({ match }) {
    const { register, handleSubmit, errors, watch } = useForm({ mode: "onBlur", reValidateMode: "onBlur" })

    const campaignId = match.params.id;
    const actv = useStoreState(state => state.campaign.actv)
    const getCampaign = useStoreActions(actions => actions.campaign.getCampaign)
    const postProposals = useStoreActions(actions => actions.proposals.postProposals);
    const [proposalDoc, setProposalDoc] = useState('');
    const proposals = useStoreState(state => state.proposals.actv)
    const [pop, setPop] = useState(false)
    const videosList = useStoreState(state => state.videos.videosList)
    const listVideos = useStoreActions(actions => actions.videos.listVideos)
    const [config, _] = useState({
        toolbar: {
            container: [
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image', 'video'],
                ['clean'],
                ['code-block']
            ],
            handlers: {
                video: async () => {
                    uploadVideoClicked()
                }
            }
        },
    })
    let reactQuillRef = useRef(null);


    useEffect(() => {
        console.log(campaignId)
        getCampaign(campaignId)

    }, [campaignId, getCampaign])
    function onNext(values) {
        console.log(proposalDoc)
        postProposals({ campaignId: campaignId, proposal: proposalDoc, cost: "", dateOfSubmission: "" })

    }
    function handleClose() {
       setPop(false)
    }
   
    function uploadVideoClicked() {
        setPop(true)
        listVideos();
        //debugger
        //const selection = reactQuillRef.current.getEditorSelection();
        //console.log(selection)
        //reactQuillRef.current.editor.insertEmbed(selection.index, 'video', "https://www.youtube.com/embed/GRFrVX3ghFo")
        //console.log("Upload video")
    }
    return (<>
        <Modal show={pop}
            databackdrop="false"
            onHide={() => handleClose()}
            className="shadow-lg d-flex align-items-center"
            style={{
                position: "absolute",

            }}

        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                {
                    videosList.map(value =>
                        <div>
                            {value.fileName}

                        </div>
                    )



                }
                <button className="btn btn-primary px-5 text-white m-2" type="button">Upload Video</button>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>
                    Close
                    </Button>
                <Button variant="primary" onClick={() => handleSubmit()}>
                    Save Changes
                    </Button>
            </Modal.Footer>
        </Modal>

        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <h4 className={`mt-2 mx-4 mb-4 ${styles.title}`}>Submit a proposal</h4>
                <div className={`mb-5 ${styles.card}`}>
                    <div className="d-xs-none d-sm-flex">
                        <div className={`flex-grow-1 ${styles.description}`}>
                            <div className="d-flex flex-column">
                                <div className={styles.heading}>
                                    <h4 className="m-4">Campagin Description</h4>
                                </div>
                                <div className="p-4">
                                    <h4 className={`d-inline-block ${styles.bold}`}>{actv.serviceName}</h4>
                                    <div>
                                        {actv.serviceDescription}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <form className={`mb-5 ${styles.card}`} onSubmit={handleSubmit((values) => { onNext(values) })}>
                    <div className="d-xs-none d-sm-flex">
                        <div className={`flex-grow-1 ${styles.description}`}>
                            <div className="d-flex flex-column">
                                <div className={styles.heading}>
                                    <h4 className="m-4">Terms</h4>
                                </div>
                                <div className="p-4">
                                    <ReactQuill theme="snow"
                                        value={proposalDoc}
                                        onChange={(e) => { setProposalDoc(e) }}
                                        name="proposal"
                                        ref={reactQuillRef}
                                        // ref={register({required:true})}
                                        modules={config}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary px-5 text-white m-2">test</button>
                            {/* <form className="row m-3" >

                                <label>Write Proposal</label>
                                <textarea

                                    className="form-control form-control-user first-form p-3 m-3"
                                    rows="30"
                                    ref={register({ required: true })}

                                    name="serviceDescription"
                                    placeholder="Describe your product or service as if your audience is new to it. On the next steps, you'll be able to describe the content you'd like from our influencers. ">
                                </textarea>
                                <button type="submit" className="btn btn-primary btn-user text-white next-button m-3">Submit Proposal</button>

                            </form> */}
                        </div>
                    </div>
                </form>
            </div>
        </div></>)
}