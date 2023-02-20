import React from 'react'

const Alert = ({ msg,logged }) => {
    return (
        <div class={`${logged ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} rounded-lg py-3 px-6 text-base w-full`} role="alert">
            {msg}
        </div>
    )
}

export default Alert