export const maskAccount = (account: string): string =>
    account.replace(/^(\d{5})\d+(\d{4})$/, '$1 **** $2')

export const isValidLimit = (limit: number): boolean =>
    limit >= 0 && limit <= 10_000_000

export const isSpecialRisk = (limit: number): boolean =>
    limit > 1_000_000

export const buildLimitLog = (
    name: string,
    oldLimit: number,
    newLimit: number
): string =>
    `Для клиента ${name} лимит изменен с ${oldLimit} на ${newLimit}`
