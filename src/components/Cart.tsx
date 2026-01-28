import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../redux/store";
import type { RootState } from "../redux/store";
import { deleteFromCart } from "../redux/restaurantSlice/restaurantSlice";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";

const Cart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector((state: RootState) => state.restaurant.cart);

    return (
        <Box
            sx={{
                border: "1px solid black",
                p: 1,
            }}
        >
            <List>
                {cart.map((el) => {
                    return (
                        <ListItem
                            key={el.dish.id}
                            secondaryAction={
                                <IconButton
                                    aria-label="Отнять одно"
                                    onClick={() =>
                                        dispatch(deleteFromCart(el.dish.id))
                                    }
                                >
                                    <RemoveSharpIcon color="primary" />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary={el.dish.name}
                                secondary={`x${el.count}`}
                            />
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
};

export default Cart;
