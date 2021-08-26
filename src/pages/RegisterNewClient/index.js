import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { firestore } from '../../services/firebase'

export default function RegisterNewClient() {

    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const [endereco, setEndereco] = useState("")

    const [loading, setLoading] = useState(false)

    async function registerClient(nome__pass, cpf__pass, endereco__pass) {
        setLoading(true)
        try {
            await firestore().collection("clients").add({ name: nome__pass, cpf: cpf__pass, endereco: endereco__pass })
            console.log("Registrado")
            alert("Registrado")

            setNome("")
            setCpf("")
            setEndereco("")

            setLoading(false)
        } catch (e) {
            console.log(e)
            console.log("Não registrado")
            
            setNome("")
            setCpf("")
            setEndereco("")

            setLoading(false)
        }
    }

    return (
        <div className="registernewclient d-flex flex-column justify-content-center align-items-center vh-100">
            Registrar Novo Cliente

            <div className="card col-lg-3 mt-5 d-flex flex-column justify-content-center align-items-center p-5">

                <input value={nome} onChange={e => setNome(e.target.value)} type="text" className="form-control mb-2" id="nomedocliente" placeholder="Nome do Cliente" required></input>
                <input value={cpf} onChange={e => setCpf(e.target.value)} type="text" className="form-control mb-2" id="cpfdocliente" placeholder="CPF" required></input>
                <input value={endereco} onChange={e => setEndereco(e.target.value)} type="text" className="form-control mb-2" id="endereco" placeholder="Endereço" required></input>

                <button onClick={() => registerClient(nome, cpf, endereco)} className="btn btn-success w-100">
                    {
                        !loading ?
                            <>Cadastrar</> :
                            <div class="spinner-border spinner-border-sm text-light" role="status">
                            </div>
                    }
                </button>

            </div>

            <div className="col-lg-3 d-flex flex-column justify-content-center align-items-center p-5">

                <Link to="/clients" className="btn btn-outline-primary w-100">
                    Lista de Clientes
                </Link>
            </div>
        </div>
    )
}