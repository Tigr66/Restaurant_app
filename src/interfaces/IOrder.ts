import type { ICartDish } from "./ICartDish";

export interface IOrder {
    name: string;
    phone: string;
    address: string;
    order: ICartDish[];
}
