console.log("Example with class");

// Instead of a function that creates a car,
// we define a class Car

// A class looks much cleaner, and has many other advantages.

/*
You can play with the Car class in main3.js to understand how it works.
Suggested exercises:

1) Add another property like model, so you can create a "Ford" with model "Mondeo". Make the status method display the model too.
2) Fix the brake method so the car never reduces its speed below zero (a Car can't run at -50 km/h) even when you try to brake more than necessary.
3) Add a new method to stop the car immediately (set the speed to 0). It doesn't need parameters.
4) Add a method that returns a boolean saying if the car is running (speed is greater than zero) or not.
*/

class Car {

    // The constructor initializes the properties.
    // It gets called when we do: new Car(some_brand)
    constructor(brand, model) {
        this.brand = brand;
        this.speed = 0;
        this.model = model;
    }

    // methods:

    // (notice that now we don't say "function" and that we
    //  don't put a comma after closing brace of the function)

    accelerate(amount) {
        this.speed += amount;
    }

    brake(amount) {
        this.speed -= amount;


        if (this.speed < 0) {

            this.speed = 0;
        }
    }


    conditionBoolean() {

        if (this.speed > 0) {

            return true;

        } else {
            return false;
        }
    }

    toString() {
        return this.brand + " running at " + this.speed + " km/h. Is running? " + this.conditionBoolean();

    }
    stop() {

        this.speed = 0;
    }
}
// Now we use create a Car object using the class

var car = new Car("Ford", "Mondeo");

console.log(car.toString());
car.accelerate(50);
console.log(car.toString());
car.accelerate(100);
console.log(car.toString());
car.stop();
car.brake(200);
console.log(car.toString());


// We may create other cars easily

var car2 = new Car("Ferrari");
car2.accelerate(200);
console.log(car2.toString());
car2.stop();
console.log(car2.toString());
console.log("my car status is: " + car2);





//You can also try to create other classes. For example a TV class:
//
//1) Create a TV class with properties like brand, channel and volume.
//    Specify brand in a constructor parameter. Channel should be 1 by default. Volume should be 50 by default.
//2) Add methods to increase and decrease volume. Volume can't never be below 0 or above 100.
//3) Add a method to set the channel. Let's say the TV has only 50 channels so if you try to set channel 60 the TV will stay at the current channel.
//4) Add a method to reset TV so it goes back to channel 1 and volume 50. (Hint: consider using it from the constructor).
//5) It's useful to write a status, that returns info about the TV status like: "Panasonic at channel 8, volume 75".

class TV {

    // The constructor initializes the properties.
    // It gets called when we do: new Car(some_brand)
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
        this.channel = 1;
        this.volume = 50;
    }

    increaseVolume(amount) {
        this.volume += amount;


        if (this.volume > 100) {

            this.volume = 100;
        }
    }

    decreaseVolume(amount) {
        this.volume -= amount;


        if (this.volume < 0) {

            this.volume = 0;
        }
    }

    setChannel(newChannel) {
        if (newChannel >= 0 && newChannel <= 50) {
            this.channel = newChannel;
        }

    }

    resetTv() {

        this.channel = 1;
        this.volume = 50;

    }

    toString() {

        return this.brand + " " + this.model + " is at channel " + this.channel + " and volume " + this.volume;
    }

}


var tv = new TV("Samsung", "600p");


tv.increaseVolume(70);
console.log(tv.volume);
tv.decreaseVolume(20);
tv.setChannel(25);
tv.setChannel(75);

console.log(tv.volume);
console.log(tv.toString());
