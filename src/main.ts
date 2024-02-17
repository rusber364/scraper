import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'

import { fonki, holychords } from './configs.ts'
import { router as psalmsRouter } from './modules/psalms/controllers.ts'
import { createRouter } from './utils/createRouter.ts'

const app = new Hono()
app.use(logger())

const fonkiRouter = createRouter(fonki)
const holychordsRouter = createRouter(holychords)

app.route(fonki.routePrefix, fonkiRouter)
app.route(holychords.routePrefix, holychordsRouter)
app.route(`/psalms`, psalmsRouter)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({ fetch: app.fetch, port })
