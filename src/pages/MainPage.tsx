import { Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../redux/store";
import { useEffect } from "react";
import { getDishesThunk } from "../redux/restaurantSlice/restaurantThunks";
import DishCard from "../components/DishCard";

const MainPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const dishes = useSelector((state: RootState) => state.restaurant.dishes);

    useEffect(() => {
        dispatch(getDishesThunk());
    }, []);

    return (
        <Stack direction="row">
            <Stack
                direction="column"
                alignItems="center"
                spacing={2}
                sx={{
                    maxHeight: "99vh",
                    overflowY: "auto",
                    width: "70%",
                    p: 2,
                    "&::-webkit-scrollbar": {
                        width: 8,
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#888",
                        borderRadius: 8,
                    },
                }}
            >
                {dishes.map((el) => {
                    return <DishCard key={el.id} dish={el} />;
                })}
            </Stack>
        </Stack>
    );
};

export default MainPage;
