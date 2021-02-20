import React, { useState, useRef, useEffect } from 'react'

const CharacterCard = ({ info, onCardClick }) => {
    const placeholder = useRef()
    const [showImage, setShowImage] = useState(false)

    const status = info.status.toLowerCase()
    const color = (status === "alive" ? 'green' : (status === 'dead' ? 'red' : 'gray'))

    useEffect(() => {
        const callback = (entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    setShowImage(true)
                }
            })
        }

        const options = {
            threshold: 1.0
        }

        const observer = new IntersectionObserver(callback, options)
        observer.observe(placeholder.current)

        return () => observer.disconnect()
    }, [])

    return (
        <div className={`${showImage ? "card" : "hideCard"  }`} ref={placeholder} onClick={() => onCardClick(info)}>
            {
                showImage && <img src={info.image} alt={`${info.name} Character`} />
            }
            <p className="name">{ info.name }</p>
            <span className={`dot ${color}`} />
            <span className="status">{ status.charAt(0).toUpperCase() + status.slice(1) }</span>
            <span className="species">- { info.species }</span>
        </div>
    )
}

export default CharacterCard
