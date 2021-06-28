import fetch from 'node-fetch';
import { TFullLimitsResponse, TLimit } from './app.types';
import { Int } from './app.const';

export function checkAvailable(): Promise<boolean> {
    return fetch('https://tarkovmerchstore.com/api/v1/products/read_full_limits?id=218')
        .then(response => response.json())
        .then((limits: TFullLimitsResponse): boolean => {
            const limit = limits.find(({ options }: TLimit) => options[0].int === Int.M && options[1].int === Int.REG);

            if (!limit) throw new Error('Limit not found');

            return limit.inStock > 0;
        });
}
