import express from 'express'
import pkg from 'pg'
const { Pool } = pkg
import cors from 'cors'

const app = express()
const port = 3000


const corsOptions = {
    origin: 'http://localhost:5173'
}

app.use(cors(corsOptions))

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

app.get('/api/organisations', async (req, res) => {
    const keyword = req.query.keyword // Get the keyword from the query parameters

    try {
        const query = `
            SELECT *
            FROM organisations
            WHERE LOWER(organisation_name) LIKE LOWER($1)
        `
        const result = await pool.query(query, [`%${keyword}%`])
        res.json(result.rows)
    } catch (error) {
        console.error('Error while fetching organisations:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.get('/', (req, res) => {
    res.send('Welcome to the API!')
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
