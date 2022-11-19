import axios from 'axios'
import { useEffect, useState } from 'react'

export function Usuario (props) {

    const [usuario, setUsuario] = useState({})
    const [nomeEdit, setnomeEdit] = useState("")
    const [emailEdit, setEmailEdit] = useState("")

    const pegaUsuarioId = () => {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.id}`, {
            headers: {
                Authorization: "lucas-calabria"
            }
        })
        .then((response)=> {
            setUsuario(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        pegaUsuarioId()
    }, [])

    const editUser = () => {
        let body = {
            name: nomeEdit,
            email: emailEdit
        }
        axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.id}`, body, {
            headers: {
                Authorization: "lucas-calabria"
            }
        })
        .then((response)=> {
            console.log(response)
            pegaUsuarioId()
            setnomeEdit("")
            setEmailEdit("")
        })
        .catch((erro)=> {
            console.log(erro)
        })
    }

    const onChangeNomeEdit = (event) => {
        setnomeEdit(event.target.value)
    }

    const onChangeEmailEdit = (event) => {
        setEmailEdit(event.target.value)
    }

    return (
        <>
            <p>{usuario.name}</p>
            <p>{usuario.email}</p>
            <input placeholder='nome' value={nomeEdit} onChange={onChangeNomeEdit} />
            <input placeholder='email' value={emailEdit} onChange={onChangeEmailEdit} />
            <button onClick={()=> editUser()} >Editar</button>
        </>
    )
}