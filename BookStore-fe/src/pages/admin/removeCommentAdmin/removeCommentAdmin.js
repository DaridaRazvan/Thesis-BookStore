import classes from "../Admin.module.css";
import classes2 from './removeCommentAdmin.module.css'
import Card from "../../../components/ui/Card";
import AdminLeftNav from "../AdminLeftNav";
import React, {useEffect, useState} from "react";
import ReviewAdmin from "../../../components/reviews/ReviewAdmin";

const RemoveCommentAdmin = () => {
    const [reviews,setReviews] = useState([]);


    const fetchReviews = async () => {
        const response = await fetch(`http://127.0.0.1:5000/reviews/notVerified`);

        if(!response.ok){
            throw new Error('Something went wrong!');
        }
        const responseData = await response.json();
        const loadedReviews = [];

        for (const key in responseData){
            loadedReviews.push({
                id: responseData[key].id,
                bookId: responseData[key].bookId,
                userId: responseData[key].userId,
                description: responseData[key].description,
                userName: responseData[key].userName,
                rating: responseData[key].rating
            });
        }
        setReviews(loadedReviews);
    };

    useEffect(() => {
        fetchReviews().catch(error=> console.log(error));
    },[])

    const refresh = () => {
        fetchReviews().catch((error) => {
            console.log(error);
        });
    }

    const reviewsList = reviews.map(review => <ReviewAdmin key={review.id}
                                                           id={review.id}
                                                           description={review.description}
                                                           userId={review.userId}
                                                           userName={review.userName}
                                                           refresh={refresh}/>)

    return(
        <section className = {classes.admin}>
            <Card>
                <div className = {classes.position}>
                    <AdminLeftNav/>
                    <div className = {classes2.right}>
                        <p>Remove review</p>
                        <ul>{reviewsList}</ul>
                    </div>
                </div>
            </Card>
        </section>
    );
}

export default RemoveCommentAdmin;