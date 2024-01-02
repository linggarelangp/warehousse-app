import express, { type Express } from 'express'
import * as dotenv from 'dotenv'
import router from './routes/router';

dotenv.config();

const host: string = process.env.BASEURL as string
const port: string | number = process.env.PORT || 3000

const app: Express = express()

app.use(router)

app.listen(port, () => {
    console.log(`App running at http://${host}:${port}`)
})


export default app
