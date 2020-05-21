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
    ]
});