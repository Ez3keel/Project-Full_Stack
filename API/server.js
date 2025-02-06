import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

const app = express()

//Para o express usar json para funcionar o post no body
app.use(express.json())
app.use(cors()) // Se não colocar nada pode ser acessado por qualquer página é bom por segurança colocar quem pode acessar colocando o url dentro ()

// Para criar um novo usuário ele responde a requisição
app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    //adiciona um ou mais elementos ao final de um array //faz a requisição aparecer no body html
    //users.push(req.body)

    //console.log(req.body)

    res.send('Ok user criado')
    //201 responde que deu Ok e que criou um novo usuário
    res.status(201)
})


app.get('/usuarios', async (req, res) => {

    let users = [];
    if(req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else {
        users = await prisma.user.findMany()
    }

    //testar retorno de resposta do get
    //res.send('Ok, deu bom')
    
    //responde com os usuários na lista users
    //res.json(users)

    //200 responde que deu certo a conexão eu está respondendo com a lista de usuários
    res.status(200) .json(users)
})

// Para criar um novo usuário ele responde a requisição
app.put('/usuarios/:id', async (req, res) => {

    //console.log(req)

    //Solicita para o prisma para que atualize o usuário que tem tal id que chegou no :id 
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.send('Ok editado')
    //201 responde que deu Ok e que criou um novo usuário
    res.status(201)
})


app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id:req.params.id
        },
    })

    res.status(200) .json({ message: 'Usuário deletado com Sucesso!'})
})




//porta para rodar o server
app.listen(3000)

/*
    Rota para retornar algo
    app.get('/usuarios') // vai listar todos os usuários
    app.post('/usuarios') // vai criar um novo usuário
    app.put('/usuarios') // vai editar o usuário
    app.delete('/usuarios') // vai deletar o usuário
    1) Tipo de Rota / Método HTTP  (GET - POST - PATCH - PUT OU DELETE)
    2) Endereço (url) o que vem depois da / no url
*/

/*
    - Criar nossa API de usuários
    - Listar todos os usuários
    - Editar um usuário
    - Deletar um usuário

    gonzeq
    H541041569h#

*/

