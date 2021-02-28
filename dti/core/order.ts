export type OrderType = 'asc' | 'desc' | undefined;
export interface IOrder {
    [property: string]: OrderType
}