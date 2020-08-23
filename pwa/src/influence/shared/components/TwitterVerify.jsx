import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStoreActions } from 'easy-peasy'
import React from 'react'


export default function TwitterVerify(props) {
  const authenticateTwitter = useStoreActions(actions => actions.channels.authenticateTwitter)

  function handleClick() {
    authenticateTwitter({ category: props.category });
  }

  return (
    <div>
      <button className="btn btn-primary rounded-20 text-white" onClick={handleClick} type="button"
        disabled={!props.category}
      >
        <FontAwesomeIcon icon={faTwitter} /> Twitter+
      </button>

    </div>

  )

}