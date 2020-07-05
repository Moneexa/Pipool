import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStoreActions } from 'easy-peasy'
import React from 'react'


export default function TwitterVerify() {
  const authenticateTwitter = useStoreActions(actions => actions.channels.authenticateTwitter)
  const discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';
  const SCOPE = 'https://www.googleapis.com/auth/youtube.channel-memberships.creator';

  function handleClick() {
    authenticateTwitter();
  }

  return (
    <div>
      <button className="btn btn-primary rounded-20 text-white" onClick={handleClick} type="button" >
        <FontAwesomeIcon icon={faTwitter} /> Add Twitter Account
      </button>

    </div>

  )

}