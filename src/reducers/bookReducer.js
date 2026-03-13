// Определяем все возможные состояния приложения
export const STATES = {
  EMPTY: 'empty',           // пустой список
  ADDING: 'adding',         // ввод книги
  BOOK_ADDED: 'book_added', // книга добавлена
  FILLED: 'filled',         // список заполнен
  SEARCHING: 'searching',   // поиск
  ERROR: 'error'            // ошибка ввода
};

// Начальное состояние
export const initialState = {
  books: [],
  filteredBooks: [],
  searchTerm: '',
  formData: {
    title: '',
    author: ''
  },
  currentState: STATES.EMPTY,
  error: null
};

// Все возможные события
export const ACTIONS = {
  // События формы
  FOCUS_TITLE: 'focus_title',
  FOCUS_AUTHOR: 'focus_author',
  CHANGE_TITLE: 'change_title',
  CHANGE_AUTHOR: 'change_author',
  
  // События добавления
  SUBMIT_FORM: 'submit_form',
  SUBMIT_SUCCESS: 'submit_success',
  SUBMIT_ERROR: 'submit_error',
  
  // События удаления
  DELETE_BOOK: 'delete_book',
  
  // События поиска
  SEARCH: 'search',
  CLEAR_SEARCH: 'clear_search',

  // Автоматический переход
  AUTO_ADVANCE: 'auto_advance'
};

// Редюсер — чистая функция для обработки событий
export function bookReducer(state, action) {
  console.log('Событие:', action.type, action.payload); // Для отладки

  switch (action.type) {
    // Ввод названия книги
    case ACTIONS.CHANGE_TITLE:
    return {
        ...state,
        formData: {
        ...state.formData,
        title: action.payload
        },
        // При вводе всегда выходим из ошибки, если поле не пустое
        currentState: 
        state.currentState === STATES.ERROR && action.payload.trim()
            ? STATES.ADDING  // Если были в ошибке и начали ввод - переходим в ADDING
            : action.payload.trim() || state.formData.author.trim()
            ? STATES.ADDING  // Если что-то введено
            : state.books.length > 0 
                ? STATES.FILLED  // Если стёрли всё и книги есть
                : STATES.EMPTY,  // Если стёрли всё и книг нет
        error: state.currentState === STATES.ERROR && action.payload.trim() 
        ? null  // Сбрасываем ошибку при вводе
        : state.error
    };

    // Ввод автора
    case ACTIONS.CHANGE_AUTHOR:
    return {
        ...state,
        formData: {
        ...state.formData,
        author: action.payload
        },
        // Та же логика
        currentState: 
        state.currentState === STATES.ERROR && action.payload.trim()
            ? STATES.ADDING
            : action.payload.trim() || state.formData.title.trim()
            ? STATES.ADDING
            : state.books.length > 0 
                ? STATES.FILLED
                : STATES.EMPTY,
        error: state.currentState === STATES.ERROR && action.payload.trim()
        ? null
        : state.error
    };

    // Отправка формы
    case ACTIONS.SUBMIT_FORM:
      // Валидация
      if (!state.formData.title.trim() || !state.formData.author.trim()) {
        return {
          ...state,
          currentState: STATES.ERROR,
          error: 'Пожалуйста, заполните все поля'
        };
      }
      // Если валидация прошла — ничего не меняем, дальше будет SUBMIT_SUCCESS
      return state;

    // Успешное добавление книги
    case ACTIONS.SUBMIT_SUCCESS:
    const newBook = {
        id: Date.now(),
        title: state.formData.title,
        author: state.formData.author
    };
    
    const updatedBooks = [...state.books, newBook];
    
    // ВСЕГДА переходим в состояние BOOK_ADDED при добавлении книги
    // независимо от того, первая это книга или нет
    return {
        ...state,
        books: updatedBooks,
        filteredBooks: updatedBooks.filter(book =>
        book.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        ),
        formData: { title: '', author: '' },
        currentState: STATES.BOOK_ADDED, // Всегда BOOK_ADDED!
        error: null
    };

    // Ошибка добавления
    case ACTIONS.SUBMIT_ERROR:
      return {
        ...state,
        currentState: STATES.ERROR,
        error: 'Ошибка при добавлении книги'
      };

    // Удаление книги
    case ACTIONS.DELETE_BOOK:
      const booksAfterDelete = state.books.filter(book => book.id !== action.payload);
      
      return {
        ...state,
        books: booksAfterDelete,
        filteredBooks: booksAfterDelete.filter(book =>
          book.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        ),
        currentState: booksAfterDelete.length === 0 ? STATES.EMPTY : STATES.FILLED
      };

    // Поиск
    case ACTIONS.SEARCH:
      const searchValue = action.payload;
      const filtered = state.books.filter(book =>
        book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.author.toLowerCase().includes(searchValue.toLowerCase())
      );
      
      return {
        ...state,
        searchTerm: searchValue,
        filteredBooks: filtered,
        currentState: searchValue ? STATES.SEARCHING : (state.books.length > 0 ? STATES.FILLED : STATES.EMPTY)
      };

    // Очистка поиска
    case ACTIONS.CLEAR_SEARCH:
      return {
        ...state,
        searchTerm: '',
        filteredBooks: state.books,
        currentState: state.books.length > 0 ? STATES.FILLED : STATES.EMPTY
      };

    // Автоматический переход из BOOK_ADDED в FILLED
    case ACTIONS.AUTO_ADVANCE:
      return {
        ...state,
        currentState: state.books.length > 0 ? STATES.FILLED : STATES.EMPTY
      };

    default:
      return state;
  }
}