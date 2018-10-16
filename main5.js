console.log("Objects containing other objects");

// Let's remember our Product class

class Product {

    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    toString() {
        return this.name + " " + this.price + "€";
    }
}

// And create a couple of products
let p1 = new Product("vacuumcleaner", 100);
let p2 = new Product("pencil", 3);
let p3 = new Product("bike", 300);
let p4 = new Product("Orange", 2)

// Now, let's create a ShoppingCart class, that will contain products

class ShoppingCart {

    constructor() {
        this.products = []; // empty at first
        this.totalPrice = 0;
        this.list = {}
        this.freeItemNumber = [];

        this.stock = 0;
    }

    addProduct(product) {
        this.products.push(product);
    }

    toString() {
        return "total price: " + this.getTotalPrice();
    }

    getTotalPrice() {

        this.totalPrice = 0; /*igualem el total price a 0*/

        for (let i = 0; i < this.products.length; i++) {

            this.totalPrice += this.products[i].price;

            if (this.list.hasOwnProperty(this.products[i].name)) { /*per veure si tenim el producte al carro*/
                this.list[this.products[i].name].Count += 1;
            } else {
                this.list[this.products[i].name] = {
                    "Count": 1,
                    "Price": this.products[i].price
                };
            }
        }
        console.log(this.totalPrice);
        console.log(this.list);

        if (this.products.length >= 5) {
            let tenCent = (this.totalPrice * 10) / 100;
            console.log(tenCent)
            this.totalPrice -= tenCent;
        }





        for (var key in this.list) {

            if (Math.floor(this.list[key].Count / 4) > 0) {

                this.freeItemNumber.push(Math.floor(this.list[key].Count / 4));

                for (var i = 0; i < this.freeItemNumber.length; i++) {

                    if (this.freeItemNumber[i] >= 1) {
                        
                        this.totalPrice = this.totalPrice - (this.freeItemNumber[i] * this.list[key].Price);
                    }
                }
            }
        }
        return this.totalPrice;
    }


    stock() {



        if (this.list[key].Count = 0) {


        }
    }
}
// We can create a cart and add the products we created before

let cart = new ShoppingCart();
cart.addProduct(p1);
cart.addProduct(p2);
cart.addProduct(p3);
cart.addProduct(p1);
cart.addProduct(p2);
cart.addProduct(p3);
cart.addProduct(p1);
cart.addProduct(p1);
cart.addProduct(p1);
cart.addProduct(p1);
cart.addProduct(p1);
cart.addProduct(p4);



console.log("We have a " + cart);
