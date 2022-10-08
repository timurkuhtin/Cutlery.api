import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { catalog } from "../App";
import ProductDto from "../dtos/ProductDto";
import { changeProduct, getProductById } from "../http/fetches";

const ProductChangeComponent = observer((): JSX.Element => {
    const [product, setProduct] = useState<ProductDto>();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const init = async () => {
            const product: ProductDto = await getProductById(id);
            setProduct(product);
        };

        init();
    }, []);

    return (
        <div>
            <div className="fs-2 text-center mb-2">Changing product</div>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();

                    const target = e.target as typeof e.target & {
                        type: { value: string };
                        price: { value: number };
                        material: { value: string };
                    };

                    const product: ProductDto = {
                        id: id ?? "",
                        type: target.type.value,
                        price: target.price.value,
                        material: target.material.value,
                    };

                    await changeProduct(id, product);
                    catalog.changeProduct(product);
                    navigate("/catalog");
                }}
            >
                <div className="mb-3 w-50 mx-auto">
                    <label className="form-label fs-4">Type</label>
                    <input
                        type="text"
                        className="form-control"
                        name="type"
                        required
                        defaultValue={product?.type}
                    />
                </div>
                <div className="mb-3 w-50 mx-auto">
                    <label className="form-label fs-4">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        required
                        defaultValue={product?.price}
                    />
                </div>
                <div className="mb-3 w-50 mx-auto">
                    <label className="form-label fs-4">Material</label>
                    <input
                        type="number"
                        className="form-control"
                        name="material"
                        required
                        defaultValue={product?.material}
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

export default ProductChangeComponent;
