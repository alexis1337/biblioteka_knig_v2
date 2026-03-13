import { useReducer, useEffect } from 'react';
import Header from './components/Header';
import AddBookForm from './components/AddBookForm';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import StateIndicator from './components/StateIndicator';
import Notification from './components/Notification';
import { bookReducer, initialState, ACTIONS, STATES } from './reducers/bookReducer';

function App() {
  // Загружаем начальное состояние из localStorage
  const [state, dispatch] = useReducer(bookReducer, initialState, (initial) => {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
      const books = JSON.parse(savedBooks);
      return {
        ...initial,
        books: books,
        filteredBooks: books,
        currentState: books.length > 0 ? STATES.FILLED : STATES.EMPTY
      };
    }
    return initial;
  });

  // Эффект для сохранения книг в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(state.books));
    console.log('Текущее состояние приложения:', state.currentState);
  }, [state.books, state.currentState]);

  // Эффект для обработки состояния "книга добавлена"
  useEffect(() => {
    if (state.currentState === STATES.BOOK_ADDED) {
      // Через 2 секунды автоматически переходим в состояние FILLED
      const timer = setTimeout(() => {
        dispatch({ type: ACTIONS.AUTO_ADVANCE });
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [state.currentState]);

  // Обработчики событий
  const handleChangeTitle = (value) => {
    dispatch({ type: ACTIONS.CHANGE_TITLE, payload: value });
  };

  const handleChangeAuthor = (value) => {
    dispatch({ type: ACTIONS.CHANGE_AUTHOR, payload: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Сначала проверяем валидацию
    dispatch({ type: ACTIONS.SUBMIT_FORM });
    
    // Если нет ошибки после валидации, добавляем книгу
    if (state.formData.title.trim() && state.formData.author.trim()) {
      dispatch({ type: ACTIONS.SUBMIT_SUCCESS });
    }
  };

  const handleDeleteBook = (id) => {
    dispatch({ type: ACTIONS.DELETE_BOOK, payload: id });
  };

  const handleSearch = (term) => {
    dispatch({ type: ACTIONS.SEARCH, payload: term });
  };

  const handleClearAll = () => {
    if (window.confirm('Вы уверены, что хотите удалить все книги?')) {
      // Удаляем все книги через редюсер
      state.books.forEach(book => {
        dispatch({ type: ACTIONS.DELETE_BOOK, payload: book.id });
      });
    }
  };

  // Определяем, какие книги показывать (с учётом поиска)
  const displayedBooks = state.searchTerm ? state.filteredBooks : state.books;

  return (
    <div style={styles.app}>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
      
      <Header />
      
      {/* Уведомление при добавлении книги */}
      {state.currentState === STATES.BOOK_ADDED && (
        <Notification message="Книга успешно добавлена!" />
      )}
      
      {/* Индикатор текущего состояния */}
      <StateIndicator state={state.currentState} error={state.error} />
      
      {/* Форма добавления с поддержкой событий */}
      <AddBookForm
        title={state.formData.title}
        author={state.formData.author}
        onChangeTitle={handleChangeTitle}
        onChangeAuthor={handleChangeAuthor}
        onSubmit={handleSubmit}
        error={state.error}
      />
      
      {/* Поиск */}
      <SearchBar
        onSearch={handleSearch}
        searchTerm={state.searchTerm}
      />
      
      {/* Список книг */}
      <BookList
        books={displayedBooks}
        onDelete={handleDeleteBook}
        onClearAll={handleClearAll}
        totalBooks={state.books.length}
        searchTerm={state.searchTerm}
      />
    </div>
  );
}

const styles = {
  app: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: '1000px',
    margin: '0 auto',      
    padding: '0 1rem',     
    position: 'relative'
  },
  debug: {
    marginTop: '30px',
    marginBottom: '30px',
    padding: '15px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#666',
    border: '1px dashed #ccc'
  }
};

export default App;