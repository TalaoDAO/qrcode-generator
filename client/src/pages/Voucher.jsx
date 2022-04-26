import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import API from "../api";
import styled from "@emotion/styled";
import QRCodeContent from "../components/QRCodeContent";
import { Link } from "react-router-dom";

const ButtonStyled = styled(Button)({
    backgroundColor: "#923aff",
    borderColor: "#923aff",
    '&:hover': {
        backgroundColor: '#842cfd',
        borderColor: '#842cfd',
        boxShadow: 'none',
    },
});

const HomeButtonStyled = styled(Button)({
    borderColor: "#923aff",
    '&:hover': {
        backgroundColor: '#842cfd',
        borderColor: '#842cfd',
        boxShadow: 'none',
    },
    position: "absolute",
    right: 30,
    top: 30,
    color: "white",
});

function Voucher() {
    const [voucher, setVoucher] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        pseudo: "",
        socialNetwork: ""
    });
    const [qrUrl, setQRUrl] = useState('')

    const { name, phone, email, pseudo, socialNetwork } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        if (voucher) {
            setFormData({
                name: voucher.voucher.credentialSubject.affiliate.name,
                phone: voucher.voucher.credentialSubject.affiliate.pseudo,
                email: voucher.voucher.credentialSubject.affiliate.email,
                pseudo: voucher.voucher.credentialSubject.affiliate.phone,
                socialNetwork: voucher.voucher.credentialSubject.affiliate.socialNetwork,
            });
        }
    }, [voucher]);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {

            if (!voucher) {
                const res = await API.vouchers.addVoucher(formData);

                if (res.data.success) {
                    setVoucher(res.data.data);
                }

                return;
            }

            await API.vouchers.updateVoucher(voucher._id, formData);

        } catch (err) {
            console.log(err);
        }
    };

    const getQRUrl = async () => {
        try {
            if (voucher) {
                const res = await API.vouchers.getQRUrl(voucher._id);

                if (res.data.success) {
                    setQRUrl(res.data.data);
                }
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Link to={"/"}><HomeButtonStyled variant="outlined">Home</HomeButtonStyled></Link>

            <Grid container spacing={2}>
                <Grid item xs={4} className={"left-content"}>

                    <form onSubmit={e => onSubmit(e)} className={"voucher-form"}>
                        <Typography variant={"h5"}>{`${voucher ? 'Update' : 'Create'} Voucher`}</Typography>

                        <TextField
                            required
                            fullWidth
                            label="Name"
                            value={name}
                            name={"name"}
                            onChange={onChange}
                        />

                        <TextField
                            type={"email"}
                            required
                            fullWidth
                            label="Email"
                            value={email}
                            name={"email"}
                            onChange={onChange}
                        />

                        <TextField
                            fullWidth
                            label="Phone"
                            value={phone}
                            name={"phone"}
                            onChange={onChange}
                        />

                        <TextField
                            fullWidth
                            label="Pseudo"
                            value={pseudo}
                            name={"pseudo"}
                            onChange={onChange}
                        />

                        <TextField
                            fullWidth
                            label="Social Network"
                            value={socialNetwork}
                            name={"socialNetwork"}
                            onChange={onChange}
                        />

                        <ButtonStyled variant="contained" type={"submit"}>{voucher ? "Update" : "Save"}</ButtonStyled>

                    </form>

                </Grid>
                <Grid item xs={8}>
                    <QRCodeContent voucher={voucher} getQRUrl={getQRUrl} qrUrl={qrUrl} />
                </Grid>
            </Grid>
        </>
    );
}

export default Voucher;
