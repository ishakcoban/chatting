import React from 'react'

export const BackgroundTemplate = (props) => {
  return (
    <div className='bg-wrapper d-flex flex-column justify-content-center align-items-center'>{props.children}</div>
  )
}
