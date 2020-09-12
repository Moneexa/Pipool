import React from 'react'
import styles from '../CampaignApply/CampaignApply.module.css';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function CampaignChat({ match }) {
    const campaignId = match.params.id
    const [messages, setMessages] = useState([])
    const [indMessage, setIndMessages] = useState({})
    const [text, setText] = useState("")
    const [namesArray, setNamesArray] = useState([{ name: "Name1", 
    lastConv:"fucking conv",
    date: "date" }, { name: "Name2",
    lastConv:"fucking conv",
    date: "date" }, { name: "Name3", lastConv:"fucking conv",
    date: "date" }])
    var campaignOwnerName = useStoreState(state => state.campaign.campaignOwnerName)
    const getCampaignOwnerName = useStoreActions(actions => actions.campaign.getCampaignOwnerName);
    const chatArray =  useStoreState(state=>state.chat.chatArray);
    const postChat = useStoreActions(actions=>actions.chat.postChat)
    useEffect(() => {
        getCampaignOwnerName(campaignId)
        setMessages(chatArray);

    }, [getCampaignOwnerName, campaignOwnerName, campaignId])
    function messagesOnChange(event) {

        if (event.key === "Enter") {
            console.log(typeof messages)
            let arr = messages.concat(indMessage)
            setMessages(arr)
            setText("")
            postChat(arr)
            for (let val of namesArray) {
                if (val.name !== campaignOwnerName) {

                    let namesArray1 = namesArray.concat({ name: campaignOwnerName, date: "date" , lastConv:text })
                    setNamesArray(namesArray1)
                }
                else {
                  const conv = text;
                  const obj = {name: campaignOwnerName, date:"date", lastConv:conv}

                  namesArray[namesArray.length-1]=obj
                  setNamesArray(namesArray);
                  }
            }
            console.log(messages);
        }
    }
    function onChangeText(event) {
        setText(event.target.value);
        setIndMessages({ message: text, date: "date" })

    }
    return (<>
        <div className={`mb-5 ${styles.card}`}>
            <div className="d-xs-none d-sm-flex">
                <div className="col-md-4 col-sm-4">
                    <input autocomplete="off" className="m-3 pl-3 pr-2 inputBar" placeholder="Search Chat" spellcheck="false" type="text" aria-label="Search Messenger" value="" />
                    <hr className="lineBreak" style={{ border: "0.2px solid #E9ECEC", width: "100%" }} />
                    {
                        namesArray.map((value, index) => {
                            return (<div className="d-flex flex-direction-column flex-wrap-wrap" key={index} onClick={
                               ()=>{
                                   
                                campaignOwnerName=value.name
                                document.getElementById("campaignOwner").innerHTML=campaignOwnerName
                                

                               }
                            }> 
                                <div className="col-md-3 col-sm-3"></div>
                                <div className="col-md-9 col-sm-9">
                                    <h5>{value.name} </h5>
                                    <div className="float-right d-flex align-items-center">{value.date}</div>
                                    <p>{value.lastConv}</p>
                                </div> <br />
                                <hr className="lineBreak" style={{ border: "0.2px solid #E9ECEC", width: "100%" }} />
                            </div>)
                        })
                    }
                </div>
                <div className="lineBreak mr-3" style={{ border: "0.2px solid #E9ECEC", height: "80vh" }}></div>
                <div className="col-md-8 m-3 col-sm-8 position-relative">
                    <h4 className={`mt-2 mx-4 mb-4 ${styles.title} position-relative`} id="campaignOwner">
                        {campaignOwnerName}
                    </h4>
                    <hr className="lineBreak" style={{ border: "0.2px solid #E9ECEC", width: "50vw" }} />
                    <hr className="lineBreak" style={{
                        border: "0.2px solid #E9ECEC", width: "50vw",

                        position: "absolute",
                        bottom: "80px",


                    }} />
                    {
                        !indMessage ? '' :
                            messages.map(value => {
                                return (<div className="row">
                                    <div className="col-md-6 col-sm-6"></div>
                                    <div className="col-md-6 col-sm-6">
                                        <div dataTooltipContent="6:36 PM" dataHover="tooltip" className="my-2 ml-n2"
                                            dataTooltipPosition="right"
                                            style={{
                                                backgroundAttachment: "fixed", borderRadius: "21px",

                                                width: "25vw",
                                                backgroundColor: "rgb(0, 132, 255)"
                                            }}>

                                            <div tabindex="0" className="p-3">
                                                <span style={{ color: "white", textAlign:"center" }}>{value.message}</span>
                                            </div>
                                        </div></div></div>)



                            })


                    }
                    <div className="row" >

                        <textarea className="messageClass" placeholder="Type your message" style={{
                            margin: "5px 10px",
                            width: "50vw",
                            minWidth: "0",
                            padding: "9px 12px 11px",
                            backgroundColor: "var(--compose-input-background)",
                            border: "1px solid rgba(0,0,0,.04)",
                            borderRadius: "21px",
                            flex: "1 1 auto",
                            position: "absolute",
                            bottom: "0"

                        }} value={text} onChange={onChangeText} onKeyDown={messagesOnChange} />


                    </div>
                </div>
            </div>
        </div>
    </>)
}