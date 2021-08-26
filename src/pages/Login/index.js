import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { useAuth } from '../../auth/authContext'

export default function Login() {
    const { login } = useAuth()
    const history = useHistory()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(email, password)
            history.push("/dashboard")
        } catch {
            setError("Falha ao entrar no sistema")
        }

        setLoading(false)
    }

    return (
        <div className="mainpage d-flex flex-column justify-content-center align-items-center vh-100">
              
            Entrar no sistema
            <div className="col-lg-3 d-flex flex-column justify-content-center align-items-center p-5">

                <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="email" />
                <input value={password} onChange={e => setPassword(e.target.value)} className="form-control mt-2" placeholder="senha" />

                <p className="text-danger mt-2">
                    {error}
                </p>

                <button className="btn btn-primary w-100" onClick={handleSubmit}>
                    {!loading ? <>entrar no sistema</> : <> Carregando </>}
                </button>

                <a href="/register" className="link mt-3"> Criar conta </a>

            </div>

        </div>
    )
}