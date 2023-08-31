const units : Record<string, number> = {
    year: 1000 * 60 * 60 * 24 * 365,
    month: 1000 * 60 * 60 * 24 * 365 / 12,
    day: 1000 * 60 * 60 * 24,
    hour: 1000 * 60 * 60,
    minute: 1000 * 60,
    second: 1000,
}

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

export function getRelativeTime(d1: Date, d2: Date = new Date()) {
    const elapsed = d1.getTime() - d2.getTime()

    // "Math.abs" accounts for both "past" & "future" scenarios
    for (const u in units)
        if (Math.abs(elapsed) > units[u] || u == 'second')
            return rtf.format(Math.round(elapsed / units[u]), u  as Intl.RelativeTimeFormatUnit)
}
