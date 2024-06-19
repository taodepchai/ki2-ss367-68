import React, { useEffect, useState } from "react";
import { addBook, deleteBook, updateBook } from "../actions/bookAction.ts";
import store from "../store/store.ts";
import Books from "./types";
import './style.scss';
const Book: React.FC = () => {
  const books = store.getState().reducer;
  const [form, setForm] = useState<Books>({
    id: 0,
    title: "",
    loan_student: "",
    loan_day: "",
    pay_day: "",
    status: "Chưa trả",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      store.dispatch(updateBook(form));
      setIsEditing(false);
    } else {
      const newId = books.length ? books[books.length - 1].id + 1 : 1;
      store.dispatch(addBook({ ...form, id: newId }));
    }
    setForm({
      id: 0,
      title: "",
      loan_student: "",
      loan_day: "",
      pay_day: "",
      status: "Chưa trả",
    });
  };

  const handleEdit = (book: Books) => {
    setForm(book);
    setIsEditing(true);
  };

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const getStatusColor = (status: string) => {
    return status === "Đã trả" ? "green" : "red";
  };

  return (
    <div className="book-management">
      <h1>Quản lý mượn trả sách</h1>
      <form onSubmit={handleSubmit} className="book-form">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Tên sách"
          required
        />
        <input
          type="text"
          name="loan_student"
          value={form.loan_student}
          onChange={handleChange}
          placeholder="Sinh viên mượn"
          required
        />
        <input
          type="date"
          name="loan_day"
          value={form.loan_day}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="pay_day"
          value={form.pay_day}
          onChange={handleChange}
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          required
        >
          <option value="Đã trả" style={{ backgroundColor: "green" }}>
            Đã trả
          </option>
          <option value="Chưa trả" style={{ backgroundColor: "red" }}>
            Chưa trả
          </option>
        </select>
        <button type="submit">
          {isEditing ? "Cập nhật" : "Thêm thông tin"}
        </button>
      </form>
      <table className="book-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sách</th>
            <th>Sinh viên mượn</th>
            <th>Ngày mượn</th>
            <th>Ngày trả</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.loan_student}</td>
              <td>{book.loan_day}</td>
              <td>{book.pay_day}</td>
              <td style={{ color: getStatusColor(book.status) }}>
                {book.status}
              </td>
              <td>
                <button onClick={() => handleEdit(book)}>Sửa</button>
                <button onClick={() => store.dispatch(deleteBook(book))}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Book;
