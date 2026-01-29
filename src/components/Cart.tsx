import { Box, Button, List, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../redux/store";
import type { RootState } from "../redux/store";
import CartItem from "./CartItem";
import { useEffect } from "react";
import {
    calculateTotal,
    switchModal,
} from "../redux/restaurantSlice/restaurantSlice";

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
                p: 1,
                width: "25%",
                height: "50%",
                border: "1px solid #E6E8F0",
                borderRadius: "16px",
                backgroundColor: "#FFFFFF",
                boxShadow: "0 12px 30px rgba(17, 24, 39, 0.08)",
                mt: 8,
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontSize: 18,
                    fontWeight: 900,
                    borderBottom: "1px solid #E6E8F0",
                }}
            >
                Корзина:
            </Typography>
            <Box
                sx={{
                    height: "185px",
                    overflow: "auto",
                    borderBottom: "1px solid #E6E8F0",
                    "&::-webkit-scrollbar": {
                        width: 8,
                    },
                    "&::-webkit-scrollbar-thumb": {
                        bgcolor: "#C9CEDA",
                        borderRadius: 8,
                    },
                }}
            >
                {cart.length ? (
                    <List>
                        {cart.map((item) => {
                            return <CartItem key={item.dish.id} item={item} />;
                        })}
                    </List>
                ) : (
                    <Typography
                        variant="body1"
                        sx={{
                            color: "#6B7280",
                            textAlign: "center",
                        }}
                    >
                        Пусто {":("}
                    </Typography>
                )}
            </Box>
            <Stack sx={{ p: 1, gap: "5px" }}>
                <Typography variant="h5" fontWeight={600}>
                    Доставка: {cart.length ? delivery : 0} тг
                </Typography>
                <Typography variant="h5" fontWeight={700}>
                    Общая сумма: {cart.length ? total : 0} тг
                </Typography>
                <Button
                    variant="outlined"
                    disabled={!cart.length}
                    sx={{
                        transition: "all 0.3s ease",
                    }}
                    onClick={() => dispatch(switchModal())}
                >
                    Заказать
                </Button>
            </Stack>
        </Box>
    );
};

export default Cart;
