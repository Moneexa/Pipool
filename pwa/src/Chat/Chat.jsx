import { useStoreState, useStoreActions } from 'easy-peasy';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './Chat.module.css';

export function Chat() {
    const [message, setMessage] = useState('');
    const room = useStoreState(state => state.chats.activeRoom);
    const messages = useStoreState(state => state.chats.messages);
    const send = useStoreActions(actions => actions.chats.send);
    const changeActiveRoom = useStoreActions(actions => actions.chats.changeActiveRoom);
    const [lastMessage, setLastMessage] = useState(null);
    useEffect(() => {
        if (room.id)
            changeActiveRoom({ id: room.id })
    }, [room])

    useEffect(() => {
        if (lastMessage) {
            lastMessage.scrollIntoView({ behavior: "smooth" });
        }
    })


    return <>
        <div className="h-100 w-100 position-absolute d-flex">
            <div className={`m-2 flex-grow-1 d-flex shadow-sm ${styles.container}`}>
                <div className={`${styles.sidebar}`}>
                    <div className={`${styles.header} d-flex justify-content-center align-items-center`}>
                        Messages
                    </div>
                </div>
                <div className={`flex-grow-1 d-flex flex-column ${styles.messagesContainer}`}>
                    <div className={`${styles.header} d-flex justify-content-center align-items-center`}>
                        This would be the title
                    </div>
                    <div className={`flex-grow-1 ${styles.messages}`}>
                        {
                            messages.map((message, index) => (
                                <div key={index} className={`d-flex ${styles.message}`} ref={(el) => { setLastMessage(el); }}>
                                    <div className={`${styles.imageContainer}`}>
                                        <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="" />
                                    </div>
                                    <div className={`${styles.nameAndText}`}>
                                        <div className={`font-weight-bold`}>Name</div>
                                        <div className={`${styles.text}`}>{message.value}</div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                    <div className={`d-flex p-4 ${styles.messageInputContainer}`}>
                        <input onChange={(event => setMessage(event.target.value))} className={`rounded-0 flex-grow-1 mr-2`} type="text" />
                        <button onClick={() => send({ id: room.id, message })} className="btn btn-success px-4">Send</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}