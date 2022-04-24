import * as React from "react";
import { useEffect, useState } from "react";
import AppQrCode from "../components/AppQrCode";
import { Button, Grid, TextField } from "@mui/material";
import API from "../api";
import styled from "@emotion/styled";
import Swal from "sweetalert2";

const ButtonStyled = styled(Button)({
  backgroundColor: "#923aff",
  borderColor: "#923aff",
  '&:hover': {
    backgroundColor: '#842cfd',
    borderColor: '#842cfd',
    boxShadow: 'none',
  },
});

function Home() {
  const [voucher, setVoucher] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pseudo: "",
    socialNetwork: ""
  });
  const [qrUrl, setQRUrl] = useState('')

  const { name, phone, email, pseudo, socialNetwork } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (voucher) {
      setFormData({
        name: voucher.voucher.credentialSubject.affiliate.name,
        phone: voucher.voucher.credentialSubject.affiliate.pseudo,
        email: voucher.voucher.credentialSubject.affiliate.email,
        pseudo: voucher.voucher.credentialSubject.affiliate.phone,
        socialNetwork: voucher.voucher.credentialSubject.affiliate.socialNetwork,
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
      <Grid container spacing={2}>
        <Grid item xs={4} className={"left-content"}>

          <form onSubmit={e => onSubmit(e)} className={"voucher-form"}>

            <TextField
              required
              fullWidth
              label="Name"
              value={name}
              name={"name"}
              onChange={onChange}
            />

            <TextField
              type={"email"}
              required
              fullWidth
              label="Email"
              value={email}
              name={"email"}
              onChange={onChange}
            />

            <TextField
              fullWidth
              label="Phone"
              value={phone}
              name={"phone"}
              onChange={onChange}
            />

            <TextField
              fullWidth
              label="Pseudo"
              value={pseudo}
              name={"pseudo"}
              onChange={onChange}
            />

            <TextField
              fullWidth
              label="Social Network"
              value={socialNetwork}
              name={"socialNetwork"}
              onChange={onChange}
            />

            <ButtonStyled variant="contained" type={"submit"}>{voucher ? "Update" : "Save"}</ButtonStyled>

          </form>

        </Grid>
        <Grid item xs={8}>
          <section className="page-content">
            <div className="container">
              <div className="flux-box">
                <div className="header">
                  <div className="row g-0">
                    <div className="col-12 text-center">
                      <img src="assets/img/logo-tezotopia-desktop.png" alt="flux" />
                    </div>
                  </div>
                </div>
                <div className="body-text">
                  <div className="row align-items-center g-0">
                    <div className="col-3">
                      <div className="left-character-img">
                        <img src="assets/img/unit-left-tablet.png" alt="" />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="offer-text text-center">
                        <h1>
                          5% discount{" "}
                          <span className="d-block text-white">
                        on NFTs<span>*</span>
                      </span>
                        </h1>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="right-character-img">
                        <img src="assets/img/unit-right-tablet.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="icon-area d-flex text-center">
                  <div className="icon-box icon-box-1">
                    <div className="icon">
                      <img src="assets/img/ic-scan-qr-code.svg" alt="" />
                    </div>
                    <div className="icon-text">
                      <p>
                        <span>1.</span> Scan the QR code
                        <br /> with your AltMe wallet
                      </p>
                    </div>
                  </div>
                  <div className="icon-box icon-box-2">
                    <div className="icon">
                      <img src="assets/img/ic-purchase.svg" alt="" />
                    </div>
                    <div className="icon-text">
                      <p>
                        <span>2.</span> Make NFT purchases
                        <br /> on Tezotopia marketplace
                      </p>
                    </div>
                  </div>
                  <div className="icon-box icon-box-3">
                    <div className="icon">
                      <img src="assets/img/ic-scan-qr-code.svg" alt="" />
                    </div>
                    <div className="icon-text">
                      <p>
                        <span>3.</span> Get your discount
                        <br /> within 1hour
                      </p>
                    </div>
                  </div>
                </div>
                {voucher && <div className="button-area text-center">
                  <button
                    className="active-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#qrModal"
                    onClick={getQRUrl}
                  >
                    ACTIVATE YOUR VOUCHER
                  </button>
                </div>}
                <div className="terms-text text-center">
                  <p className="m-0">* only for primary sales</p>
                </div>
              </div>
            </div>
          </section>
        </Grid>

      </Grid>

      <AppQrCode url={qrUrl}/>

      <div
        className="modal fade theme-modal"
        id="successModal"
        tabindex="-1"
        aria-labelledby="successModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <h2>
                Your voucher has been
                <br /> successfully activated
              </h2>
              <img src="assets/img/ic-success.svg" width="186" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
