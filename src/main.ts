import './config.ts'
import Koa from 'koa'
import { router } from './controllers.ts'

const app = new Koa()

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, () => console.log('The server is running on port 3000'))
