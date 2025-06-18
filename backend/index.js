const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
const PORT = 3000


const boardRoutes = require('./routes/boardRoutes')

app.get('/', (req, res) => {
    res.send('KUDOSSSS')
    console.log(boardRoutes)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.use(cors())
app.use('/', boardRoutes)

