import React from 'react'

export const MessageRight = (props) => {

  //console.log(typeof props.date)
  /* function formatAMPM(date) {
     var hours = date.getHours();
     var minutes = date.getMinutes();
     var ampm = hours >= 12 ? 'pm' : 'am';
     hours = hours % 12;
     hours = hours ? hours : 12; // the hour '0' should be '12'
     minutes = minutes < 10 ? '0'+minutes : minutes;
     var strTime = hours + ':' + minutes + ' ' + ampm;
     return strTime;
   }
   
   console.log(formatAMPM(new Date));*/

  return (
    <div className='container-fluid m-0 p-0 d-flex justify-content-end mt-2 mb-2'>
  
        <div className='message-content-wrapper-right pt-3 pe-3 ps-3 me-5'>
          <div className='flex-wrap'>{props.content} </div>
          <div className=' d-flex justify-content-end mr-3'>{props.date}</div>
        </div>

    </div>
  )
}
