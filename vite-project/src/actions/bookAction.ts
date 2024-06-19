import Swal from "sweetalert2";
import Books from "../components/types";
import store from "../store/store";

export const addBook = (book: Books) => ({
    type: "ADD",
    payload: book,
  });
  
export  const deleteBook:any = (book: Books) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          store.dispatch({ type: "DELETE", payload: book });
          Swal.fire("Deleted!", "Your book has been deleted.", "success");
        }
      });
    };
  
 export const updateBook = (book: Books) => ({
    type: "UPDATE",
    payload: book,
  });
