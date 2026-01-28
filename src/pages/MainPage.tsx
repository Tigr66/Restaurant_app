import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../redux/store";
import { useEffect } from "react";
import { getDishesThunk } from "../redux/restaurantSlice/restaurantThunks";
import DishCard from "../components/DishCard";
import Cart from "../components/Cart";
import OrderModal from "../components/OrderModal";
import { clearMessages } from "../redux/restaurantSlice/restaurantSlice";

const MainPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const dishes = useSelector((state: RootState) => state.restaurant.dishes);
    const isLoading = useSelector(
        (state: RootState) => state.restaurant.isLoading,
    );
    const errorMessage = useSelector(
        (state: RootState) => state.restaurant.errorMessage,
    );
    const successMessage = useSelector(
        (state: RootState) => state.restaurant.successMessage,
    );

    useEffect(() => {
        dispatch(getDishesThunk());
    }, []);

    return (
        <>
            {errorMessage !== "" && (
                <Alert
                    severity="error"
                    variant="filled"
                    onClose={() => {
                        dispatch(clearMessages());
                    }}
                >
                    {errorMessage}
                </Alert>
            )}
            {successMessage !== "" && (
                <Alert
                    severity="success"
                    variant="filled"
                    onClose={() => {
                        dispatch(clearMessages());
                    }}
                >
                    {successMessage}
                </Alert>
            )}
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
                    {isLoading || !dishes.length ? (
                        <Box
                            sx={{
                                flex: 1,
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {isLoading ? (
                                <CircularProgress size={60} />
                            ) : (
                                <Typography variant="h4">
                                    Не получилось получить блюда {":("}
                                </Typography>
                            )}
                        </Box>
                    ) : (
                        dishes.map((el) => {
                            return <DishCard key={el.id} dish={el} />;
                        })
                    )}
                </Stack>
                <Cart />
                <OrderModal />
            </Stack>
        </>
    );
};

export default MainPage;
