import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect, useRef, useState } from 'react';
import { Button, ListGroup, Modal } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import config from '../../../config.json';
import styles from './CampaignApply.module.css';
import { Redirect } from 'react-router-dom';

export default function CampaignInfo({ match, history }) {
    const proposalSubmitted = useStoreState(state => state.influencersProposals.proposalSubmitted);
    const campaignId = match.params.id;
    const actv = useStoreState(state => state.campaign.actv)
    const getCampaign = useStoreActions(actions => actions.campaign.getCampaign)
    const checkIfAlreadySubmitted = useStoreActions(actions => actions.influencersProposals.checkIfAlreadySubmitted)
    const postProposals = useStoreActions(actions => actions.influencersProposals.postProposals);
    const [proposalDoc, setProposalDoc] = useState('');
    const [pop, setPop] = useState(false)
    const [deadline, setDeadline] = useState(null)
    const videosList = useStoreState(state => state.videos.videosList)
    const listVideos = useStoreActions(actions => actions.videos.listVideos)
    const postVideo = useStoreActions(actions => actions.videos.postVideo)
    let [cursorIndex, setCursorIndex] = useState(0);
    let fileInput = null;
    const [editorConfig, _] = useState({
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
                    openVideoUploadDialog()
                }
            }
        },
    })
    let reactQuillRef = useRef(null);


    useEffect(() => {
        console.log(campaignId)
        getCampaign(campaignId)
        checkIfAlreadySubmitted({campaignId});
        // if(proposalSubmitted)
        //     history.goBack()

    }, [campaignId, getCampaign, checkIfAlreadySubmitted])
    if (proposalSubmitted) {
        return (<Redirect to='../' />)
    }
    function submit(values) {
        console.log(proposalDoc)
        postProposals({ campaignId: campaignId, proposal: proposalDoc, dateOfSubmission: deadline })

    }
    function handleClose() {
        setPop(false)
    }

    function embedVideo(value) {
        setPop(false);
        reactQuillRef.current.editor.insertEmbed(cursorIndex || 0, 'video', value)
    }

    function openVideoUploadDialog() {
        const selection = reactQuillRef.current.getEditorSelection();
        if (selection) setCursorIndex(selection.index);
        setPop(true)
        listVideos();
    }
    function onUploadButtonClick() {
        console.log(fileInput.click());
    }
    function onFileChangeHandler(event) {
        console.log(event.target.files[0])
        const data = new FormData()
        data.append('file', event.target.files[0]);
        postVideo(data)
    }

    return (<>
        <Modal show={pop}
            size="lg"
            centered
            databackdrop="false"
            onHide={() => handleClose()}
            dialogClassName={styles.dialog}
            style={{
                position: "absolute",
            }}
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className={styles.dialogBody}>
                <input onChange={onFileChangeHandler} type="file" style={{ display: 'none' }} ref={ref => fileInput = ref} />
                {
                    <ListGroup>
                        {videosList.map((value, index) =>
                            // <video src={`${config.apiUrl}/videos/${value.fileName}`} controls></video>
                            <ListGroup.Item onClick={() => embedVideo(`${config.apiUrl}/videos/${value.fileName}`)} key={index}>{value.name}</ListGroup.Item>

                        )}
                    </ListGroup>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>
                    Close
                    </Button>
                <Button variant="primary" className="text-white px-5" onClick={() => onUploadButtonClick()}>
                    Upload Video
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
                <div className={`mb-5 ${styles.card}`}>
                    <div className="d-xs-none d-sm-flex">
                        <div className={`flex-grow-1 ${styles.description}`}>
                            <div className="d-flex flex-column">
                                <div className={styles.heading}>
                                    <h4 className="m-4">Terms</h4>
                                </div>
                                <div className="p-4">
                                    <div className={`form-group ${styles.deadline}`}>
                                        <input onChange={(ev) => setDeadline(ev.target.value)} placeholder="Date of complition" className="form-control rounded-0" type="date" />
                                    </div>
                                    <div style={{}}>
                                        <ReactQuill theme="snow" className="mb-4" style={{ height: '500px' }}
                                            value={proposalDoc}
                                            onChange={(e) => { setProposalDoc(e) }}
                                            name="proposal"
                                            ref={reactQuillRef}
                                            // ref={register({required:true})}
                                            modules={editorConfig}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button disabled={!deadline || !proposalDoc} onClick={submit} type="submit" className="btn btn-primary px-5 text-white m-2">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div></>)
}