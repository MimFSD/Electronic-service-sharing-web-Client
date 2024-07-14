import React from "react"
import PropTypes from "prop-types"

const EmptyServices = ({ name }) => {
    return (
        <div className="text-center h-[50vh] flex items-center col-span-2 justify-center bg-white px-4">
            <h1 className="uppercase tracking-widest text-2xl text-gray-500">{name.name} list are Empty</h1>
        </div>
    )
}

export default EmptyServices

EmptyServices.propTypes = {
    name: PropTypes.object,
}
