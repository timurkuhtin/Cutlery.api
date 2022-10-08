import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { catalog } from "../App";
import ProductDto from "../dtos/ProductDto";
import { addNewProduct } from "../http/fetches";

const ProductAddComponent = observer((): JSX.Element => {
    const [product, setProduct] = useState<ProductDto>();
    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            if (product != undefined) {
                await addNewProduct(product);
                catalog.addProduct(product);
                navigate("/catalog");
            }
        };

        init();
    }, [product]);

    return (
        <div>
            <div className="fs-2 text-center mb-2">Adding product</div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    const target = e.target as typeof e.target & {
                        type: { value: string };
                        price: { value: number };
                        material: { value: string };
                    };

                    const product: ProductDto = {
                        id: "",
                        type: target.type.value,
                        price: target.price.value,
                        material: target.material.value,
                    };

                    setProduct(product);
                }}
            >
                <div className="mb-3 w-50 mx-auto">
                    <label className="form-label fs-4">Type</label>
                    <input
                        type="text"
                        className="form-control"
                        name="type"
                        required
                    />
                </div>
                <div className="mb-3 w-50 mx-auto">
                    <label className="form-label fs-4">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        required
                    />
                </div>
                <div className="mb-3 w-50 mx-auto">
                    <label className="form-label fs-4">Material</label>
                    <input
                        type="number"
                        className="form-control"
                        name="material"
                        required
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                        Save changes
                    </button>
                </div>
            </form>
        </div>
    );
});

export default ProductAddComponent;
