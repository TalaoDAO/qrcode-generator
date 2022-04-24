import QRCode from "react-qr-code";
import { Download } from "@mui/icons-material";
import { useRef } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
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

function AppQrCode({ url }) {
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
              <h2>
                Scan the QR code 2
                <br /> with your AltMe wallet
              </h2>
              <ButtonStyled onClick={() => exportComponentAsPNG(ref)}
                            variant="contained"
                            startIcon={<Download />}
                            style={{ marginBottom: "2rem" }}>Download</ButtonStyled>
              <div ref={ref}>
                <QRCode
                  title="Download the App"
                  value={url}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppQrCode;
