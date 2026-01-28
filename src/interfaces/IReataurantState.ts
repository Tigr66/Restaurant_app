import type { ICartDish } from "./ICartDish";
import type { IDish } from "./IDish";

export interface IReataurantState {
    dishes: IDish[];
    cart: ICartDish[];
    delivery: number;
    total: number;
    errorMessage: string;
    successMessage: string;
    isLoading: boolean;
    isSending: boolean;
    isModal: boolean;
}
