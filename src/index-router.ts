import { render } from "./template.js";
import { app } from "./server.js";

app.get('/', async (_req, res, _next) => {
    render('index/index.njk', undefined, res)
})