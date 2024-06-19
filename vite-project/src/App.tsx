import { Provider } from "react-redux";
import store from "./store/store";
import Book from "./components/books";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Book></Book>
    </Provider>
  );
};

export default App;