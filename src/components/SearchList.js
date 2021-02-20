import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CharacterCard from './CharacterCard'
import Modal from './Modal'

const SearchList = () => {
    const [search, setSearch] = useState("")
    const [contacts, setContacts] = useState([])
    const [nextAPI, setNextAPI] = useState("")
    const [error, setError] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalInfo, setModalInfo] = useState(null)

    useEffect(() => {
        if(search){
            axios.get(`https://rickandmortyapi.com/api/character/?name=${search}&page=1`)
            .then(res => {
                // console.log(res.data)
                setError(false)
                setContacts(res.data.results)
                setNextAPI(res.data.info.next)
            })
            .catch(err => {
                console.log(err)
                setError(true)
                setNextAPI(null)
            })
        }
    }, [search])

    const inputChangeHandler = value => {
        setSearch(value)
    }

    const loadMoreHandler = () => {
        axios.get(`${nextAPI}`)
        .then(res => {
            // console.log(res.data)
            setContacts([...contacts, ...res.data.results])
            setNextAPI(res.data.info.next)
        })
        .catch(err => console.log(err))
    }

    const openCharacterModal = info => {
        // console.log(info)
        setModalInfo(info)
        setModalOpen(true)
    }

    return (
        <>
            <div className="mainContainer">
                <div className="inputContainer">
                    <input 
                        type="text"
                        value={search}
                        onChange={e => inputChangeHandler(e.target.value)}
                        className="input"
                        placeholder="Search for a contact"
                    />
                </div>
                {
                    error ?
                    <div className="error">No contacts found!</div> : 
                    <div className="listContainer">
                        {
                            contacts && contacts.length ?
                            contacts.map(c => <React.Fragment key={c.id}><CharacterCard info={c} onCardClick={openCharacterModal}/></React.Fragment>)
                            : null
                        }
                    </div>
                }
                {
                    nextAPI ?
                    <button className="load-more" onClick={loadMoreHandler}>Wubba Lubba Dub Dub!</button> : null
                }
            </div>
            {
                modalOpen ? 
                <Modal info={modalInfo} onClose={() => setModalOpen(false)} /> : null
            }
        </>
    )
}

export default SearchList
