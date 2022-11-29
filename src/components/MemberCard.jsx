import React, {useEffect, useState} from 'react';

export default function MemberCard({colMd, imgSrc, personName, websiteLink, major, dept, school}) {
    return (
        <div className='member-card'>
            {imgSrc == null ? '': <img src={imgSrc} style={{width:"135px",height:"135px",marginBottom:'3px'}}/>}
            <div className='info-work'>
                {websiteLink == null ? <h4 className='person-name'>{personName}</h4> : 
                    <h4 className='person-name'><a href={websiteLink} target="_blank">{personName}</a></h4>
                }
                {major==null ? '' : <p className='member-card-text'>{major}</p>}
                {dept==null ? '' : <p className='member-card-text'>{dept}</p>}
                {school==null ? '' : <p className='member-card-text'>{school}</p>}
            </div>
        </div>
    )
}