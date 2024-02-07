import Koa from 'koa'
import { router as psalmsRouter } from './modules/psalms/controllers.ts'
import holychordsRouter from './modules/holychords/router.ts'
import fonkiRouter from './modules/fonki/router.ts'

const app = new Koa()

app.use(psalmsRouter.routes()).use(psalmsRouter.allowedMethods())
app.use(holychordsRouter.routes()).use(holychordsRouter.allowedMethods())
app.use(fonkiRouter.routes()).use(fonkiRouter.allowedMethods())

app.listen(3000, () => console.log('The server is running on port 3000'))
