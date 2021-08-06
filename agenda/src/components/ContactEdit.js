import React, { useState, useEffect } from 'react'
import '../styles/ContactEdit.css'

function ContactEdit(props) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')

  const buscar = () => {
    if(!props.id){
      return
    }
    fetch(`http://localhost:3000/contacts/${props.id}`)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      setNome(data.nome)
      setEmail(data.email)
      setTelefone(data.telefone)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  useEffect(buscar, [props.id])
  const create = () => {
    if (!email && !telefone) return console.error('Preenchimento obrigatórios!')
    
    const data = {
      nome,email,telefone
    }
    let url = 'http://localhost:3000/contacts'
    let metodo = 'POST'
    if(props.id){
        url = `${url}/${props.id}`
        metodo = 'PUT'
    }
    fetch(url, {
      method: metodo,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
  }
  return (
    <>
      <form onSubmit={() => create()}>
        <div className="container-inputCreateEdit">
          <div className="inputCreateEdit">
            <label>Nome</label>
            <input type="text"value={nome}onChange={(event) => setNome(event.target.value)} />
          </div>
          <div className="inputCreateEdit">
            <label>Email</label>
            <input type="text"value={email}onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="inputCreateEdit">
            <label>Telefone </label>
            <input type="texto"value={telefone}onChange={(event) => setTelefone(event.target.value)} />
          </div>
        </div>
        <button type="submit" className="buttonCadastrar">Cadastrar</button>
      </form>
    </>
  )
 
}
export default ContactEdit;