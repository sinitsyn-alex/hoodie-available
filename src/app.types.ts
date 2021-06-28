type TLimitOption = {
    int: string;
};

export type TLimit = {
    inStock: number;
    options: Array<TLimitOption>;
};

export type TFullLimitsResponse = Array<TLimit>;
