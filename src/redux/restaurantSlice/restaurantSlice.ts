import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IReataurantState } from "../../interfaces/IReataurantState";
import type { IDish } from "../../interfaces/IDish";
import { getDishesThunk, setOrderThunk } from "./restaurantThunks";

const initialState: IReataurantState = {
    dishes: [],
    cart: [],
    delivery: 500,
    total: 0,
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
        addToCart(state, action: PayloadAction<IDish>) {
            const indexDish: number = state.cart.findIndex(
                (el) => el.dish.id === action.payload.id,
            );

            if (indexDish === -1) {
                state.cart.push({
                    count: 1,
                    total: action.payload.price,
                    dish: action.payload,
                });
                return;
            }

            state.cart[indexDish].count++;
            state.cart[indexDish].total += action.payload.price;
        },
        deleteFromCart(state, action: PayloadAction<IDish>) {
            const indexDish: number = state.cart.findIndex(
                (el) => el.dish.id === action.payload.id,
            );

            if (state.cart[indexDish].count === 1) {
                state.cart = state.cart.filter(
                    (el) => el.dish.id !== action.payload.id,
                );
                return;
            }

            if (indexDish !== -1) state.cart[indexDish].count--;
            if (indexDish !== -1)
                state.cart[indexDish].total -= action.payload.price;
        },
        calculateTotal(state) {
            state.total =
                state.cart.reduce((acc, dish) => {
                    return acc + dish.total;
                }, 0) + state.delivery;
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

export const { clearMessages, addToCart, deleteFromCart, calculateTotal } =
    restaurantSlice.actions;
export default restaurantSlice.reducer;
