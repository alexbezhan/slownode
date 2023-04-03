import path from 'path'
import restana from "restana";
import nunjucks from 'nunjucks'
import files from 'serve-static'

export let nunjucksEnv: nunjucks.Environment
export let app: ReturnType<typeof restana>
const __dirname = path.resolve()

async function server() {
    nunjucksEnv = nunjucks
        .configure(path.join(__dirname, 'views'), { autoescape: true, noCache: true, trimBlocks: true })
    app = restana()

    app.use(files('public', {
        lastModified: false,
        setHeaders: (res, _path) => {
            res.setHeader('cache-control', 'public, no-cache, max-age=604800')
        }
    }) as any)

    await import('./index-router.js')

    const port = 3002
    console.log(`Running server on port ${port}`)
    await app.start(port)
}

void server()