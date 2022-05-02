import * as React from "react";
import { useEffect, useState } from "react";
import QRCodeContent from "../components/QRCodeContent";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import API, { SOCKET_URL } from "../api";
import socketIOClient from 'socket.io-client';

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
  const socket = socketIOClient(SOCKET_URL);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('authorised', function (isAuthorized) {
      setLoggedIn(isAuthorized)
    })
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/voucher');
    }
  }, [isLoggedIn])

  const getQRUrl = async () => {
    try {
      const res = await API.qrcode.getQRCodeUrl();

      if (res.data.success) {
        setQRUrl(res.data.data.url);
        const sessionId = res.data.data.session_id
        localStorage.setItem('token', sessionId)
        localStorage.setItem('issuer', res.data.data.issuer)
        setInterval(function(){
          socket.emit('check-status', sessionId)
        }, 2000);
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {/*<Link to={"/voucher"}><ButtonStyled variant="outlined">Create Voucher</ButtonStyled></Link>*/}

      <QRCodeContent qrUrl={qrUrl} getQRUrl={getQRUrl} isButtonWithoutVoucher={true} />
    </>
  );
}

export default Home;
