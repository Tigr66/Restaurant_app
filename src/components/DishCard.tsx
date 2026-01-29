import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Tooltip,
    Typography,
    type SxProps,
    type Theme,
} from "@mui/material";
import type { IDish } from "../interfaces/IDish";
import { type AppDispatch, type RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart,
    deleteFromCart,
} from "../redux/restaurantSlice/restaurantSlice";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";

interface DishCardProps {
    dish: IDish;
}

export const iconStyles: SxProps<Theme> = {
    width: 38,
    height: 38,
    borderRadius: "12px",
    border: "1px solid #E6E8F0",
    backgroundColor: "#FFFFFF",
    "&:hover": { backgroundColor: "#F1F5F9" },
    "&:active": { transform: "scale(0.96)" },
};

const DishCard = ({ dish }: DishCardProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector((state: RootState) => state.restaurant.cart);

    const cartItem = cart.find((el) => el.dish.id === dish.id);
    const count = cartItem?.count ?? 0;

    return (
        <Card
            sx={{
                display: "flex",
                padding: 1,
                width: "90%",
                minHeight: "230px",
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 14px 40px rgba(0,0,0,0.10)",
                },
            }}
        >
            <CardMedia
                sx={{
                    height: "100%",
                    width: "50%",
                    borderRadius: "14px",
                    border: "1px solid rgba(0,0,0,0.06)",
                }}
                component="img"
                src={dish.image}
                alt={dish.name}
                loading="lazy"
            />
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "30%",
                    gap: 2,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ fontSize: 24, fontWeight: 800, color: "#121826" }}
                >
                    {dish.name}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        mt: 0.75,
                        fontSize: 18,
                        fontWeight: 800,
                        color: "#121826",
                    }}
                >
                    {dish.price} тг
                </Typography>
            </CardContent>
            <CardActions>
                {count ? (
                    <>
                        <IconButton
                            aria-label="Отнять одно"
                            onClick={() => dispatch(deleteFromCart(dish))}
                            sx={iconStyles}
                        >
                            <RemoveSharpIcon color="primary" />
                        </IconButton>
                        <Typography fontSize="1.5rem">{count}</Typography>
                        <IconButton
                            aria-label="Добавить ещё одно"
                            onClick={() => dispatch(addToCart(dish))}
                            sx={iconStyles}
                        >
                            <AddSharpIcon color="primary" />
                        </IconButton>
                    </>
                ) : (
                    <Tooltip title="Добавить в корзину">
                        <IconButton
                            aria-label="Добавить в корзину"
                            onClick={() => dispatch(addToCart(dish))}
                        >
                            <ShoppingCartRoundedIcon
                                sx={{
                                    width: "40px",
                                    height: "40px",
                                    "&:hover": {
                                        color: "#0080E6",
                                    },
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                )}
            </CardActions>
        </Card>
    );
};

export default DishCard;
