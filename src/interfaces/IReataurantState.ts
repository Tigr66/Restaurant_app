import type { ICartDish } from "./ICartDish";
import type { IDish } from "./IDish";

export interface IReataurantState {
    dishes: IDish[];
    cart: ICartDish[];
    errorMessage: string;
    successMessage: string;
    isLoading: boolean;
    isSending: boolean;
}
