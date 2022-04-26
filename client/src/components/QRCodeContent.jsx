import React from 'react';
import AppQrCode from "../components/AppQrCode";

function QRCodeContent({voucher, getQRUrl, qrUrl, isButtonWithoutVoucher = false}) {
    return (
        <>
            <section className="page-content">
                <div className="container">
                    <div className="flux-box">
                        <div className="header">
                            <div className="row g-0">
                                <div className="col-12 text-center">
                                    <img src="assets/img/logo-tezotopia-desktop.png" alt="flux"/>
                                </div>
                            </div>
                        </div>
                        <div className="body-text">
                            <div className="row align-items-center g-0">
                                <div className="col-3">
                                    <div className="left-character-img">
                                        <img src="assets/img/unit-left-tablet.png" alt=""/>
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
                                        <img src="assets/img/unit-right-tablet.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="icon-area d-flex text-center">
                            <div className="icon-box icon-box-1">
                                <div className="icon">
                                    <img src="assets/img/ic-scan-qr-code.svg" alt=""/>
                                </div>
                                <div className="icon-text">
                                    <p>
                                        <span>1.</span> Scan the QR code
                                        <br/> with your AltMe wallet
                                    </p>
                                </div>
                            </div>
                            <div className="icon-box icon-box-2">
                                <div className="icon">
                                    <img src="assets/img/ic-purchase.svg" alt=""/>
                                </div>
                                <div className="icon-text">
                                    <p>
                                        <span>2.</span> Make NFT purchases
                                        <br/> on Tezotopia marketplace
                                    </p>
                                </div>
                            </div>
                            <div className="icon-box icon-box-3">
                                <div className="icon">
                                    <img src="assets/img/ic-scan-qr-code.svg" alt=""/>
                                </div>
                                <div className="icon-text">
                                    <p>
                                        <span>3.</span> Get your discount
                                        <br/> within 1hour
                                    </p>
                                </div>
                            </div>
                        </div>
                        {(voucher || isButtonWithoutVoucher) && <div className="button-area text-center">
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

            <AppQrCode url={qrUrl}/>

            <div
                className="modal fade theme-modal"
                id="successModal"
                tabIndex="-1"
                aria-labelledby="successModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <h2>
                                Your voucher has been
                                <br/> successfully activated
                            </h2>
                            <img src="assets/img/ic-success.svg" width="186" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QRCodeContent;
