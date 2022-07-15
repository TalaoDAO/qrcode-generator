import * as React from "react";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import MaterialTable from "material-table";
import { Button, createTheme, TextField, ThemeProvider } from '@mui/material';
import API from "../api";

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

function Vouchers() {
    const defaultMaterialTheme = createTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [vouchers, setVouchers] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        (async function getAllVouchers() {
            await getVouchers();
        })();
    }, [])

    const getVouchers = async () => {
        setIsLoading(true)
        try {
            const res = await API.vouchers.getVouchers();
            if (res.data.success) {
                setVouchers(res.data.data);
                setIsLoading(false)
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false)
        }
    }

    const deleteVoucher = async (id) => {
        setIsLoading(true)
        try {
            const res = await API.vouchers.deleteVoucher(id);
            if (res.data.success) {
                await getVouchers();
                setIsLoading(false)
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false)
        }
    }

    const updateVoucher = async (id, data) => {
        setIsLoading(true)
        try {
            console.log(data)
            const newData = {
                name: data.voucher.credentialSubject.affiliate.name,
                pseudo: data.voucher.credentialSubject.affiliate.pseudo,
                email: data.voucher.credentialSubject.affiliate.email,
                phone: data.voucher.credentialSubject.affiliate.phone,
                incentiveCompensation: data.voucher.credentialSubject.affiliate.benefit.incentiveCompensation,
                blockchain: data.voucher.credentialSubject.affiliate.paymentAccepted.blockchain,
                blockchainAccount: data.voucher.credentialSubject.affiliate.paymentAccepted.blockchainAccount,
                duration: data.voucher.credentialSubject.offers[0].duration,
                discount: data.voucher.credentialSubject.offers[0].discount,
            }

            const res = await API.vouchers.updateVoucher(id, newData);
            if (res.data.success) {
                await getVouchers();
                setIsLoading(false)
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false)
        }
    }

    const navigateToVoucher = (id) => {
        navigate({
            pathname: '/voucher',
            search: `?id=${id}`
        });
    }

    const tableColumns = [
        {
            title: 'Name', field: 'voucher.credentialSubject.affiliate.name',
            editComponent: props => (
                <TextField
                    variant="standard"
                    value={props.value}
                    onChange={e => props.onChange(e.target.value)}
                />
            )
        },
        {
            title: 'Pseudo', field: 'voucher.credentialSubject.affiliate.pseudo',
            editComponent: props => (
                <TextField
                    variant="standard"
                    value={props.value}
                    onChange={e => props.onChange(e.target.value)}
                />
            )
        },
        {
            title: 'Email', field: 'voucher.credentialSubject.affiliate.email',
            editComponent: props => (
                <TextField
                    variant="standard"
                    value={props.value}
                    onChange={e => props.onChange(e.target.value)}
                />
            )
        },
        {
            title: 'Phone', field: 'voucher.credentialSubject.affiliate.phone',
            editComponent: props => (
                <TextField
                    variant="standard"
                    value={props.value}
                    onChange={e => props.onChange(e.target.value)}
                />
            )
        },
        {
            title: 'Commission',
            field: 'voucher.credentialSubject.affiliate.benefit.incentiveCompensation',
            type: 'numeric',
            editComponent: props => (
                <TextField
                    variant="standard"
                    value={props.value}
                    onChange={e => props.onChange(e.target.value)}
                />
            )
        },
        {
            title: 'Blockchain', field: 'voucher.credentialSubject.affiliate.paymentAccepted.blockchain',
            editComponent: props => (
                <TextField
                    variant="standard"
                    value={props.value}
                    onChange={e => props.onChange(e.target.value)}
                />
            )
        },
        {
            title: 'Blockchain Account', field: 'voucher.credentialSubject.affiliate.paymentAccepted.blockchainAccount',
            editComponent: props => (
                <TextField
                    variant="standard"
                    value={props.value}
                    onChange={e => props.onChange(e.target.value)}
                />
            )
        },
        {
            title: 'Duration', field: 'voucher.credentialSubject.offers[0].duration', type: 'numeric',
            editComponent: props => (
                <TextField
                    variant="standard"
                    value={props.value}
                    onChange={e => props.onChange(e.target.value)}
                />
            )
        },
        {
            title: 'Discount', field: 'voucher.credentialSubject.offers[0].benefit.discount', type: 'numeric',
            editComponent: props => (
                <TextField
                    variant="standard"
                    value={props.value}
                    onChange={e => props.onChange(e.target.value)}
                />
            )
        },
    ]

    return (
        <>
            <Link to={"/"}><HomeButtonStyled variant="outlined">Home</HomeButtonStyled></Link>

            <div className="vouchers-table">
                <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                        title="Vouchers"
                        columns={tableColumns}
                        data={vouchers}
                        isLoading={isLoading}
                        options={{
                            padding: "default",
                            pageSize: 10,
                            actionsColumnIndex: -1,
                            columnResizable: true,
                            pageSizeOptions: [10, 25, 50],
                            showFirstLastPageButtons: true,
                        }}
                        actions={[
                            {
                                icon: 'refresh',
                                isFreeAction: true,
                                tooltip: 'Refresh',
                                onClick: () => getVouchers()
                            },
                            {
                                icon: 'add',
                                isFreeAction: true,
                                tooltip: 'Create',
                                onClick: () => navigate('/voucher')
                            }
                        ]}
                        onRowClick={(event, rowData) => navigateToVoucher(rowData._id)}
                        editable={{
                            onRowDelete: oldData =>
                                new Promise((resolve) => {
                                    setTimeout(async () => {
                                        await deleteVoucher(oldData._id)
                                        resolve();
                                    }, 1000);
                                })
                        }}
                    />
                </ThemeProvider>
            </div>
        </>
    );
}

export default Vouchers;
