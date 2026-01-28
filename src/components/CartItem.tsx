import {
    IconButton,
    ListItem,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import type { ICartDish } from "../interfaces/ICartDish";
import type { AppDispatch } from "../redux/store";
import { deleteFromCart } from "../redux/restaurantSlice/restaurantSlice";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import { useDispatch } from "react-redux";

interface CartItemProps {
    item: ICartDish;
}

const CartItem = ({ item }: CartItemProps) => {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <ListItem
            sx={{
                width: "90%",
                justifyContent: "space-between",
            }}
        >
            <Stack
                direction="row"
                sx={{
                    width: "70%",
                }}
            >
                <ListItemText primary={`${item.dish.name} x${item.count}`} />
                <IconButton
                    aria-label="Отнять одно"
                    onClick={() => dispatch(deleteFromCart(item.dish))}
                >
                    <RemoveSharpIcon color="error" />
                </IconButton>
            </Stack>
            <Typography variant="body1">{`${item.total} тг.`}</Typography>
        </ListItem>
    );
};

export default CartItem;
