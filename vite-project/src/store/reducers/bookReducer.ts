import Books from "../../components/types";
const initialBooks: Books[] = JSON.parse(localStorage.getItem("books") || `[]` );

function reducer(state = initialBooks, action: any) {
    switch (action.type) {
      case "ADD":
        return [...state, action.payload];
      case "DELETE":
        return state.filter((book) => book.id !== action.payload.id);
      case "UPDATE":
        return state.map((book) =>
          book.id === action.payload.id ? { ...book, ...action.payload } : book
        );
      default:
        return state;
    }
  }

  export default reducer;