import React from 'react'
import './ConfirmModal.css'

function ConfirmModal({ show, message, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="confirm-modal-overlay" onClick={onCancel}>
      <div className="confirm-modal-box" onClick={e => e.stopPropagation()}>
        <p className="confirm-modal-message">{message}</p>
        <div className="confirm-modal-actions">
          <button type="button" className="confirm-modal-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="confirm-modal-confirm" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal