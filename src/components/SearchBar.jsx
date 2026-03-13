export default function SearchBar({ onSearch, searchTerm }) {
  return (
    <div style={styles.container}>
      <div style={styles.searchBox}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Поиск книги по названию или автору"
          style={styles.input}
        />
        
        {searchTerm && (
          <button
            onClick={() => onSearch('')}
            style={styles.clearButton}
            onMouseEnter={(e) => {
              e.target.style.color = '#333';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#999';
            }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto 2rem', 
  },
  searchBox: {
    position: 'relative',   
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '0.8rem 2.5rem 0.8rem 1rem', 
    border: '2px solid #ddd',
    borderRadius: '25px',  
    fontSize: '1rem',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
    outline: 'none',
    ':focus': {
      borderColor: '#4a6fa5'
    }
  },
  clearButton: {
    position: 'absolute',   
    right: '10px',         
    top: '50%',
    transform: 'translateY(-50%)',  
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: '#999',          
    padding: '0',
    transition: 'color 0.2s'
  },
};