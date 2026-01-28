import { Button, Modal, Stack, TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import useModal from "../hooks/useModal";

const OrderModal = () => {
    const {
        name,
        phone,
        address,
        errors,
        isModal,
        setModal,
        handleSetName,
        handleSetPhone,
        handleSetAddress,
        makeOrder,
    } = useModal();

    return (
        <Modal open={isModal} onClose={setModal}>
            <Stack
                spacing={2}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "white",
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 24,
                }}
            >
                <TextField
                    required
                    type="text"
                    value={name}
                    onChange={handleSetName}
                    label="Имя"
                    error={errors.nameError}
                    helperText={errors.nameError ? "Введите имя" : " "}
                />
                <MuiTelInput
                    required
                    label="Телефон"
                    value={phone}
                    onChange={handleSetPhone}
                    defaultCountry="KZ"
                    onlyCountries={["KZ"]}
                    disableDropdown
                    forceCallingCode
                    error={errors.phoneError}
                    helperText={
                        errors.phoneError ? "Введите корректный телефон" : " "
                    }
                />
                <TextField
                    required
                    type="text"
                    value={address}
                    onChange={handleSetAddress}
                    label="Адрес"
                    error={errors.addressError}
                    helperText={
                        errors.addressError ? "Введите адрес подробнее" : " "
                    }
                />
                <Button variant="contained" onClick={makeOrder}>
                    Заказать
                </Button>
            </Stack>
        </Modal>
    );
};

export default OrderModal;
