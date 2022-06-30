import classes from './Pagination.module.css';
import {useEffect} from "react";

const Pagination = (props) => {
    const pageNumbers = [];
    useEffect(() =>{
    })

    if(Math.ceil(props.totalPosts / props.postsPerPage) < 10) {
        console.log("Less than 10 pages");
        for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
            pageNumbers.push(i);
        }
    }
    else{
        const currentPage = parseInt(props.currentPage);
        pageNumbers.push(1);
        if(currentPage >= 5){
            pageNumbers.push("...");
            pageNumbers.push(currentPage - 2);
            pageNumbers.push(currentPage - 1);
            pageNumbers.push(currentPage);
        } else{
            pageNumbers.push(2);
            pageNumbers.push(3);
            pageNumbers.push(4);
        }
        if(currentPage + 2 < Math.ceil(props.totalPosts / props.postsPerPage)
        && currentPage >= 4){
            pageNumbers.push(currentPage + 1);
            pageNumbers.push(currentPage + 2);
            pageNumbers.push("...");
            pageNumbers.push(Math.ceil(props.totalPosts / props.postsPerPage));
        }
    }

    let i = 0;
    return(
        <nav>
            <ul className={classes.pagination}>
                {
                    pageNumbers.map(number => (
                    <li key={i++} className={classes.paginationItem}>
                        <button onClick={() => props.changeToPage(number)}>
                            {number}
                        </button>
                    </li>
                ))
                }
            </ul>
        </nav>
    );

}

export default Pagination;

