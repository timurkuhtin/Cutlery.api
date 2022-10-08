import { observer } from "mobx-react-lite";
import { basket } from "../App";

type Props = {
    children?: JSX.Element[];
};

const basketComponent = observer((props: Props): JSX.Element => {
    return (
        <div>
            <div className="fs-2 text-center mb-4">Your basket</div>
            {props.children?.length ? (
                <div>
                    {props.children}
                    <div className="fs-4 text-end mb-3">
                        <b>Total sum: </b>
                        {basket.totalSum} UAH
                    </div>
                </div>
            ) : (
                <div className="fs-1 text-center">basket is empty!</div>
            )}
        </div>
    );
});

export default basketComponent;
