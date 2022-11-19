import React, { useState, useEffect } from "react";
import axios from 'axios'
import {Usuario} from './components/usuario'

function App() {
  const [usuarios, setUsuarios] = useState([])
  const[nome, setNome] = useState("")
  const[email, setEmail] = useState("")

  const onChangeNome = (event) => {
    setNome(event.target.value)
  }
  const onChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const pegarUsuarios = () => {
    axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users", {
      headers: {
        Authorization: "lucas-calabria"
      } 
    })
    .then((response)=> {
      setUsuarios(response.data)
    })
    .catch((error)=> {
      console.log(error)
    })
  }

  useEffect(()=> {
    pegarUsuarios()
  },[])

  const criarUsuario = () => {
    let body = {
      name: nome,
      email: email
    }
    axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users", body, {
      headers: {
        Authorization: "lucas-calabria"
      }
    })
    .then((response)=> {
      console.log(response)
      pegarUsuarios()
      setNome("")
      setEmail("")
    })
    .catch((erro)=> {
      alert(erro.response.data.message)
    })
  }

  return (
    <>
      <p>Para esta aula usaremos a <a href="https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro" target="_blank" rel="noreferrer">API Labenusers</a></p>
      <input placeholder="nome" value={nome} onChange={onChangeNome} />
      <input placeholder="email" value={email} onChange={onChangeEmail} />
      <button onClick={()=>criarUsuario()} >Criar</button>
      {usuarios.map((usuario) => {
        return <Usuario 
        key={usuario.id} 
        id={usuario.id} 
        />
      })}
    </>
  )
}

export default App;
