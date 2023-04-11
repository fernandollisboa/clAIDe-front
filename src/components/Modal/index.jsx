import PropTypes from "prop-types";
import ReactModal from "react-modal";

export default function Modal({ modalOpen, children, height, width }) {
  return (
    <ReactModal isOpen={modalOpen} style={getStyleModal({ height, width })} ariaHideApp={false}>
      {children}
    </ReactModal>
  );
}

function getStyleModal({ height, width }) {
  return {
    content: {
      margin: "auto",
      width: width || "fit-content",
      height: height || "50vh",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "20px",
      fontSize: "1rem",
      fontWeight: "400",
    },
    overlay: { zIndex: 100 },
  };
}
Modal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
};
