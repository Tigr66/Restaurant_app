import { Box, Button, List, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../redux/store";
import type { RootState } from "../redux/store";
import CartItem from "./CartItem";
import { useEffect } from "react";
import { calculateTotal } from "../redux/restaurantSlice/restaurantSlice";

const Cart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector((state: RootState) => state.restaurant.cart);
    const delivery = useSelector(
        (state: RootState) => state.restaurant.delivery,
    );
    const total = useSelector((state: RootState) => state.restaurant.total);

    useEffect(() => {
        dispatch(calculateTotal());
    }, [cart]);

    return (
        <Box
            sx={{
                border: "1px solid black",
                p: 1,
                width: "25%",
                height: "50%",
                borderRadius: "8px",
                mt: 3,
            }}
        >
            <Typography variant="h6" sx={{ borderBottom: "1px solid black" }}>
                Корзина:
            </Typography>
            <List
                sx={{
                    borderBottom: "1px solid black",
                    maxHeight: "185px",
                    overflow: "auto",
                    "&::-webkit-scrollbar": {
                        width: 8,
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#888",
                        borderRadius: 8,
                    },
                }}
            >
                {cart.map((item) => {
                    return <CartItem key={item.dish.id} item={item} />;
                })}
            </List>
            <Stack sx={{ p: 1, gap: "5px" }}>
                <Typography variant="h5">Доставка: {delivery}</Typography>
                <Typography variant="h5">Общая сумма: {total}</Typography>
                <Button variant="outlined">Заказать</Button>
            </Stack>
        </Box>
    );
};

export default Cart;
