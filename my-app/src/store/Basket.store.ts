import { makeAutoObservable } from "mobx";

export type BasketItem = {
    id: string;
    title: string;
    quantity: number;
    imgUrl: string;
    price: number;
};

export class Basket {
    basketItems: BasketItem[] = [];

    get totalSum(): number {
        let total: number = 0;

        for (const item of this.basketItems) {
            total += item.price * item.quantity;
        }

        return total;
    }

    constructor() {
        makeAutoObservable(this);

        const basketFromLocalStorage = localStorage.getItem("basket");

        if (basketFromLocalStorage)
            this.basketItems = JSON.parse(basketFromLocalStorage);
    }

    addToBasket(id: string, title?: string, imgUrl?: string, price?: number) {
        const index = this.basketItems.findIndex((item) => item.id === id);

        if (index !== -1) {
            this.basketItems[index].quantity++;
        } else {
            if (title && imgUrl && price) {
                this.basketItems.push({
                    id,
                    title,
                    quantity: 1,
                    imgUrl,
                    price,
                });
            }
        }

        localStorage.setItem("basket", JSON.stringify(this.basketItems));
    }

    decFrombasket(id: string) {
        const index = this.basketItems.findIndex((item) => item.id === id);

        if (index !== -1) {
            this.basketItems[index].quantity--;

            if (this.basketItems[index].quantity === 0)
                this.basketItems.splice(index, 1);
        }

        localStorage.setItem("basket", JSON.stringify(this.basketItems));
    }

    delFromBasket(id: string) {
        const index = this.basketItems.findIndex((item) => item.id === id);

        if (index !== -1) this.basketItems.splice(index, 1);

        localStorage.setItem("basket", JSON.stringify(this.basketItems));
    }
}
