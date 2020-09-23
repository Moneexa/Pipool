import { useStoreState, useStoreActions } from 'easy-peasy';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './Chat.module.css';

export function Chat() {
    const [message, setMessage] = useState('');
    const room = useStoreState(state => state.chats.activeRoom);
    const role = useStoreState(state => state.chats.role);
    const rooms = useStoreState(state => state.chats.rooms);
    const messages = useStoreState(state => state.chats.messages);
    const send = useStoreActions(actions => actions.chats.send);
    const changeActiveRoom = useStoreActions(actions => actions.chats.changeActiveRoom);
    const setActiveRoom = useStoreActions(actions => actions.chats.setActiveRoom);
    const [lastMessage, setLastMessage] = useState(null);
    useEffect(() => {
        if (room.id)
            changeActiveRoom(room)
    }, [room])

    useEffect(() => {
        if (lastMessage) {
            lastMessage.scrollIntoView({ behavior: "smooth" });
        }
    })

    function sendMessage(event) {
        event.preventDefault();
        if (message) {
            send({ id: room.id, message });
            setMessage('');
        }
    }

    function getTitle(value) {
        if (role === 'brand') {
            return value.channel.channelName;
        }
        else if (role === 'influencer') {
            return value.brand.name;
        }
    }

    function getContactName(value) {
        if (value.fromBrand) {
            return room.brand.name;
        }
        else {
            return room.channel.channelName;
        }
    }

    return <>
        <div className="h-100 w-100 position-absolute d-flex">
            <div className={`m-2 flex-grow-1 d-flex shadow-sm ${styles.container}`}>
                <div className={`d-flex flex-column ${styles.sidebar}`}>
                    <div className={`${styles.header} d-flex justify-content-center align-items-center`}>
                        Messages
                    </div>
                    <div className={`flex-grow-1 ${styles.rooms}`}>
                        {
                            rooms.map((value, index) => {
                                return <div onClick={() => setActiveRoom(value)} key={index} className={`${styles.room} ${room.id === value.id ? styles.active : ''}`}>
                                    <div className={`${styles.title}`}>
                                        {getTitle(value)}
                                    </div>
                                    <div className={`${styles.subTitle}`}>{value.title}</div>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className={`flex-grow-1 d-flex flex-column ${styles.messagesContainer}`}>
                    <div className={`${styles.header} d-flex align-items-center pl-4`}>
                        {room.title}
                    </div>
                    <div className={`flex-grow-1 ${styles.messages}`}>
                        {
                            messages.map((message, index) => (
                                <div key={index} className={`d-flex flex-column ${styles.message}`} ref={(el) => { setLastMessage(el); }}>
                                    {/* <div className={`${styles.imageContainer}`}>
                                        <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="" />
                                    </div> */}
                                    <div className={`${styles.nameAndText}`}>
                                        <div className={`font-weight-bold`}>{getContactName(message)}</div>
                                        <div className={`${styles.text}`}
                                            dangerouslySetInnerHTML={{
                                                __html: message.value
                                            }}>
                                        </div>
                                    </div>
                                    {index != (messages.length-1) ? <div className={`${styles.borderBottom}`}></div> : ''}
                                </div>
                            ))
                        }

                    </div>
                    <form className={`d-flex p-4 ${styles.messageInputContainer}`} onSubmit={(event) => sendMessage(event)}>
                        <input value={message} onChange={(event => setMessage(event.target.value))} className={`rounded-0 flex-grow-1 mr-2`} type="text" />
                        <button className="btn btn-success px-4">Send</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}