(function(){
    // 1. this in global scope
    this.table = "window table";
    console.log(window.table);

    this.garage = {
        table: 'garage table',
        cleanTable: function(){
            console.log(`Cleaning ${this.table}`);
        }
    }
    console.log(this.garage.table);
    console.log(window.garage.table);
    this.garage.cleanTable();

    // 2. this in object or private scope
    let johnsRoom = {
        table: 'johns table'
    }; // let/var/const creates a private variable
    // console.log(this.johnsRoom.table); // Will throw error
    console.log(johnsRoom.table);

    // 3. this with method of object
    let johnsNewRoom = {
        table: 'johns new table',
        cleanTable: function(){
            console.log(`Cleaning ${this.table}`); // this has access to objects properties
        }
    }
    johnsNewRoom.cleanTable();

    // 4. this in function
    const cleanTable = function(soap) {
        console.log(`Cleaning ${this.table} with ${soap}`); // Inside a function this does not have access to window level - different than method in objects
    }

    // The above issue can be fixed with call(), apply or bind()
    cleanTable.call(this, 'Lux'); // calling cleantable function with this object that is window object
    cleanTable.call(this.garage, 'Nirma');
    cleanTable.call(johnsNewRoom, 'Cinthol');

    // 5. this inside an inner function
    const cleanTableWithInner = function(soap) {
        let that = this; // Solution 1 with that
        const innerFunction = function(_soap) {
            console.log(`Cleaning ${that.table} using ${_soap}`);
        }
        innerFunction(soap);
    }
    cleanTableWithInner.call(this, 'Surf Excel');

    const cleanTableWithInner2 = function(soap) {
        const innerFunction = function(_soap) {
            console.log(`Cleaning ${this.table} using ${_soap}`);
        }
        // Solution 2 with .call or bind or apply
        innerFunction.call(this, soap);
    }
    cleanTableWithInner2.call(this, 'Wheel');

    const cleanTableWithInner3 = function(soap) {
        const innerFunction = (_soap)=>{
            console.log(`Cleaning ${this.table} using ${_soap}`);
        }
        // Solution 3 with arrow function
        innerFunction.call(this, soap);
    }
    cleanTableWithInner3.call(this, 'Whirlpool');

    // 6. this inside a constructor
    let CreateTableConstructor = function(name) {
        this.table = `${name}'s table`
    }
    const kiransRoom = new CreateTableConstructor('Kiran Dash');
    const ramsRoom = new CreateTableConstructor('Sriram Kota');

    // Attaching prototype to constructor
    CreateTableConstructor.prototype.cleanTable = function(soap) {
        console.log(`Cleaning ${this.table} with ${soap}`); // Prototype methods have access to constructor this
    }
    kiransRoom.cleanTable('Margo');
    ramsRoom.cleanTable('Fargo');

    // 7. this inside a class
    class CreateTableClass {
        constructor(name){
            this.table = `${name}'s table`;
        }
        cleanTable(soap){
            console.log(`Cleaning ${this.table} with ${soap}`);
        }
    }
    const balasRoom = new CreateTableClass('Bala Krishnan');
    const manojsRoom = new CreateTableClass('Manoj');

    balasRoom.cleanTable('Sabu');
    manojsRoom.cleanTable('Rabu');
})();