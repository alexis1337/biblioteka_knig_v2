// src/components/Notification.jsx
import { useEffect, useState } from 'react';

function Notification({ message }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1800); // Чуть меньше, чем таймер перехода

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: '#4caf50',
      color: 'white',
      padding: '15px 25px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      animation: 'slideIn 0.3s ease-out, fadeOut 0.3s ease-out 1.5s forwards',
      zIndex: 1000,
      fontSize: '16px',
      fontWeight: '500'
    }}>
      {message}
    </div>
  );
}

export default Notification;