import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { basket, catalog } from "../App";
import ProductDto from "../dtos/ProductDto";
import { delProductById, getProductById } from "../http/fetches";

const ProductComponent = observer((): JSX.Element => {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductDto>();
    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            const recievedProduct: ProductDto = await getProductById(id);
            setProduct(recievedProduct);
        };

        init();
    }, []);

    return (
        <div>
            <div className="fs-2 text-center mb-2">Product description</div>
            <div className="fs-4 mb-2">
                <b>Type: </b>
                {product?.type}
            </div>
            <div className="fs-4 mb-2">
                <b>Price: </b>
                {product?.price}
            </div>
            <div className="fs-4 mb-2">
                <b>Material: </b>
                {product?.material}
            </div>            
            <div className="text-center">
                <div
                    className="btn btn-primary"
                    onClick={() => {
                        if (product)
                            basket.addToBasket(
                                product.id,
                                product.type,
                                product.material,
                                product.price
                            );
                    }}
                >
                    Add to basket
                </div>
                <div
                    className="btn btn-danger ms-2"
                    onClick={async () => {
                        if (product) {
                            basket.delFromBasket(product.id);
                            await delProductById(id);
                            catalog.delProductById(product.id);

                            navigate("/products");
                        }
                    }}
                >
                    X
                </div>
            </div>
            <Link to="/products">
                <div className="text-end">Go to catalog</div>
            </Link>
        </div>
    );
});

export default ProductComponent;
