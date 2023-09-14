/* eslint-disable react/prop-types */
import "./style.css";

export default function ModalDelete({ open, handleClose, handleConfirm }) {
  return (
    <>
      {open && (
        <div className="container-confirm">
          <div className="arrow-up"></div>
          <span> Apagar item ?</span>
          <div className="container-buttons">
            <button
              className="btn-small btn-blue"
              onClick={() => handleConfirm()}
            >
              Sim
            </button>
            <button className="btn-small btn-red" onClick={() => handleClose()}>
              {" "}
              Não
            </button>
          </div>
        </div>
      )}
    </>
  );
}
