import BooksSummary from "./BooksSummary";
import AvailableBooks from "./AvailableBooks";
import {Fragment} from 'react';
import ScrollableBookListButton from "./ScrollableBookListButton";

const Books = () => {
    const userId = localStorage.getItem('userId');

    return (
        <Fragment>
            <BooksSummary/>
            <ScrollableBookListButton link={`http://127.0.0.1:5000/books/recommendation/SVDTuning/${userId}`}/>
            <AvailableBooks bookLink={'http://127.0.0.1:5000/books/getAll/1'}/>
        </Fragment>
        );
};

export default Books;