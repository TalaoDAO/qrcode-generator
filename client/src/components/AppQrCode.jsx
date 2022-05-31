import QRCode from "react-qr-code";
import { Download } from "@mui/icons-material";
import { useRef } from "react";
import { exportComponentAsJPEG } from "react-component-export-image";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

const ButtonStyled = styled(Button)({
    backgroundColor: "#923aff",
    borderColor: "#923aff",
    '&:hover': {
        backgroundColor: '#842cfd',
        borderColor: '#842cfd',
        boxShadow: 'none',
    },
});

function AppQrCode({url, isLoggedIn = false}) {
    const ref = useRef();

    return (
        <div>
            <div
                className="modal fade theme-modal"
                id="qrModal"
                tabindex="-1"
                aria-labelledby="qrModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center">

                            {url ?
                                <>
                                    <h2>
                                        Scan the QR code
                                        <br/> with your AltMe wallet
                                    </h2>
                                    { isLoggedIn && <ButtonStyled onClick={() => exportComponentAsJPEG(ref)}
                                                  variant="contained"
                                                  startIcon={<Download/>}
                                                  style={{marginBottom: "2rem"}}>Download</ButtonStyled>
                                    }
                                    <div ref={ref} style={{padding: '2rem'}}>
                                        <QRCode
                                            title="Download the App"
                                            value={url}
                                        />
                                    </div>
                                </> : <h2>
                                    Invalid QR Code Link
                                </h2>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppQrCode;
