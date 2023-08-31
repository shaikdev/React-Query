import "./App.css";
import Navbar from "./component/navbar.component";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UsersScreen from "./screens/users/users.screen";
import UserListScreen from "./screens/user list/user.list.screen";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter>
          {/* <div className="navbar_container">
            <Navbar />
          </div> */}
          <Routes>
            <Route path="/" element={<UsersScreen />} />
            <Route path="/user_details/:id" element={<UserListScreen />} />
          </Routes>
        </BrowserRouter>
      </div>
      <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
    </QueryClientProvider>
  );
}

export default App;
