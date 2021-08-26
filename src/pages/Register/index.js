import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { useAuth } from '../../auth/authContext'

export default function Login() {
    const { signup } = useAuth()
    const history = useHistory()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    async function handleSubmit(e) {
        e.preventDefault()

        if (password !== passwordRepeat) {
            return setError("Senhas não correspondem")
        }

        try {
            setError("")
            setLoading(true)
            await signup(email, password)
            history.push("/dashboard")
        } catch {
            setError("Falha ao criar conta")
        }

        setLoading(false)
    }


    return (
        <div className="mainpage d-flex flex-column justify-content-center align-items-center vh-100">
            Criar usuário
            <div className="col-lg-3 d-flex flex-column justify-content-center align-items-center p-5">

                <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="email" />
                <input value={password} onChange={e => setPassword(e.target.value)} className="form-control mt-2" placeholder="senha" />
                <input value={passwordRepeat} onChange={e => setPasswordRepeat(e.target.value)} className="form-control mt-2" placeholder="senhaRepeat" />

                <p className="text-danger mt-2">
                    {error}
                </p>

                <button className="btn btn-primary w-100" onClick={handleSubmit}>
                    {!loading ? <>criar usuário</> : <> Carregando </>}
                </button>

                <a href="/login" className="link mt-3"> Já tenho uma conta </a>

            </div>

        </div>
    )
}