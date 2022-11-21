import React from 'react'

export const AuthenticationCard = (props) => {
  return (
    <div className={props.authInfo}>{props.children}</div>
  )
}
