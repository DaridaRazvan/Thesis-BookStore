import AvailableBooks from "../../components/books/AvailableBooks";
import {Fragment, useEffect, useState} from "react";
import Card from "../../components/ui/Card";
import classes from './ResultBookList.module.css';
import {useNavigate} from "react-router-dom";
import Pagination from "../../components/ui/Pagination";

const POSTS_PER_PAGE = 5;

const ResultBookList = (props) => {
    const [totalResults,setTotalResults] = useState();
    const navigate = useNavigate();

    let link;
    if(props.search !== undefined){
        link = `http://127.0.0.1:5000/books/searchResults/${props.search}/${props.page}`;
    }else if(props.genre !== undefined){
        link = `http://127.0.0.1:5000/books/${props.genre}/${props.page}`;
    }else{
        link = `http://127.0.0.1:5000/books/getAll/${props.page}`
    }

    useEffect(()=>{
        const numberOfBooks = async () => {
            const response = await fetch(`${link}/length`);
            if(!response.ok){
                throw new Error('Something went wrong!');
            }
            const responseData = await response.json();
            setTotalResults(responseData[0].totalResults);
        }
        numberOfBooks().catch((error)=>{
            console.log(error);
        });
    },[link]);

    const navigateUtils = (page) => {
        if(props.search !== undefined){
            navigate(`/searchResults/${props.search}/${page}`);
        }else if(props.genre !== undefined){
            navigate(`/searchResults/genre/${props.genre}/${page}`);
        }else{
            navigate(`/searchResults/${page}`);
        }
    }

    const previousPage = () => {
        const page = parseInt(props.page) - 1;
        navigateUtils(page);
    }

    const nextPage = () => {
        const page = parseInt(props.page) + 1;
        navigateUtils(page);
    }

    const changeToPage = (page) => {
        if(page === "...")
            return;
        /*props.search === undefined ?
            navigate(`/searchResults/${page}`) :
            navigate(`/searchResults/${props.search}/${page}`); */
        navigateUtils(page);
    }

    const onLastPage = () =>{
        let lastPage = Math.ceil(totalResults / POSTS_PER_PAGE);
        return parseInt(props.page) === lastPage;
    }
    const isLastPage = onLastPage();

    return(
        <Fragment>
            <AvailableBooks bookLink={link}/>
            <section className={classes.pages}>
                <Card>
                    <div className={classes.center}>
                        {props.page >= 2 && <button className={classes.inLine} onClick={previousPage}> Prev </button>}
                        <div className={classes.inLine}>
                            <Pagination currentPage={props.page} changeToPage={changeToPage} postsPerPage={POSTS_PER_PAGE} totalPosts={totalResults}/>
                        </div>
                        {!isLastPage && <button className={classes.inLine} onClick={nextPage}> Next </button> }
                    </div>
                </Card>
            </section>
        </Fragment>
    );
}

export default ResultBookList;