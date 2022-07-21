import * as React from "react";
import { useEffect, useState } from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import API from "../api";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { AGORA_KEY } from "../utils";

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

function MobileVoucher() {
    const [voucher, setVoucher] = useState(null);
    const [formData, setFormData] = useState({
        duration: "30",
        type: AGORA_KEY
    });

    const { duration } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        (async function getVoucherData() {
            await getVoucher(AGORA_KEY);
        })();
    }, [])

    useEffect(() => {
        if (voucher) {
            setFormData({
                ...formData,
                duration: voucher.voucher.credentialSubject.duration,
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

    return (
        <>
            <Link to={"/choice"}><HomeButtonStyled variant="outlined">Home</HomeButtonStyled></Link>
            <Grid>
                <Grid item className={"left-content"}>

                    <form onSubmit={e => onSubmit(e)} className={"voucher-form"}>

                        <Typography variant={"h5"}>{`${voucher ? 'Update' : 'Create'} Agora Pass`}</Typography>

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

                        <ButtonStyled variant="contained" type={"submit"}>{voucher ? "Update" : "Save"}</ButtonStyled>

                    </form>

                </Grid>
            </Grid>
        </>
    );
}

export default MobileVoucher;
