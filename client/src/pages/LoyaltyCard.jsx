import * as React from "react";
import { useEffect, useState } from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import API from "../api";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { LOYALTY_CARD } from "../utils";
import QRCodeContent from "../components/QRCodeContent";

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

function LoyaltyCard() {
    const [voucher, setVoucher] = useState(null);
    const [qrUrl, setQRUrl] = useState('')
    const [formData, setFormData] = useState({
        name: "Altme",
        email: "contact@altme.io",
        duration: "30",
        discount: "15%",
        type: LOYALTY_CARD
    });

    const { duration, discount } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        (async function getVoucherData() {
            await getVoucher(LOYALTY_CARD);
        })();
    }, [])

    useEffect(() => {
        if (voucher) {
            setFormData({
                ...formData,
                name: voucher.voucher.credentialSubject.affiliate.name,
                email: voucher.voucher.credentialSubject.affiliate.email,
                duration: voucher.voucher.credentialSubject.offers.duration,
                discount: voucher.voucher.credentialSubject.offers.benefit.discount,
            });
        }
    }, [voucher]);

    const getVoucher = async (id) => {
        try {
            const res = await API.vouchers.getVoucher(id);
            if (res.data.success) {
                setVoucher(res.data.voucher);
            }
        } catch (err) {
            console.log(err);
        }
    };

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
                const res = await API.vouchers.getQRUrl(voucher._id, LOYALTY_CARD);

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
            <Link to={"/choice"}><HomeButtonStyled variant="outlined">Home</HomeButtonStyled></Link>
            <Grid item xs={8}>
                <QRCodeContent voucher={voucher} getQRUrl={getQRUrl} qrUrl={qrUrl} isLoggedIn={true} isCenter={false} isCopy={false}/>
            </Grid>
            <Grid>
                <Grid item className={"left-content"}>

                    <form onSubmit={e => onSubmit(e)} className={"voucher-form"}>

                        <Typography variant={"h5"}>{`${voucher ? 'Update' : 'Create'} Loyalty Card`}</Typography>

                        <FormControl fullWidth>
                            <InputLabel id="duration-label">Voucher Duration</InputLabel>

                            <Select
                                className={'blockchain-form__select'}
                                labelId="duration-label"
                                required
                                fullWidth
                                value={duration}
                                name={"duration"}
                                label="Voucher Duration"
                                onChange={onChange}
                            >
                                <MenuItem value={7}> 7 </MenuItem>
                                <MenuItem value={10}> 10 </MenuItem>
                                <MenuItem value={20}> 20 </MenuItem>
                                <MenuItem value={30}> 30 </MenuItem>
                                <MenuItem value={40}> 40 </MenuItem>
                                <MenuItem value={45}> 45 </MenuItem>
                                <MenuItem value={60}> 60 </MenuItem>
                                <MenuItem value={75}> 75 </MenuItem>
                                <MenuItem value={90}> 90 </MenuItem>
                                <MenuItem value={120}> 120 </MenuItem>
                                <MenuItem value={180}> 180 </MenuItem>
                                <MenuItem value={365}> 365 </MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="discount-label">Gamer Reward</InputLabel>

                            <Select
                                className={'blockchain-form__select'}
                                labelId="discount-label"
                                required
                                fullWidth
                                value={discount}
                                name={"discount"}
                                label="Gamer Reward"
                                onChange={onChange}
                            >
                                <MenuItem value={"5%"}>5 %</MenuItem>
                                <MenuItem value={"10%"}>10 %</MenuItem>
                                <MenuItem value={"15%"}>15 %</MenuItem>
                                <MenuItem value={"20%"}>20 %</MenuItem>
                                <MenuItem value={"25%"}>25 %</MenuItem>
                                <MenuItem value={"30%"}>30 %</MenuItem>
                                <MenuItem value={"35%"}>35 %</MenuItem>
                                <MenuItem value={"40%"}>40 %</MenuItem>
                                <MenuItem value={"45%"}>45 %</MenuItem>
                                <MenuItem value={"50%"}>50 %</MenuItem>
                            </Select>
                        </FormControl>
                        <ButtonStyled variant="contained" type={"submit"}>{voucher ? "Update" : "Save"}</ButtonStyled>

                    </form>

                </Grid>
            </Grid>
        </>
    );
}

export default LoyaltyCard;
