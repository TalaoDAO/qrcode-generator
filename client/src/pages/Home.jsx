import * as React from "react";
import { useState } from "react";
import QRCodeContent from "../components/QRCodeContent";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ButtonStyled = styled(Button)({
  borderColor: "#923aff",
  '&:hover': {
    backgroundColor: '#842cfd',
    borderColor: '#842cfd',
    boxShadow: 'none',
  },
  position: "absolute",
  right: 30,
  top: 30,
  color: "white"
});

function Home() {
  const [qrUrl, setQRUrl] = useState('')

  const getQRUrl = async () => {

  }

  return (
    <>
      <Link to={"/voucher"}><ButtonStyled variant="outlined">Create Voucher</ButtonStyled></Link>

      <QRCodeContent qrUrl={qrUrl} getQRUrl={getQRUrl} isButtonWithoutVoucher={true} />
    </>
  );
}

export default Home;
