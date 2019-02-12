; 'use strict';

// the constructor to decorate
function MacBook () {

    this.cost = function () {
        return 997;
    }

    this.screenSize = function () {
        return 11.6;
    }
}

// decorator 1
function memory ( macbook ) {
    let v = macbook.cost();

    macbook.cost = function() {
        return v + 75;
    }

}

// decorator 2
function engraving( macbook ) {
    let v  = macbook.cost();

    macbook.cost =  function() {
        return  v + 200;
    }
}

//decorator 3
function insurance ( macbook ) {
    let v = macbook.cost();
    macbook.cost = function() {
        return v + 250;
    }
}

let mb = new MacBook();

memory( mb );
engraving( mb );
insurance( mb );

console.log( mb.cost() );
console.log( mb.screenSize() );