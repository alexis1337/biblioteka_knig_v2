import BookItem from './BookItem';

export default function BookList({ books, onDelete, onClearAll, totalBooks, searchTerm }) {
  if (books.length === 0) {
    return (
      <div style={styles.empty}>
        <p style={styles.emptyText}>
          {searchTerm ? '🔍 Ничего не найдено' : 'Библиотека пуста'}
        </p>
        <p style={styles.emptyHint}>
          {searchTerm ? 'Попробуйте изменить поисковый запрос' : 'Добавьте первую книгу!'}
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>
          {searchTerm ? '🔍 Результаты поиска' : '📖 Мои книги'}
          <span style={styles.counter}> ({books.length})</span>
        </h2>
        {totalBooks > 0 && (
          <button 
            onClick={onClearAll} 
            style={styles.clearButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#e0e0e0';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#f1f1f1';
            }}
          >
            🗑️ Очистить всё ({totalBooks})
          </button>
        )}
      </div>
      
      <div style={styles.list}>
        {books.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',       
  },
  header: {
    display: 'flex',        
    justifyContent: 'space-between',  
    alignItems: 'center',    
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  title: {
    fontSize: '1.8rem',
    color: '#333',
    fontWeight: 'normal',
    margin: 0
  },
  counter: {
    fontSize: '1.2rem',
    color: '#999',
    marginLeft: '0.5rem'
  },
  clearButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f1f1f1',      
    color: '#666',                   
    border: '1px solid #ddd',        
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.2s',         
  },
  list: {
    display: 'flex',
    flexDirection: 'column',         
    gap: '0.75rem',                  
  },
  empty: {
    textAlign: 'center',              
    padding: '3rem 1rem',
    color: '#777',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    border: '2px dashed #ddd'
  },
  emptyText: {
    fontSize: '1.5rem',
    margin: 0,
  },
  emptyHint: {
    fontSize: '1rem',
    margin: '0.5rem 0 0',
    color: '#999',
  },
};