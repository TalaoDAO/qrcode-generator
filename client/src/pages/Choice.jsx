import React from 'react';
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button, Grid,FormControl} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';

function Choice({isLoggedIn = false}) {

    const [nextPage, setNextPage] = useState("#");

    const onChange = e => setNextPage({ [e.target.name]: e.target.value });    
    
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

    return (
        <>
        <Link to={"/"}><HomeButtonStyled variant="outlined">Home</HomeButtonStyled></Link>

        <Grid>
            <section className="page-content">
                <div className="container">
                    <div className="flux-box">
                        <div className="header">
                            <div className="row g-0">
                                <div className="col-12  left-content">
                                    <div className='voucher-form'>
                                        <FormControl>
                                            <h5>Please choose</h5>
                                            <RadioGroup
                                                row
                                                aria-labelledby="radio-group-label"
                                                name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel  name="next" onChange={onChange} value="voucher" control={<Radio />} label="Voucher" />
                                                <FormControlLabel  name="next" onChange={onChange} value="membership-card" control={<Radio />} label="Membership" />
                        
                                            </RadioGroup>
                                            <button className="active-btn" >
                                                <a href={nextPage.next}>Next</a>
                                            </button>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
</Grid>
        </>
    );
}

export default Choice;
