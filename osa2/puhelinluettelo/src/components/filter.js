import React from 'react'

const Filter = (props) => {
    return (
    <p>
        filter shown with <input
                            value={props.filter}
                            onChange={props.onFilterChange}
                            />
    </p>

    )
}


export default Filter