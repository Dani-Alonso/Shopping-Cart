var app = new Vue({
    el: '#app',
    data: {
        "productsVue": [],
        "totalPriceVue": 0,
        "freeItemNumberVue": [],
        "sCart": [],
        "list": {},
        "cent": 0,
        "free": 0,
        "category": "All Categories",
        "search": "",
        "sort": ""

    },
    methods: {
        fillModal: function () {
            this.cent = 0;
            cart.getTotalPrice();
            $('#myModal').modal('show'); // abrir
        },

        fillCart: function (product) {
            product.qty++;
            this.sCart.push(product);
            cart.addProduct(product);
        },
        
        removeCart: function (product) {
            product.qty--;
            this.sCart.pop(product);
            cart.removeProduct(product);
 
            if( product.qty <= 0 ){
                
                product.qty= 0
            }
        },


        sortHigh: function () {

            var orderedHigh = this.productsVue.sort(function (a, b) {
                return (b.price - a.price)
            });
        },
        sortLow: function () {

            var orderedLow = this.productsVue.sort(function (a, b) {
                return (a.price - b.price)
            });
        },
    },

    computed: {

        categoryFilter: function () {


            if (this.category == "All Categories" && this.search == "")

            {

                return this.productsVue

            } else {

                return this.productsVue.filter((product) => {
                    return ((product.category.match(this.category) || this.category == "All Categories") && product.name.toUpperCase().includes(this.search.toUpperCase()))
                })
            };
        },
    }
});

class Product {

    constructor(name, price, description, category, photo) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
        this.photo = photo;
        this.qty = 0;

    }

    toString() {
        return this.name + " " + this.price + " " + this.description;
    }
}

let p1 = new Product("The Hobbit", 21, "The Hobbit follows the quest of home-loving hobbit Bilbo Baggins to win a share of the treasure guarded by Smaug the dragon.", "Fantasy", "images/hobbit.jpg");
app.productsVue.push(p1);
let p2 = new Product("The Battle of Kadesh", 19, "The Battle of Kadesh took place between the forces of the Egypt and the Hittite Empire at the city of Kadesh.", "History", "images/kadesh.jpg");
app.productsVue.push(p2);
let p3 = new Product("A Song of Ice and Fire", 12, "A Song of Ice and Fire is a series of epic fantasy novels by the American novelist and screenwriter George R. R. Martin. He began the first volume of the series, A Game of Thrones, in 1991.", "Fantasy", "images/songIceAndFire.jpg");
app.productsVue.push(p3);
let p4 = new Product("World of Warcraft: The Official Cookbook", 25, "Prepare a feast fit for a warchief with World of Warcraft: The Official Cookbook, a delicious compendium of recipes inspired by the hit online game from Blizzard Entertainment.", "Cookbook", "images/wowCookbook.jpg");
app.productsVue.push(p4);

console.log(p1.toString());

fillDropdown(app.productsVue)

class ShoppingCart {

    constructor() {

        this.products = [];
        this.totalPrice = 0;
        this.freeItemNumber = [];
    }

    addProduct(product) {

        this.products.push(product);



        if (app.list.hasOwnProperty(product.name)) {
            app.list[product.name].Count += 1;
            app.list[product.name].Price += +product.price;

            console.log("si" + product.name)
        } else { //si no esta en list lo crea
            console.log("no" + product.name)
            app.list[product.name] = {
                "Count": 1,
                "Price": product.price,
                "Photo": product.photo
            }
        }
    }
    
    removeProduct(product) {

        this.products.pop(product);



        if (app.list.hasOwnProperty(product.name)) {
            app.list[product.name].Count -= 1;
            app.list[product.name].Price -= +product.price;

            console.log("si" + product.name)
        } else { //si no esta en list lo crea
            console.log("no" + product.name)
            app.list[product.name] = {
                "Count": 1,
                "Price": product.price,
                "Photo": product.photo
            }
        }
    }

    getTotalPrice() {
        console.log("In")

        this.totalPrice = 0;
        console.log(this.products.length);

        app.list = {};

        for (var i = 0; i < this.products.length; i++) {
            console.log(i)

            this.totalPrice += this.products[i].price;
            app.totalPriceVue += this.products[i].price;



            if (app.list.hasOwnProperty(this.products[i].name)) { /*per veure si tenim el producte al carro*/
                app.list[this.products[i].name].Count += 1;

            } else { //si no esta en list lo crea
                app.list[this.products[i].name] = {
                    "Count": 1,
                    "Price": this.products[i].price,
                    "Photo": this.products[i].photo
                };
            }
        }


        for (var product in app.list) {
            var counter = Math.floor(app.list[product].Count / 4);
            if (counter > 0) {


                for (var i = 0; i < counter; i++) {

                    app.totalPriceVue = app.totalPriceVue - (this.freeItemNumber[i] * app.list[product].Price);
                }

                app.list[product].itemFree = counter;
                console.log(app.list[product].itemFree);
            }
        }


        console.log(this.totalPrice);
        console.log(app.list);

        if (this.products.length >= 5) {
            app.cent = (this.totalPrice * 10) / 100;
            console.log(app.cent);
            app.totalPriceVue = app.totalPriceVue - app.cent;
        }

        app.totalPriceVue = this.totalPrice;
    }
}

function fillDropdown(products) {

    var dpD = document.getElementById("dropd"); //agafo referencia del input dropdown
    var categorySelected = []; // buido array de seleccionats

    console.log(products.length + 3)

    for (var i = 0; i < products.length; i++) {

        console.log(categorySelected + 1);
        if (!categorySelected.includes(products[i].category)) { // si el element array[i].state no esta inclos a stateselected
            categorySelected.push(products[i].category);
        }
        categorySelected.sort();
        console.log(categorySelected);
    }


    for (var i = 0; i < categorySelected.length; i++) {

        var opt = document.createElement("option"); //creo el element option
        opt.setAttribute("value", categorySelected[i]);
        opt.textContent = categorySelected[i];
        dpD.appendChild(opt);
    }
}


let cart = new ShoppingCart();

console.log("We have a " + cart);
