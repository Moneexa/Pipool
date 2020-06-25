import React, { useState } from 'react'
import { useStyles } from 'react-styles-hook'
import { Tab, Nav } from 'react-bootstrap';
import { Form1 } from './Form1';
import './NewCampaign.css'
import { Form2 } from './Form2';
import { Form3 } from './Form3';
import { useStoreActions, useStoreState } from 'easy-peasy';


function NewCampaign() {

    const formSteps = ["one", "two", "three"]
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    let [formData, setFormData] = useState({});
    const active = useStoreState(state => state.campaign.actv);
    const post = useStoreActions(actions => actions.campaign.postCampaign);
    const obj = useStoreActions(actions => actions.campaign.getCampaign);

    function saveForm(values) {
        setFormData(Object.assign({}, formData, values))
        setCurrentStepIndex((currentStepIndex + 1) % formSteps.length);
    }

    function stepBack() {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
        }
    }

    function onFinish(values) {
        setFormData(Object.assign({}, formData, values))
        post(formData);
        console.log(formData)
    }

    return (
        <div className="new-campaign px-lg-2 px-xl-5 bottom-spacer">
            <div className="text-center">
                <h1 style={{ color: "#3a3b45!important" }} className="h4 text-gray-900 mb-4">CREATE A CAMPAIGN</h1>
                <p>Describe your product or service to the influencers.</p>
            </div>
            <div className="user">
                <Tab.Container activeKey={formSteps[currentStepIndex]} defaultActiveKey={formSteps[currentStepIndex]}>
                    <Tab.Content>
                        <Tab.Pane eventKey={formSteps[0]} className="mb-5">
                            <Form1 onNext={saveForm} onPrevious={stepBack} />
                        </Tab.Pane>
                        <Tab.Pane eventKey={formSteps[1]}>
                            <Form2 onNext={saveForm} onPrevious={stepBack} />
                        </Tab.Pane>
                        <Tab.Pane eventKey={formSteps[2]}>
                            <Form3 onFinish={onFinish} onPrevious={stepBack} />
                        </Tab.Pane>
                    </Tab.Content> 
                </Tab.Container>
            </div>
        </div>

    )
}
export default NewCampaign;