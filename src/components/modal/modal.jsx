import Backdrop from "./backdrop";
import reactDom from "react-dom";
import "./modal.css";
const ModalBox = (props) => {
  window.scroll(0,0);
  return (
    <div id="modalbox">
      <div id="message">
        <h3>{props.message}</h3>
      </div>
        <div className="btn-row row">

      <button className="btn-modal " onClick={()=>props.sold("TBB")}>
        Yes!
      </button>
      <button className="btn-modal " onClick={()=>props.sold("Outside")}>
        No!
      </button>
      <button className="btn-modal outlined" onClick={props.closeModal}>
        close
      </button>
        </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {reactDom.createPortal(
        <Backdrop onclick={props.closeModal}></Backdrop>,
        document.getElementById("backdrop-root")
      )}
      {reactDom.createPortal(
        <ModalBox
        sold={props.sold}
          message={props.message}
          closeModal={props.closeModal}
        ></ModalBox>,
        document.getElementById("modal-root")
      )}
    </>
  );
};
export default Modal;
