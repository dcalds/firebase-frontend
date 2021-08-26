import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { useAuth } from '../../auth/authContext'

export default function Dashboard() {

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    
    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <div className="mainpage d-flex flex-column justify-content-center align-items-center vh-100">
            (DASHBOARD PRINCIPAL)
            
            <div className="col-lg-3 d-flex flex-column justify-content-center align-items-center p-5">

                {error && <p className="text-danger"> {error} </p>}
                
                <p className="mb-2"> email: {currentUser.email} </p>

                <Link to="/newclient" className="btn btn-primary w-100">
                    Cadastrar Novo Cliente
                </Link>

                <button className="btn btn-danger mt-2 w-100" onClick={handleLogout}>
                    Sair
                </button>

            </div>

        </div>
    )
}