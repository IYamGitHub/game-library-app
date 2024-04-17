import React, { FC, ReactElement } from 'react';
import './modal.css';
import { VscChromeClose } from 'react-icons/vsc';

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactElement;
  footer?: ReactElement;
}

export default function Modal({
  title,
  open,
  onClose,
  children,
  footer
}: ModalProps): ReturnType<FC> {
  return (
    <div className={`modal ${open ? 'display-block' : 'display-none'}`}>
      <div className="modal-main">
        <div className="modal-head mt-4">
          <h1>{title}</h1>
        </div>
        <div className="modal-body">{children}</div>
        <div className="btn-container">
          <button type="button" className="btn" onClick={onClose}>
            <VscChromeClose className="fs-1 text-light" />
          </button>
        </div>
        {footer && <div>{footer}</div>}
      </div>
    </div>
  );
}
