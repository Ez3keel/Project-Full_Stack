import './style.css'
import Thrash from '../../assets/thrash.svg'
import api from '../../services/api'
import { useEffect, useState, useRef } from 'react'

function Home() {

 const [users, setUsers] = useState([])

 const inputName = useRef()
 const inputAge = useRef()
 const inputEmail = useRef()

    async function getUsers() {
      const usersFromApi = await api.get('/usuarios');    

      setUsers(usersFromApi.data)
      console.log(users)
    }
    async function createUsers() {
      await api.post('/usuarios', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value
      });    
      //console.log(inputName)
      //Para atualizar a pagina
      getUsers()
    }

    async function deleteUsers(id) {
      await api.delete(`/usuarios/${id}`)    

      getUsers()
    }

    useEffect(() => {
      getUsers()
    }, [])



// const users = []
//   {
//     id: '23132132165',
//     name: 'Rodolfo',
//     age: 33,
//     email: 'rod@gmail.com'
//   },
//   {
//     id: '25',
//     name: 'Aline',
//     age: 30,
//     email: 'Aline@gmail.com'
//   },
//   {
//     id: '255',
//     name: 'Aline',
//     age: 30,
//     email: 'Aline@gmail.com'
//   }
// ]
  
  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" name='nome' type='text' ref={inputName}/>
        <input placeholder="Idade"name='idade' type='number' ref={inputAge}/>
        <input placeholder="E-mail"name='email' type='text' ref={inputEmail}/>
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

    {users.map((user) => 
      <div key = {user.id} className='card'>
        <div>
          <p>Nome:  <span>{user.name} </span> </p>
          <p>Idade: <span>{user.age}  </span> </p>
          <p>Email: <span>{user.email}</span> </p>
        </div>
        <button onClick={() => deleteUsers(user.id)}>
            <img src={Thrash} className='Trash'/>
        </button >
      </div>
    )}

    </div>
  )
}

export default Home
