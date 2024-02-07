import Koa from 'koa'

import { fonki, holychords } from './configs.ts'
import { router as psalmsRouter } from './modules/psalms/controllers.ts'
import { createRouter } from './utils/createRouter.ts'

const app = new Koa()

const fonkiRouter = createRouter(fonki)
const holychordsRouter = createRouter(holychords)

app.use(psalmsRouter.routes()).use(psalmsRouter.allowedMethods())
app.use(holychordsRouter.routes()).use(holychordsRouter.allowedMethods())
app.use(fonkiRouter.routes()).use(fonkiRouter.allowedMethods())

app.listen(3000, () => console.log('The server is running on port 3000'))
