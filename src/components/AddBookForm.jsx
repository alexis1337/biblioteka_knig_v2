// src/components/AddBookForm.jsx
function AddBookForm({ 
  title, 
  author, 
  onChangeTitle, 
  onChangeAuthor, 
  onSubmit, 
  error 
}) {
  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto 30px auto',
      padding: '20px',
      backgroundColor: '#e3f2fd',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ marginTop: 0, color: '#1976d2' }}>Добавить новую книгу</h2>
      
      {error && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '15px',
          border: '1px solid #ef9a9a',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '20px' }}>⚠️</span>
          <span>{error}</span>
        </div>
      )}
      
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: '500',
            color: '#333'
          }}>
            Название книги:
          </label>
          <input
            type="text"
            placeholder="Введите название..."
            value={title}
            onChange={(e) => onChangeTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '4px',
              border: error && !title.trim() ? '2px solid #f44336' : '1px solid #ddd',
              fontSize: '16px',
              boxSizing: 'border-box',
              transition: 'border 0.3s'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: '500',
            color: '#333'
          }}>
            Автор:
          </label>
          <input
            type="text"
            placeholder="Введите автора..."
            value={author}
            onChange={(e) => onChangeAuthor(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '4px',
              border: error && !author.trim() ? '2px solid #f44336' : '1px solid #ddd',
              fontSize: '16px',
              boxSizing: 'border-box',
              transition: 'border 0.3s'
            }}
          />
        </div>
        
        <button 
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
            ':hover': {
              backgroundColor: '#45a049'
            }
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
        >
          Добавить книгу
        </button>
      </form>
    </div>
  );
}

export default AddBookForm;