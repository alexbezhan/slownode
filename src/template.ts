import type { Response } from "restana";
import { nunjucksEnv } from "./server.js";

export function render(tmpl: string, context: object | undefined, res: Response<any>) {
    const rendered = nunjucksEnv.render(tmpl, context)
    res.setHeader('content-type', 'text/html; charset=utf-8')
    res.send(rendered)
}