import classes from './BookItemForm.module.css';
import Input from "../../ui/Input";
import {useRef,useState} from "react";

const BookItemForm = (props) => {
    const [amountIsValid,setAmountIsValid] = useState(true);
    const amountInputRef = useRef();


    const submitHandler = (event) =>{
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1){
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    };

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input ref = {amountInputRef} label="Amount" input={{
            id:'amount',
            type: 'number',
            min: '1',
            max: '5',
            defaultValue: '1'
        }}/>
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount.</p>}
    </form>
};

export default BookItemForm;