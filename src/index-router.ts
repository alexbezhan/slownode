import { render } from "./template.js";
import { app } from "./server.js";
import { readFile } from "fs/promises";
import type { Request } from "restana";

const rows = JSON.parse(await readFile('file.json', 'utf8'))

const columns: string[] = []
{
    const columnsToIgnoreSet = new Set(['7 Day Other SKU Sales', '7 Day Other SKU Units (#)', '7 Day Advertised SKU Sales', '7 Day Advertised SKU Units (#)'])
    for (const field in rows[0]) {
        if (columnsToIgnoreSet.has(field)) {
            continue
        }
        columns.push(field)
    }
}

app.get('/', async (req, res, next) => forwardErrors(req, next, async () => {
    const state = {
        rows,
        columns,
    }
    render('index/index.njk', { state }, res)
}))

export async function forwardErrors(_req: Request<any>, next, handler: () => Promise<any>): Promise<any> {
    try {
        return await handler()
    } catch (error: any) {
        await next(error)
    }
}
