import React from 'react'

const Modal = ({ info, onClose }) => {
    const status = info.status.toLowerCase()
    const color = (status === "alive" ? 'green' : (status === 'dead' ? 'red' : 'gray'))
    return (
        <div className="modalContainer">
            <div className="modal">
                <span className="close" onClick={onClose}></span>
                <div className="info">
                    <img src={info.image} alt={`${info.name} Character`}/>
                    <div className="nameAndStatus">
                        <p className="name">{ info.name }</p>
                        <span className={`dot ${color}`} />
                        <span className="status">{ status.charAt(0).toUpperCase() + status.slice(1) }</span>
                        <span className="species">- { info.species }</span>
                    </div>
                </div>
                <div className="content">
                    <div className="gender">
                        <p>Gender</p>
                        <span>{ info.gender ? info.gender : "Unknown" }</span>
                    </div>
                    <div className="location">
                        <p>Location</p>
                        <span>{ info.location.name ? info.location.name.charAt(0).toUpperCase() + info.location.name.slice(1) : "Unknown" }</span>
                    </div>
                    <div className="species">
                        <p>Species</p>
                        <span>{ info.species ? info.species.charAt(0).toUpperCase() + info.species.slice(1) : "Unknown" }</span>
                    </div>
                    <div className="origin">
                        <p>Origin</p>
                        <span>{ info.origin.name ? info.origin.name.charAt(0).toUpperCase() + info.origin.name.slice(1) : "Unknown" }</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
