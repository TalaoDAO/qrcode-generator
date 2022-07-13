import QRCode from "react-qr-code";
import {Download} from "@mui/icons-material";
import {useRef, useState} from "react";
import {exportComponentAsJPEG} from "react-component-export-image";
import {Button, TextareaAutosize, TextField} from "@mui/material";
import styled from "@emotion/styled";
import * as React from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';

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
    const [isCopied, setIsCopied] = useState(false);

    setTimeout(() => {
        if (isCopied) {
            setIsCopied(false);
        }
    }, 2000)

    return (
        <div>
            <div
                className="modal fade theme-modal"
                id="qrModal"
                tabIndex="-1"
                aria-labelledby="qrModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center">

                            {url ?
                                <>
                                    <h2>
                                        QR code and link generated
                                    </h2>
                                    {isLoggedIn && <ButtonStyled onClick={() => exportComponentAsJPEG(ref)}
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
                                    {isLoggedIn && <ButtonStyled
                                        style={{
                                            marginBottom: "2rem",
                                            backgroundColor: isCopied ? '#979797' : '#923aff',
                                            color: 'white'
                                        }}
                                    >
                                        <CopyToClipboard text={url}
                                                         onCopy={() => setIsCopied(true)}>
                                            <span>{isCopied ? 'Copied!' : 'Copy QR code string'}</span>
                                        </CopyToClipboard>
                                    </ButtonStyled>
                                    }
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
