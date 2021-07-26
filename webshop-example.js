const prettyPrintOrder = (order) => {
  console.log(
    `
=====================================================
order for:      ${order.userId}
status:         ${order.status}
${order.paymentInformation ? 
`payment information:
    Card#: ${order.paymentInformation.cardNumber}
    ${order.paymentInformation.street} ${order.paymentInformation.number}
    ${order.paymentInformation.postalCode} ${order.paymentInformation.city}` :
''}

items:
${order.items.map(item => `    ${item.name}             €${item.price}`).join('\n')}
------------------------------------------------------
total: ${order.items.reduce((acc, curr) => acc + curr.price, 0)}
=======================================================
    `
  )
}

const coffee = {name: 'Coffee', price: 2};
const fishAndChips = {name: 'Fish & Chips', price: 14};
const water = {name: 'Water', price: 2};
const financialInformation = {
  street: 'Wallaby Way',
  number: '42',
  postalCode: '2011',
  city: 'Sydney',
  cardNumber: 'BE52 123456789'
};
const table1 = 'Table 1';
const wrongTable = 'Invalid table';


// the restaurant version with callbacks... the old way
const createNewOrderWithCallback = (tableId, callback) => {
  if (!['Table 1', 'Table 2', 'Table 3'].includes(tableId)) {
    throw new Error(`${tableId} is not an existing table!`);
  }
  const order = {
    userId: tableId,
    status: 'new',
    items: [],
    paymentInformation: undefined
  }
  setTimeout(() => callback(order), 500);
}

const addItemWithCallback = async (order, item, callback) => {
  setTimeout(() => {
    order.items.push(item);
    callback(order);
  }, 500);
}

const addPaymentInformation = async (order, paymentInformation, callback) => {
  setTimeout(() => {
    order.paymentInformation = paymentInformation;
    callback(order);
  }, 500);
}

const finalizeOrderWithCallback = async (order, callback) => {
  setTimeout(() => {
    if (order.paymentInformation === undefined) {
      throw new Error('No shipping information provided! Cannot complete order!');
    }
    order.status = 'completed';
    callback(order);
  });
}


// using the functions:
/*
createNewOrderWithCallback(table1, createdOrder => {
  addItemWithCallback(createdOrder, Coffee, orderWithCoffee => {
    addItemWithCallback(orderWithCoffee, fishAndChips, orderWithFood => {
      addItemWithCallback(orderWithFood, water, orderWithWater => {
        addPaymentInformation(orderWithWater, financialInformation, orderWithShippingInfo => {
          finalizeOrderWithCallback(orderWithShippingInfo, finalizedOrder => {
            prettyPrintOrder(finalizedOrder);
          })
        })
      })
    })
  })
});
*/









/// thee solution: Promises
/*
console.log(new Promise((resolve, reject) => {

}));
*/

/*
(new Promise((resolve, reject) => {
  console.log('I am executed first');
  setTimeout(() => {
    console.log('i am in the setTimeout part');
    resolve();
  }, 500);
})).then(() => console.log('I am only executed after the promise resolves'));
console.log('I am executed before the promise resolves');
*/

// the webshop version with promises, a more elegant solution
const createNewOrderWithPromise = (tableId) => {
  return new Promise((resolve, reject) => {
    if (!['Table 1', 'Table 2', 'Table 3'].includes(tableId)) {
      reject(`${tableId} is not an existing table!`);
    }
    const order = {
      userId: tableId,
      status: 'new',
      items: [],
      paymentInformation: undefined
    }
    setTimeout(() => resolve(order), 500);
  });
}

const addItemWithPromise = (order, item) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      order.items.push(item);
      resolve(order);
    }, 500);
  });
}

const addpaymentInformationWithPromise = (order, paymentInformation) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      order.paymentInformation = paymentInformation;
      resolve(order);
    }, 500);
  });
}

const finalizeOrderWithPromise = (order) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (order.paymentInformation === undefined) {
        reject('No payment information provided! Cannot complete order!');
      }
      order.status = 'completed';
      resolve(order);
    });
  });
}

// consuming the promises api


// no errors
/*
createNewOrderWithPromise(table1)
  .then(order => addItemWithPromise(order, coffee))
  .then(order => addItemWithPromise(order, fishAndChips))
  .then(order => addItemWithPromise(order, water))
  .then(order => addpaymentInformationWithPromise(order, financialInformation))
  .then(order => finalizeOrderWithPromise(order))
  .then(order => prettyPrintOrder(order));
*/

// in case te user did not pay
/*
createNewOrderWithPromise(table1)
  .then(order => addItemWithPromise(order, coffee))
  .then(order => addItemWithPromise(order, fishAndChips))
  .then(order => addItemWithPromise(order, water))
  // .then(order => addpaymentInformationWithPromise(order, myAddress))
  .then(order => finalizeOrderWithPromise(order))
  .then(order => prettyPrintOrder(order))
  .catch(err => console.log(err));
*/


// invalid table
/*
createNewOrderWithPromise(wrongTable)
  .then(order => addItemWithPromise(order, coffee))
  .then(order => addItemWithPromise(order, fishAndChips))
  .then(order => addItemWithPromise(order, water))
  .then(order => addpaymentInformationWithPromise(order, myAddress))
  .then(order => finalizeOrderWithPromise(order))
  .then(order => prettyPrintOrder(order))
  .catch(err => console.log(err));
*/

// consuming the promisified webshop api using async await, it's like writing synchronous code

const asyncFunction = async () => {
  try {
    let order = await createNewOrderWithPromise(table1);
    order = await addItemWithPromise(order, coffee);
    order = await addItemWithPromise(order, fishAndChips);
    order = await addItemWithPromise(order, water);
    order = await addpaymentInformationWithPromise(order, financialInformation);
    order = await finalizeOrderWithPromise(order);
    prettyPrintOrder(order);
  } catch (error) {
    console.log(error);
  }
}
asyncFunction();