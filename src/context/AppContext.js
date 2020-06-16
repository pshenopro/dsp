import React from 'react'



export const AppContext = React.createContext({
    // status: ['Created', 'Active', 'Stopped', 'Completed'],
    status: [
        {
            name: 'Created',
            val: false,
        },
        {
            name: 'Active',
            val: false,
        },
        {
            name: 'Stopped',
            val: false,
        },
        {
            name: 'Completed',
            val: false,
        }
    ],
    typeTv: [
        {
            name: 'Banner',
            val: false,
        },
        {
            name: 'Video',
            val: false,
        },
    ],
    typePlaceTv: [
        {
            name: 'In-Stream',
            val: false,
            dis: false,
        },
        {
            name: 'In-Banner',
            val: false,
            dis: false,
        },
        {
            name: 'In-Article',
            val: false,
            dis: false,
        },
        {
            name: 'In-Feed',
            val: false,
            dis: false,
        },
        {
            name: 'Interstitial/Slider/Floating',
            val: false,
            dis: false,
        },
    ]
});