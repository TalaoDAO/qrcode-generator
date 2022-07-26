import * as React from "react";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import MaterialTable from "material-table";
import { Button, createTheme, ThemeProvider } from '@mui/material';
import API from "../api";
import { ARAGO_KEY, VOUCHER_MOBILE_KEY } from "../utils";

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

    const navigateToVoucher = (id, type) => {
        if (type === VOUCHER_MOBILE_KEY || type === ARAGO_KEY) {
            navigate(`/${type}`);
        } else {
            navigate({
                pathname: `/${type}`,
                search: `?id=${id}`
            });
        }
    }

    const tableColumns = [
        {
            title: 'Name', field: 'voucher.credentialSubject.affiliate.name'
        },
        {
            title: 'Pseudo', field: 'voucher.credentialSubject.affiliate.pseudo'
        },
        {
            title: 'Email', field: 'voucher.credentialSubject.affiliate.email'
        },
        {
            title: 'Phone', field: 'voucher.credentialSubject.affiliate.phone'
        },
        {
            title: 'Commission',
            field: 'voucher.credentialSubject.affiliate.benefit.incentiveCompensation',
            type: 'numeric'
        },
        {
            title: 'Blockchain', field: 'voucher.credentialSubject.affiliate.paymentAccepted.blockchain'
        },
        {
            title: 'Blockchain Account', field: 'voucher.credentialSubject.affiliate.paymentAccepted.blockchainAccount'
        },
        {
            title: 'Duration', field: 'voucher.credentialSubject.offers[0].duration', type: 'numeric'
        },
        {
            title: 'Reward', field: 'voucher.credentialSubject.offers[0].benefit.discount', type: 'numeric'
        },
        {
            title: 'Type', field: 'voucher.type[1]'
        },
    ]

    return (
        <>
            <Link to={"/choice"}><HomeButtonStyled variant="outlined">Home</HomeButtonStyled></Link>

            <div className="vouchers-table">
                <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                        title="Vouchers & Membership Cards"
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
                            // {
                            //     icon: 'add',
                            //     isFreeAction: true,
                            //     tooltip: 'Create',
                            //     onClick: () => navigate('/voucher')
                            // }
                        ]}
                        onRowClick={(event, rowData) => navigateToVoucher(rowData._id, rowData.type)}
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
