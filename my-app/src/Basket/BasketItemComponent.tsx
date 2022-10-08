import { observer } from "mobx-react-lite";
import { basket } from "../App";
import classes from "./Basket.module.css";

type Props = {
    id: string;
    title: string;
    quantity: number;
    imgUrl: string;
    price: number;
};

const basketItemComponent = observer((props: Props): JSX.Element => {
    return (
        <div className={classes.basketItem}>
            <div className={classes.basketItemTitle}>{props.title}</div>
            <div className={classes.basketItemRow}>
                <div className={classes.basketItemImg}>
                    <img src={props.imgUrl} alt="basket-item" height={200} />
                </div>
                <div
                    className={classes.basketItemDec}
                    onClick={() => {
                        basket.decFrombasket(props.id);
                    }}
                >
                    -
                </div>
                <div>{props.quantity}</div>
                <div
                    className={classes.basketItemAdd}
                    onClick={() => {
                        basket.addToBasket(props.id);
                    }}
                >
                    +
                </div>
                <div>{props.price} UAH</div>
                <div
                    className={classes.basketItemRemove}
                    onClick={() => {
                        basket.delFromBasket(props.id);
                    }}
                >
                    x
                </div>
            </div>
        </div>
    );
});

export default basketItemComponent;
