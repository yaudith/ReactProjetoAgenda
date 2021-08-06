import React, { useEffect, useState} from 'react'
import EditContacts from './ContactEdit'
import '../styles/ListContacts.css'
import imgEdit from '../img/editar.png'
import imgDelete from '../img/delet.png'

function ListContacts() {
  const [contacts, setContacts] = useState([])
  const [idDelete, setidDelete ] = useState(0)
  const [idEdit, setidEdit] = useState(0)
  const [search, setSearch] = useState("")

  const url='http://localhost:3000/contacts'

  const getContacts = () => {
    const endpoint = Boolean(search) ? `${url}?q=${search}` : url 
    fetch(endpoint, {
      method: 'GET'
    })
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      setContacts(data)
    })
  }

  useEffect(getContacts, [contacts.length, idDelete, idEdit, search])

  const deleteContact = (id) => {
    fetch(`http://localhost:3000/contacts/${id}`, {
      method: 'DELETE'
    })
    .then(function (response) {return response.json()})
    .then(function (data) {
      setidDelete(id)
      console.log('Deletado com sucesso', data);
    })
    .catch(function (error) {
      console.log(error);
    });  
  } 
  const inputSearch = (<div className="inputSearch"><label hidden>Buscar</label>
                        <input type="search" name="" id="" onChange={(event) => setSearch(event.target.value)}
                          placeholder ="Buscar"/>
                      </div>)
  return (
        <div>
          {inputSearch}
          <EditContacts id={idEdit} />
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Editar</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
            {contacts.map((contact) => {
              return(
                <tr key={contact.id}>
                  <td>{contact.nome}</td>
                  <td>{contact.email}</td>
                  <td>{contact.telefone}</td>
                  <td><img onClick={()=>{setidEdit(contact.id)}} src={imgEdit} alt="Editar" /></td>
                  <td><img onClick={() => deleteContact(contact.id)}  src={imgDelete} alt="Editar" /></td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
  )
}

export default ListContacts;