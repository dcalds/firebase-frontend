import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { firestore } from '../../services/firebase'

export default function ListClient() {

    useEffect(() => {
        setloading(true)
        loadClients()
    }, [])

    const [clients, setClients] = useState([])
    const [loading, setloading] = useState(false)

    async function loadClients() {
        try {
            const data = await firestore().collection("clients").get()
            const newTempArray = data.docs.map(document => ({ ...document.data(), id: document.id }))
            setClients(newTempArray)
            setloading(false)
        } catch (e) {
            console.log(e)
            setloading(false)
        }
    }

    return (
        <div className="listclient d-flex flex-column justify-content-center align-items-center py-5">
            Lista de Clientes
        </div>
    )
}