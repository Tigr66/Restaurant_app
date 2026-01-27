import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Tooltip,
    Typography,
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
            }}
        >
            <CardMedia
                sx={{ height: "100%", width: "50%", borderRadius: "8px" }}
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
                <Typography variant="h5" fontSize="2rem">
                    {dish.name}
                </Typography>
                <Typography variant="body2" fontSize="1.2rem">
                    {dish.price} тг.
                </Typography>
            </CardContent>
            <CardActions>
                {count ? (
                    <>
                        <IconButton
                            onClick={() => dispatch(deleteFromCart(dish.id))}
                        >
                            <RemoveSharpIcon
                                sx={{
                                    color: "#0080E6",
                                }}
                            />
                        </IconButton>
                        <Typography>{count}</Typography>
                        <IconButton onClick={() => dispatch(addToCart(dish))}>
                            <AddSharpIcon
                                sx={{
                                    color: "#0080E6",
                                }}
                            />
                        </IconButton>
                    </>
                ) : (
                    <Tooltip title="Добавить в корзину">
                        <IconButton onClick={() => dispatch(addToCart(dish))}>
                            <ShoppingCartRoundedIcon
                                sx={{
                                    width: "40px",
                                    height: "40px",
                                    color: "#0080E6",
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
