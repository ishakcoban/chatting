import React, { useEffect } from 'react'
import $ from "jquery";
export const Try = () => {



  return (
    <div className='p-0 m-0'>

      <div className='row p-0 m-0 '>
        <div className='bg-warning col-4 vh-100 p-0 m-0'>
          <div className='bg-danger position-relative' style={{"zIndex":"auto"}}>
            <div className='bg-success'>aaa</div>
            <div className='bg-secondary d-flex flex-column ' >
              <div>11</div>
              <div>11</div>
              <div>11</div>
            </div>
          </div>
          <div className='bg-danger position-relative' style={{"zIndex":"auto"}}>
            <div >aaa</div>
            <div className='bg-danger d-flex flex-column '>
              <div>22</div>
              <div>22</div>
              <div>22</div>
            </div>
          </div>
      

        </div>
        <div className='bg-info col-8 vh-100'>ddd</div>
      </div>

    </div>
  )
}
