import { Modal } from "antd";
import PropTypes from "prop-types";
import Button from "./Button";
import React from "react";

const ModalComp = React.memo(
  ({ isConfirm, isVisible, onClose, title, content }) => {
    return (
      <Modal
        title={title}
        centered
        open={isVisible}
        onCancel={onClose}
        footer={[
          <div
            key={"modal-container-btn"}
            className="flex justify-end items-center gap-2"
          >
            <Button
              key={"acco-cancel-btn"}
              id={"account-cancel-btn"}
              type={"button"}
              className={
                "border-2 border-red-600 rounded-md px-4 py-2 font-semibold text-red-600 text-base"
              }
              name={"account-cancel-btn"}
              onClick={onClose}
              title={"Cancel"}
            />
            {isConfirm === true && (
              <Button
                key={"account-ok-btn"}
                id={"account-ok-btn"}
                type={"button"}
                className={
                  "border-2 border-navbarColor bg-navbarColor rounded-md px-4 py-2 font-semibold text-white text-base"
                }
                name={"account-ok-btn"}
                title={"Confirm"}
              />
            )}
          </div>,
        ]}
      >
        {content}
      </Modal>
    );
  }
);

ModalComp.propTypes = {
  isConfirm: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};

export default ModalComp;
