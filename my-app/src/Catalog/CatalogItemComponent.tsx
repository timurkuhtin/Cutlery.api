import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { basket } from "../App";
import "../App.css";

type Props = {
    id: string;
    type: string;
    material: string;
    price: number;
};

const CatalogItemComponent = observer((props: Props): JSX.Element => {
    return (
        <div className="col-4">
            <div className="card">
                <Link to={`/catalog/${props.id}`} className="del_underline">
                    <div className="text-center">
                    </div>
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{props.type}</h5>
                    <p className="card-text">{props.price} UAH</p>
                    <div
                        className="btn btn-primary"
                        onClick={() => {
                            basket.addToBasket(
                                props.id,
                                props.type,
                                props.material,
                                props.price
                            );
                        }}
                    >
                        Add to basket
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CatalogItemComponent;
