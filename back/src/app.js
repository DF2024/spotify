import express from 'express'
import routes from './routes/index.js'
import errorHandler from './middlewares/errorHandler.js'
import LoggerMiddleware from './middlewares/logger.js'
import cors from 'cors'

const app = express()

app.use(cors({
    origin:[
      'http://localhost:5173',
      'https://spotify-kappa-orcin.vercel.app/login'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))


app.use(express.json())
app.use(errorHandler)
app.use(LoggerMiddleware)

app.use('/api', routes)

app.get('/api', (req, res) => {
  res.send('Bienvenido al API de Spotify Clone');
});


export default app;