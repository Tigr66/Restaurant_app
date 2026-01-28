import { Box, CircularProgress, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../redux/store";
import { useEffect } from "react";
import { getDishesThunk } from "../redux/restaurantSlice/restaurantThunks";
import DishCard from "../components/DishCard";
import Cart from "../components/Cart";

const MainPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const dishes = useSelector((state: RootState) => state.restaurant.dishes);
    const isLoading = useSelector(
        (state: RootState) => state.restaurant.isLoading,
    );

    useEffect(() => {
        dispatch(getDishesThunk());
    }, []);

    return (
        <Stack direction="row" alignItems="flex-start" sx={{ gap: 2 }}>
            <Stack
                direction="column"
                alignItems="center"
                spacing={2}
                sx={{
                    height: "99vh",
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
                    borderRight: "2px solid black",
                }}
            >
                {isLoading ? (
                    <Box
                        sx={{
                            flex: 1,
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <CircularProgress size={60} />
                    </Box>
                ) : (
                    dishes.map((el) => {
                        return <DishCard key={el.id} dish={el} />;
                    })
                )}
            </Stack>
            <Cart />
        </Stack>
    );
};

export default MainPage;
