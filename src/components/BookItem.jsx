export default function BookItem({ book, onDelete }) {
  return (
    <div style={styles.card}>
      <div style={styles.bookInfo}>
        <h3 style={styles.title}>{book.title}</h3>
        <p style={styles.author}>Автор: {book.author}</p>
      </div>
      
      <button
        onClick={() => onDelete(book.id)}
        style={styles.deleteButton}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#c0392b';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#e74c3c';
        }}
      >
        Удалить
      </button>
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '0.75rem',
    borderLeft: '4px solid #4a6fa5',
    transition: 'transform 0.2s, box-shadow 0.2s',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
    }
  },
  bookInfo: {
    flex: 1,
  },
  title: {
    margin: 0,
    fontSize: '1.2rem',
    color: '#333',
  },
  author: {
    margin: '0.25rem 0 0',
    color: '#666',
    fontSize: '0.95rem',
  },
  deleteButton: {
    marginLeft: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
};