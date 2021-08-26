import React, { useEffect, useState } from 'react'
import { firestore } from '../../services/firebase'

export default function ListClientServices(props) {
    
    const dataFromClient = props.location.state

    useEffect(() => {
        setLoading(true)
        loadServicesFromClient(dataFromClient.client__id)
    }, [])

    const [services, setServices] = useState([])

    const [loading, setLoading] = useState(false) 
    const [loadingAddService, setLoadingAddService] = useState(false) 

    const [service, setService] = useState("")
    const [additional, setAdditional] = useState("")


    async function loadServicesFromClient(clientPassed__id) {
        try {
            const data = await firestore().collection("services").get()
            const newTempArray = data.docs.map(document => ({ ...document.data(), id: document.id }))
            const filteredArray = newTempArray.filter( item => item.clientId === clientPassed__id)

            console.log(filteredArray)
            setServices(filteredArray)
            setLoading(false)
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    async function registerServiceFromClient(service__pass, additional__pass, clientPassed__id) {
        setLoadingAddService(true)
        try {
            await firestore().collection("services").add({ clientId: clientPassed__id, service: service__pass, additional: additional__pass })
            alert("Novo Serviço Registrado")

            setService("")
            setAdditional("")

            loadServicesFromClient(clientPassed__id)

            setLoadingAddService(false)
        } catch (e) {
            console.log(e)
            alert("Não registrado")

            setService("")
            setAdditional("")

            setLoadingAddService(false)
        }
    }


    return (
        <div className="listclientservices d-flex flex-column justify-content-center align-items-center py-5">
            Serviços do Clientes
            
            <h2 className="mt-4">
                {dataFromClient.client__name}
            </h2>


            <div className="card col-lg-3 mt-4 d-flex flex-column justify-content-center align-items-center p-5">

                <input value={service} onChange={e => setService(e.target.value)} type="text" className="form-control mb-2" id="servicodocliente" placeholder="Serviço Realizado" required></input>
                <input value={additional} onChange={e => setAdditional(e.target.value)} type="text" className="form-control mb-2" id="adicionaldoservicodocliente" placeholder="Adicional" required></input>

                <button onClick={() => registerServiceFromClient(service, additional, dataFromClient.client__id)} className="btn btn-success w-100">
                    {
                        !loadingAddService ?
                        <> Cadastrar </>:
                        <div class="spinner-border spinner-border-sm text-light" role="status">
                        </div>
                    }
                </button>
            </div>


            {
                loading ?
                <div className="card col-lg-3 mt-5 d-flex flex-column justify-content-center align-items-center p-5">
                    <div class="spinner-border spinner-border-sm" role="status">
                    </div>
                    <p className="">
                        Carregando
                    </p>
                </div> :
                services.map((element, index) => {
                    return (
                        <div className="card text-center col-lg-3 mt-5 d-flex flex-column justify-content-center align-items-center p-5 mx-4">
                            <h3 className="">
                                {element.service}
                            </h3>          
                            <p className="">
                                {element.additional}
                            </p>            
                        </div>
                    )
                })
            }
        </div>
    )
}