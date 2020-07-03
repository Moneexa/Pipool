import React, { Component, useState, useEffect } from 'react'
import config from '../auth.config.json'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useStoreActions, useStoreState } from 'easy-peasy'
export default function TwitterWrapper() {
  const twitter = useStoreActions(actions => actions.user.loginTwitter)
  const oauth_access = useStoreState(state => state.user.twitter_oauth_token);
  const oauth_access_token = useStoreState(state => state.user.twitter_oauth_access_secret)
  const [obj, setObj] = useState({});
  const [token, setToken] = useState("");
  const [tokenSecret, setTokenSecret] = useState("")
  const [success, setSuccess] = useState(false)
  function listenMessage(msg) {
    console.log(msg);
}


  function handleClick() {
    const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
    const oauthWindow = window.open(encodeURI(`https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_access}`));
    localStorage.setItem("mytime", Date.now());

    var timer = setInterval(function () {
        if (oauthWindow.closed) {
            clearInterval(timer);
            if (window.addEventListener) {
              window.addEventListener("message", listenMessage, false);
          } else {
              window.attachEvent("onmessage", listenMessage);
          }
           // console.log(localStorage);
           // const redirectUrl = new URL(localStorage.getItem('oAuthRedirectUrl',window.location.href));
            //const searchParams = redirectUrl.searchParams;
            
        }
    }, 1000);

  }
  useEffect(()=>{
    const ob = {}
    setObj(ob);
    twitter(obj);
    setSuccess(true)

   setToken(oauth_access)
   setTokenSecret(oauth_access_token)

  }, [])
  return (
    <div>
<button onClick={handleClick} type="button" >
  <FontAwesomeIcon icon={faTwitter} />
</button>
     
    </div>

  )

}