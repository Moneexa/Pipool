import React, { Component, useState, useEffect } from 'react'
import config from '../auth.config.json'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useStoreActions, useStoreState } from 'easy-peasy'


export default function TwitterWrapper() {
  const authenticateTwitter = useStoreActions(actions => actions.channels.authenticateTwitter)

  function handleClick() {
    authenticateTwitter();
  }
  return (
    <div>
      <button onClick={handleClick} type="button" >
        <FontAwesomeIcon icon={faTwitter} />
      </button>

    </div>

  )

}