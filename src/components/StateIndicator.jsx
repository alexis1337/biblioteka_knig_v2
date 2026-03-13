// src/components/StateIndicator.jsx
import { STATES } from '../reducers/bookReducer';

function StateIndicator({ state, error }) {
  const getStateInfo = () => {
    switch (state) {
      case STATES.EMPTY:
        return {
          text: 'библиотека пуста',
          color: '#ffa726',
          bg: '#fff3e0'
        };
      case STATES.ADDING:
        return {
          text: 'ввод новой книги',
          color: '#2196f3',
          bg: '#e3f2fd'
        };
      case STATES.BOOK_ADDED:
        return {
          text: 'книга добавлена',
          color: '#4caf50',
          bg: '#e8f5e8'
        };
      case STATES.FILLED:
        return {
          text: 'библиотека заполнена',
          color: '#4caf50',
          bg: '#e8f5e8'
        };
      case STATES.SEARCHING:
        return {
          text: 'поиск книг',
          color: '#9c27b0',
          bg: '#f3e5f5'
        };
      case STATES.ERROR:
        return {
          text: 'ошибка',
          color: '#f44336',
          bg: '#ffebee'
        };
      default:
        return {
          text: 'неизвестно',
          color: '#9e9e9e',
          bg: '#f5f5f5'
        };
    }
  };

  const info = getStateInfo();

  return (
    <div style={{
      padding: '10px 20px',
      marginBottom: '20px',
      backgroundColor: info.bg,
      color: info.color,
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '16px',
      fontWeight: '500',
      border: `2px solid ${info.color}`,
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
      transition: 'all 0.3s ease'
    }}>
      <span style={{ fontSize: '24px' }}>{info.emoji}</span>
      <span>Состояние: {info.text}</span>
    </div>
  );
}

export default StateIndicator;