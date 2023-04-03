import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc)

const dateForFormatting = dayjs('1900-01-01T00:00:00.000Z').subtract(2, 'days')
const usdFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})
const decimalFormat = new Intl.NumberFormat('en-US', {
    style: 'decimal',
})
const percentFormat = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 2,
})

export function date(x: number | undefined) {
    if (x === undefined) {
        return x
    }
    return dateForFormatting.add(x, 'days').format('DD.MM.YY')
}

export function percent(x: number | undefined) {
    if (x === undefined) {
        return x
    }
    return percentFormat.format(x!)
}

export function decimal(x: number | undefined) {
    if (x === undefined) {
        return x
    }
    return decimalFormat.format(x!)
}

export function money(x: number | undefined): string | undefined {
    if (x === undefined) {
        return x
    }
    return usdFormat.format(x!)
}
