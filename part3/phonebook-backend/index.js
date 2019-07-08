const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
  {
    id: 1,
    name: "Guillermo",
    phone: "1234567"
  },
  {
    id: 2,
    name: "Pedro",
    phone: "3245532"
  },
  {
    id: 3,
    name: "Pablo",
    phone: "5435344"
  },
  {
    id: 4,
    name: "María",
    phone: "5432453"
  },
  {
    id: 5,
    name: "Sara",
    phone: "25345435"
  }
]

const generateRandomId = () => {
  const personsIds = persons.map( person => person.id)
  const randomId = Math.ceil(Math.random() * 1000)
  if (personsIds.find(id => id === randomId)) {
    generateRandomId()
  } else {
    return randomId
  }
}

app.get('/', (req, res) => {
  res.send('<h1>Contact List</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if(person) {
    res.json(person)
  } else {
    res.status(400).end()
  }
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if(!body.name || !body.phone) {
    return res.status(400).json({
      error: 'Content missing'
    })
  }

  if (persons.find(p => p.name === body.name)) {
    return res.status(409).json({
      error: 'Name already taken. Name must be unique.'
    })
  }


  const person = {
    name: body.name,
    phone: body.phone,
    id : generateRandomId()
  }

  persons.concat(person)

  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})