export const Text = {
    ALREADY_JOB: 'Задача уже поставлена в очередь',
    ADD_JOB: 'Задача поставлена в очередь',
    DELETE_JOB: 'Задача удалена из очереди',
    NOT_FOUND_JOB: 'Задача не найдена',
    HOODIE_AVAILABLE: `
        🧥🧥🧥 Худи в наличии!!! 🧥🧥🧥
        [Купить](https://tarkovmerchstore.com/products/product/218)
    `,
};

export const Command: Record<string, RegExp> = {
    START: /\/start/,
    STOP: /\/stop/
};

export enum Int {
    M = 'M',
    REG = 'Reg.'
}
