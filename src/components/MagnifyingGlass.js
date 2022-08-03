import React from 'react'

export const MagnifyingGlass = () => {
    return (
        <div style={{"width":"390px","height":"390px"}}>
            <div className='ring d-flex justify-content-center align-items-center' style={{ "borderRadius": "100%", "backgroundColor": "black", "width": "250px", "height": "250px" }}>

                <div className='ring' style={{ "borderRadius": "100%", "backgroundColor": "black", "width": "220px", "height": "220px","backgroundColor":"#D9D9D9" }}></div>
            </div>
            <div style={{ "borderRadius": "15px", "backgroundColor": "black", "width": "220px", "height": "30px","transform":"rotate(45deg)","marginTop":"30px","marginLeft":"185px"}}></div>
        </div>
    )
}
