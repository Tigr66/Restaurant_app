import { useEffect, useState } from "react";
import type { IInputsErrors } from "../interfaces/IInputErrors";
import { matchIsValidTel } from "mui-tel-input";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { setOrderThunk } from "../redux/restaurantSlice/restaurantThunks";
import { switchModal } from "../redux/restaurantSlice/restaurantSlice";

const useModal = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    const isModal = useSelector((state: RootState) => state.restaurant.isModal);
    const isSending = useSelector(
        (state: RootState) => state.restaurant.isSending,
    );
    const cart = useSelector((state: RootState) => state.restaurant.cart);

    const [errors, setErrors] = useState<IInputsErrors>({
        nameError: false,
        phoneError: false,
        addressError: false,
    });

    const resetErrors = () => {
        setErrors({ nameError: false, phoneError: false, addressError: false });
    };

    const makeOrder = () => {
        const nameError: boolean = name.trim() === "";
        const phoneError: boolean = !matchIsValidTel(phone);
        const addressError: boolean = address.trim().length < 8;

        if (nameError || phoneError || addressError) {
            setErrors({ nameError, phoneError, addressError });
            return;
        }

        dispatch(setOrderThunk({ name, phone, address, order: cart }))
            .unwrap()
            .then(() => {
                setName("");
                setPhone("");
                setAddress("");
                resetErrors();
            });
    };

    const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleSetPhone = (newValue: string) => {
        setPhone(newValue);
    };

    const handleSetAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const setModal = () => {
        dispatch(switchModal());
    };

    useEffect(() => {
        resetErrors();
    }, [isModal]);

    return {
        name,
        phone,
        address,
        errors,
        isSending,
        isModal,
        setModal,
        handleSetName,
        handleSetPhone,
        handleSetAddress,
        makeOrder,
    };
};

export default useModal;
