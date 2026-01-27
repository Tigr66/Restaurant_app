import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IReataurantState } from "../../interfaces/IReataurantState";
import type { IDish } from "../../interfaces/IDish";
import { getDishesThunk, setOrderThunk } from "./restaurantThunks";

const initialState: IReataurantState = {
    dishes: [],
    cart: [],
    errorMessage: "",
    successMessage: "",
    isLoading: false,
    isSending: false,
};

const restaurantSlice = createSlice({
    name: "restaurant-slice",
    initialState,
    reducers: {
        clearMessages(state) {
            state.errorMessage = "";
            state.successMessage = "";
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getDishesThunk.pending, (state) => {
                state.errorMessage = "";
                state.successMessage = "";
                state.isLoading = true;
            })
            .addCase(
                getDishesThunk.fulfilled,
                (state, action: PayloadAction<IDish[]>) => {
                    state.isLoading = false;
                    state.dishes = action.payload;
                },
            )
            .addCase(getDishesThunk.rejected, (state) => {
                state.isLoading = false;
                state.errorMessage = "Ошибка получения блюд";
            })
            .addCase(setOrderThunk.pending, (state) => {
                state.isSending = true;
                state.errorMessage = "";
                state.successMessage = "";
            })
            .addCase(setOrderThunk.fulfilled, (state) => {
                state.isSending = false;
                state.successMessage = "Заказ успешно оформлен";
                state.cart = [];
            })
            .addCase(setOrderThunk.rejected, (state) => {
                state.isSending = false;
                state.errorMessage = "Ошибка с оформлением заказа";
            });
    },
});

export const { clearMessages } = restaurantSlice.actions;
export default restaurantSlice.reducer;
