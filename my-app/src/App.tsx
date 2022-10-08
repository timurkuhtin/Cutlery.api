import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import BasketComponent from "./Basket/BasketComponent";
import BasketItemComponent from "./Basket/BasketItemComponent";
import CatalogComponent from "./Catalog/CatalogComponent";
import CatalogItemComponent from "./Catalog/CatalogItemComponent";
import ProductAddComponent from "./Catalog/ProductAddComponent";
import ProductChangeComponent from "./Catalog/ProductChangeComponent";
import ProductComponent from "./Catalog/ProductComponent";
import ProductDto from "./dtos/ProductDto";
import HeaderComponent from "./Header/HeaderComponent";
import { getProducts } from "./http/fetches";
import { Basket } from "./store/Basket.store";
import { Catalog } from "./store/Catalog.store";

export const basket = new Basket();
export const catalog = new Catalog();

const App = observer(() => {
    useEffect(() => {
        const init = async () => {
            const products: ProductDto[] = await getProducts();

            catalog.productList = products;
        };

        init();
    }, []);

    return (
        <BrowserRouter>
            <HeaderComponent />
            <div className="container">
                <Routes>
                    <Route
                        path="/catalog"
                        element={
                            <CatalogComponent>
                                {catalog.productList.map((item, index) => (
                                    <CatalogItemComponent
                                        key={index}
                                        id={item.id}
                                        type={item.type}
                                        price={item.price}
                                        material={item.material}
                                    />
                                ))}
                            </CatalogComponent>
                        }
                    />
                    <Route path="/catalog/:id" element={<ProductComponent />} />
                    <Route
                        path="/edit-product/:id"
                        element={<ProductChangeComponent />}
                    />
                    <Route
                        path="/add-product"
                        element={<ProductAddComponent />}
                    />
                    <Route
                        path="/basket"
                        element={
                            <BasketComponent>
                                {basket.basketItems.map((item, index) => (
                                    <BasketItemComponent
                                        key={index}
                                        id={item.id}
                                        price={item.price}
                                        title={item.title}
                                        imgUrl={item.imgUrl}
                                        quantity={item.quantity}
                                    />
                                ))}
                            </BasketComponent>
                        }
                    />
                    <Route
                        path="*"
                        element={<Navigate replace to="/catalog" />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
});

export default App;
