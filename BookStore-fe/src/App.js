import Store from "./pages/store/Store";
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./pages/login/PrivateRoute";
import Login from "./pages/login/Login";
import AuthProvider from "./store/AuthProvider";
import Admin from "./pages/admin/Admin";
import ShowBook from "./pages/showBook/ShowBook";
import CartProvider from "./store/CartProvider";
import Results from "./pages/search/Results";
import MyReviews from "./pages/myReviews/MyReviews";
import About from "./pages/about/About";
import Register from "./pages/register/Register";
import TopBooks from "./pages/topBooks/TopBooks";
import WishlistBooks from "./pages/wishlist/WishlistBooks";
import AddBookAdmin from "./pages/admin/addBookAdmin/addBookAdmin";
import RemoveCommentAdmin from "./pages/admin/removeCommentAdmin/removeCommentAdmin";
import RemoveBookAdmin from "./pages/admin/removeBookAdmin/removeBookAdmin";
import AddAuthor from "./pages/admin/addAuthor/AddAuthor";
import AddGenre from "./pages/admin/addGenre/AddGenre";
import Account from "./pages/account/Account";
import Recommendations from "./pages/recommendations/Recommendations";

function App() {
    return (
        <CartProvider>
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<PrivateRoute/>} >
                        <Route exact path = "/" element={<Store/>} />
                        <Route exact path="/book/:id" element={<ShowBook/>} />
                        <Route exact path="/admin" element={<Admin/>} />
                        <Route exact path="/admin/addAuthor" element={<AddAuthor/>} />
                        <Route exact path="/admin/addGenre" element={<AddGenre/>} />
                        <Route exact path="/admin/addBook" element={<AddBookAdmin/>} />
                        <Route exact path="/admin/removeBook" element={<RemoveBookAdmin/>} />
                        <Route exact path="/admin/removeComment" element={<RemoveCommentAdmin/>} />
                        <Route exact path="/searchResults/genre/:genre/:page" element={<Results/>} />
                        <Route exact path="/searchResults/:search/:page" element={<Results/>} />
                        <Route exact path="/searchResults/:page" element={<Results/>} />
                        <Route exact path="/searchResults/topBooks" element={<TopBooks/>} />
                        <Route exact path="/wishlist" element={<WishlistBooks/>} />
                        <Route exact path="/reviews" element={<MyReviews/>} />
                        <Route exact path="/about" element={<About/>} />
                        <Route exact path="/account" element={<Account/>} />
                        <Route exact path="/recommendations" element={<Recommendations/>} />
                    </Route>
                    <Route exact path="/login" element={<Login/>} />
                    <Route exact path="/register" element={<Register/>} />
                </Routes>
            </AuthProvider>
        </CartProvider>
    );
}

export default App;
