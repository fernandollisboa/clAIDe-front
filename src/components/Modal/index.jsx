import PropTypes from "prop-types";
import ReactModal from "react-modal";

export default function Modal({ modalOpen, children }) {
  return (
    <ReactModal isOpen={modalOpen} style={StyleModal}>
      {children}
    </ReactModal>
  );
}
const StyleModal = {
  content: {
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    margin: "auto",
    width: "70vw",
    height: "40vh",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "20px",
    fontSize: "1rem",
    fontWeight: "400",
  },
};
Modal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
