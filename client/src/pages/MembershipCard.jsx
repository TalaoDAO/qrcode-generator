import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography, Select, MenuItem, InputLabel,FormControl} from "@mui/material";
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



function MembershipCard() {
    const [membershipCard, setMembershipCard] = useState(null);
    const [qrUrl, setQRUrl] = useState('')
    const [formData, setFormData] = useState({
        duration: "",
        value: 60,
        currency: "USD"
    });

    const {  duration, currency, value } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


    useEffect(() => {
        if (membershipCard) {
            setFormData({
                currency: membershipCard.voucher.credentialSubject.offers.cardPrice.currency,
                value: membershipCard.voucher.credentialSubject.offers.cardPrice.value,
                duration: membershipCard.voucher.credentialSubject.offers.duration,
            });
        }
    }, [membershipCard]);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {

            if (!membershipCard) {
                
                const res = await API.membershipCards.addMembershipCard(formData);

                if (res.data.success) {
                    setMembershipCard(res.data.data);
                }

                return;
            }

            await API.membershipCards.updateMembershipCard(membershipCard._id, formData);

        } catch (err) {
            console.log(err);
        }
    };


    const getQRUrl = async () => {
        try {
            if (membershipCard) {
                const res = await API.membershipCards.getQRUrl(membershipCard._id);

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
            <Grid item xs={8}>
                <QRCodeContent voucher={membershipCard} getQRUrl={getQRUrl} qrUrl={qrUrl} isLoggedIn={true}/>
            </Grid>
            <Grid>
                <Grid item className={"left-content"}>

                    <form onSubmit={e => onSubmit(e)} className={"voucher-form"}>

                        <Typography variant={"h5"}>{`${membershipCard ? 'Update' : 'Create'} Membership Card`}</Typography>

                        <TextField
                            type={"text"}
                            required
                            fullWidth
                            label="Membership Card duration"
                            value={duration}
                            name={"duration"}
                            onChange={onChange}
                        />

                        <FormControl fullWidth>
                            <InputLabel id="membershipCardPrice-label">Membership Card Price</InputLabel>
                            <Select
                                className={'membershipCardPrice-form__select'}
                                required
                                labelId="membershipCardPrice-label"
                                fullWidth
                                value={value}
                                name={"value"}
                                label="membershipCardPrice"
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
                            <InputLabel id="membershipCardCurrency-label">Membership Card Currency</InputLabel>
                            <Select
                                className={'membershipCardCurrency-form__select'}
                                labelId="membershipCardCurrency-label"
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
                        <ButtonStyled variant="contained" type={"submit"}>{membershipCard ? "Update" : "Save"}</ButtonStyled>

                    </form>

                </Grid>
            </Grid>
        </>
    );
}

export default MembershipCard;