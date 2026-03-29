import React, { useEffect, useState } from 'react'
import './Alert.css'

function Alert({ message, type = 'success', show = false, onClose }) {
  const [render, setRender] = useState(show)

  useEffect(() => {
    if (show) {
      setRender(true)
      return
    }

    const timeout = setTimeout(() => setRender(false), 250)
    return () => clearTimeout(timeout)
  }, [show])

  useEffect(() => {
    if (!show) return
    const timer = setTimeout(() => {
      if (onClose) onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [show, onClose])

  if (!render) return null

  return (
    <div className={`alert-notification ${type} ${show ? 'show' : 'hide'}`} role="alert">
      <div className="alert-text">{message}</div>
      <button className="alert-close" type="button" onClick={() => onClose && onClose()}>
        ×
      </button>
    </div>
  )
}

export default Alert