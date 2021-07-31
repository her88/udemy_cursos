import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">

            <div className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://prod-discovery.edx-cdn.org/media/course/image/abec5082-2e5f-4702-a767-e99b352d1d63-4ea2cd258b16.small.jpg)'
                }}>

            </div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">Un nuevo día</p>

                <p className="journal__entry-content">asasasasasasasasasasasasasasasasas</p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>
            
        </div>
    )
}
