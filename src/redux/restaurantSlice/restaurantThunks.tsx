import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IDish } from "../../interfaces/IDish";
import { firebaseApi } from "../../api/firebaseApi";

export const getDishesThunk = createAsyncThunk<IDish[]>(
    "restaurant-slice/get",
    async () => {
        const res = await firebaseApi.get("/dishes.json");
        const data = res.data ?? {};
        const dishes: IDish[] = Object.entries(data).map(
            ([id, dish]) =>
                ({
                    id,
                    ...(dish as Omit<IDish, "id">),
                }) as IDish,
        );

        return dishes;
    },
);

export const setOrderThunk = createAsyncThunk<void, number>(
    "restaurant-slice/post",
    async (info) => {
        await firebaseApi.post("/orders.json", info);
    },
);
