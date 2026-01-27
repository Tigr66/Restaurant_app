import type { IDish } from "./IDish";

export interface IReataurantState {
    dishes: IDish[];
    cart: IDish[];
    errorMessage: string;
    successMessage: string;
    isLoading: boolean;
    isSending: boolean;
}
