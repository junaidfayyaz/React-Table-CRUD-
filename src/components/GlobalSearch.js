import React, { useState } from 'react'

import { useAsyncDebounce } from 'react-table'


export default function GlobalSearch({ filter, setFilter }) {
    const [value, setValue] = useState(filter);

    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 1000)
    return (
        <div className='container text-center mt-5'>
            <strong>
                Search {'     '}
            </strong>
            <input className='rounded border-secondary' value={value || ''} onChange={e => {
                setValue(e.target.value)
                onChange(e.target.value)
            }} />
        </div>
    )
}
