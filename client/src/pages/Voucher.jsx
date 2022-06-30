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

function Voucher() {
    const [blockchainAccountError, setBlockchainAccountError] = useState(null);
    const [voucher, setVoucher] = useState(null);
    const [formData, setFormData] = useState({
        voucherTemplate: "voucher-1",
        name: "",
        phone: "",
        email: "",
        pseudo: "",
        commission: "5",
        blockchain: "Tezos",
        blockchainAccount: "tz1",
        duration: "30",
    });
    const [qrUrl, setQRUrl] = useState('')

    const { name, phone, email, pseudo, commission, blockchain, blockchainAccount, duration } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const blockchainAccountOnChange = e =>  {
        if((blockchain === 'Ethereum' || blockchain === 'Polygone')  && e.target.value.length >= 2 && e.target.value.slice(0, 2) !== '0x'){
            console.log(e.target.value.length) 
            setBlockchainAccountError('Affiliate blockchain account should start with 0x');
        }else if(blockchain === 'Tezos'  && e.target.value.length >= 3 && (e.target.value.slice(0, 3) !== 'tz1' && e.target.value.slice(0, 3) !== 'tz2' && e.target.value.slice(0, 3) !== 'tz3') ){
            setBlockchainAccountError('Affiliate blockchain account should start with tz1, tz2 or tz3');
        }else{
            setBlockchainAccountError(null);
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (voucher) {
            setFormData({
                name: voucher.voucher.credentialSubject.affiliate.name,
                phone: voucher.voucher.credentialSubject.affiliate.pseudo,
                email: voucher.voucher.credentialSubject.affiliate.email,
                pseudo: voucher.voucher.credentialSubject.affiliate.phone,
                commission: voucher.voucher.credentialSubject.affiliate.benefit.incentiveCompensation,
                blockchain: voucher.voucher.credentialSubject.affiliate.paymentAccepted.blockchain,
                blockchainAccount: voucher.voucher.credentialSubject.affiliate.paymentAccepted.blockchainAccount,
                duration: voucher.voucher.credentialSubject.offers.duration,
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
            <Grid item xs={8}>
                <QRCodeContent voucher={voucher} getQRUrl={getQRUrl} qrUrl={qrUrl} isLoggedIn={true}/>
            </Grid>
            <Grid>
                <Grid item className={"left-content"}>

                    <form onSubmit={e => onSubmit(e)} className={"voucher-form"}>

                        <Typography variant={"h5"}>{`${voucher ? 'Update' : 'Create'} Voucher`}</Typography>
                        <FormControl fullWidth>
                            <InputLabel id="voucherTemplate-label">Voucher Template</InputLabel>

                            <Select
                                className={'voucher-form__select'}
                                labelId="voucherTemplate"
                                required
                                fullWidth
                                value={'voucher-1'}
                                name={"voucherTemplate"}
                                label="Voucher Template"
                                onChange={onChange}
                            >
                                <MenuItem value={'voucher-1'}>Voucher Template 1</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            required
                            fullWidth
                            label="Affiliate Name"
                            value={name}
                            name={"name"}
                            onChange={onChange}
                        />

                        <TextField
                            type={"email"}
                            required
                            fullWidth
                            label="Affiliate Email"
                            value={email}
                            name={"email"}
                            onChange={onChange}
                        />

                        <TextField
                            fullWidth
                            label="Affiliate Phone"
                            value={phone}
                            name={"phone"}
                            onChange={onChange}
                        />

                        <TextField
                            fullWidth
                            label="Affiliate Pseudo"
                            value={pseudo}
                            name={"pseudo"}
                            onChange={onChange}
                        />


                        <FormControl fullWidth>
                            <InputLabel id="Commission-label">Commission</InputLabel>
                            <Select
                                className={'commission-form__select'}
                                required
                                labelId="Commission-label"
                                fullWidth
                                value={commission}
                                name={"commission"}
                                label="Commission"
                                onChange={onChange}
                            >
                                <MenuItem value={"1%"}>1 %</MenuItem>
                                <MenuItem value={"2%"}>2 %</MenuItem>
                                <MenuItem value={"3%"}>3 %</MenuItem>
                                <MenuItem value={"4%"}>4 %</MenuItem>
                                <MenuItem value={"5%"}>5 %</MenuItem>
                                <MenuItem value={"6%"}> 6 %</MenuItem>
                                <MenuItem value={"7%"}> 7 %</MenuItem>
                                <MenuItem value={"8%"}> 8 %</MenuItem>
                                <MenuItem value={"9%"}> 9 %</MenuItem>
                                <MenuItem value={"10%"}> 10 %</MenuItem>
                                <MenuItem value={"11%"}> 11 %</MenuItem>
                                <MenuItem value={"12%"}> 12 %</MenuItem>
                                <MenuItem value={"13%"}> 13 %</MenuItem>
                                <MenuItem value={"14%"}> 14 %</MenuItem>
                                <MenuItem value={"15%"}> 15 %</MenuItem>
                                <MenuItem value={"16%"}> 16 %</MenuItem>
                                <MenuItem value={"17%"}> 17 %</MenuItem>
                                <MenuItem value={"18%"}> 18 %</MenuItem>
                                <MenuItem value={"19%"}> 19 %</MenuItem>
                                <MenuItem value={"20%"}> 20 %</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="blockchain-label">Affiliate Blockchain</InputLabel>
                            <Select
                                className={'blockchain-form__select'}
                                labelId="blockchain-label"
                                required
                                fullWidth
                                value={blockchain}
                                name={"blockchain"}
                                label="Affiliate Blockchain"
                                onChange={blockchainAccountOnChange}
                            >
                            <MenuItem value={"Tezos"}> Tezos </MenuItem>
                            <MenuItem value={"Ethereum"}> Ethereum </MenuItem>
                            <MenuItem value={"Polygone"}> Polygone </MenuItem>
                            </Select>
                        </FormControl>
                        
                        <TextField
                            fullWidth
                            label="Affiliate blockchain account"
                            value={blockchainAccount}
                            name={"blockchainAccount"}
                            error={blockchainAccountError}
                            helperText={blockchainAccountError}
                            onChange={blockchainAccountOnChange}
                        />
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

export default Voucher;