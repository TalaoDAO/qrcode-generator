import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Grid, Typography, Select, MenuItem, InputLabel,FormControl} from "@mui/material";
import API from "../api";
import styled from "@emotion/styled";
import QRCodeContent from "../components/QRCodeContent";
import { Link, useLocation } from "react-router-dom";
import { MEMBERSHIP_KEY } from "../utils";

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



function MembershipCard() {
    const [voucher, setVoucher] = useState(null);
    const [qrUrl, setQRUrl] = useState('')
    const [formData, setFormData] = useState({
        duration: 360,
        value: 60,
        currency: "USD",
        discount: "15%",
        type: MEMBERSHIP_KEY,
    });
    const location = useLocation();

    const {  duration, currency, value, discount } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        const query = new URLSearchParams(location?.search);
        const id = query.get("id");

        if (id) {
            (async function getVoucherData() {
                await getVoucher(id);
            })();
        }
    }, [])

    useEffect(() => {
        if (voucher) {
            setFormData({
                ...formData,
                currency: voucher.voucher.credentialSubject.offers[0].cardPrice.currency,
                value: voucher.voucher.credentialSubject.offers[0].cardPrice.value,
                duration: voucher.voucher.credentialSubject.offers[0].duration,
                discount: voucher.voucher.credentialSubject.offers[0].benefit.discount,
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
                const res = await API.vouchers.getQRUrl(voucher._id, MEMBERSHIP_KEY);

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
                <QRCodeContent voucher={voucher} getQRUrl={getQRUrl} qrUrl={qrUrl} isLoggedIn={true} isCenter={false}/>
            </Grid>
            <Grid>
                <Grid item className={"left-content"}>

                    <form onSubmit={e => onSubmit(e)} className={"voucher-form"}>

                        <Typography variant={"h5"}>{`${voucher ? 'Update' : 'Create'} Membership Card`}</Typography>

                        <FormControl fullWidth>
                            <InputLabel id="voucherDuration-label">Membership Card Duration</InputLabel>
                            <Select
                              className={'voucherDuration-form__select'}
                              required
                              labelId="voucherDuration-label"
                              fullWidth
                              value={duration}
                              name={"duration"}
                              label="voucherDuration"
                              onChange={onChange}
                            >
                                <MenuItem value={30}>30</MenuItem>
                                <MenuItem value={60}>60</MenuItem>
                                <MenuItem value={90}>90</MenuItem>
                                <MenuItem value={180}>180</MenuItem>
                                <MenuItem value={270}>270</MenuItem>
                                <MenuItem value={360}>360</MenuItem>
                                <MenuItem value={720}>720</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="voucherPrice-label">Membership Card Price</InputLabel>
                            <Select
                                className={'voucherPrice-form__select'}
                                required
                                labelId="voucherPrice-label"
                                fullWidth
                                value={value}
                                name={"value"}
                                label="voucherPrice"
                                onChange={onChange}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={15}>15</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={25}>25</MenuItem>
                                <MenuItem value={30}>30</MenuItem>
                                <MenuItem value={35}>35</MenuItem>
                                <MenuItem value={40}>40</MenuItem>
                                <MenuItem value={45}>45</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={55}>55</MenuItem>
                                <MenuItem value={60}>60</MenuItem>
                                <MenuItem value={65}>65</MenuItem>
                                <MenuItem value={70}>70</MenuItem>
                                <MenuItem value={75}>75</MenuItem>
                                <MenuItem value={80}>80</MenuItem>
                                <MenuItem value={85}>85</MenuItem>
                                <MenuItem value={90}>90</MenuItem>
                                <MenuItem value={95}>95</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="voucherCurrency-label">Membership Card Currency</InputLabel>
                            <Select
                                className={'voucherCurrency-form__select'}
                                labelId="voucherCurrency-label"
                                required
                                fullWidth
                                value={currency}
                                name={"currency"}
                                label="Membership Card Currency"
                                onChange={onChange}
                            >
                            <MenuItem value={"EUR"}> EUR </MenuItem>
                            <MenuItem value={"USD"}> USD </MenuItem>
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

export default MembershipCard;
