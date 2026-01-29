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
                width: "98%",
                display: "flex",
                justifyContent: "space-between",
                borderRadius: "12px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #E6E8F0",
                mb: "4px",
                "&:hover": { backgroundColor: "#F9FAFB" },
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
                    sx={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        border: "1px solid #E6E8F0",
                        backgroundColor: "#FFFFFF",
                        "&:hover": { backgroundColor: "#F1F5F9" },
                        "&:active": { transform: "scale(0.96)" },
                    }}
                >
                    <RemoveSharpIcon color="error" />
                </IconButton>
            </Stack>
            <Typography variant="body1">{`${item.total} тг`}</Typography>
        </ListItem>
    );
};

export default CartItem;
