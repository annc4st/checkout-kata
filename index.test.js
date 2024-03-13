const { Checkout } = require("./index.js");

const prices = [
  { sku: "A", price: 50 },
  { sku: "B", price: 30 },
  { sku: "C", price: 20 },
  { sku: "D", price: 15 },
];

const specialDeals = [
  { sku: "A", quantity: 3, specialPrice: 130 },
  { sku: "B", quantity: 2, specialPrice: 45 },
];

describe("Checkout testing", () => {
  test("1 no items, total cost : 0 ", () => {
    let products = "";
    const checkout = new Checkout(prices, specialDeals);
    const result = checkout.getTotal();
    
    expect(result).toEqual(0);
  });
  test("2 item 'A' cost : 50", () => {
    const checkout = new Checkout(prices, specialDeals);
    let products = "A";
    checkout.scan('A')
    const result = checkout.getTotal();

    expect(result).toEqual(50);
  });
  test("3 item 'B' cost : 30", () => {
    let products = "B";
    const checkout = new Checkout(prices, specialDeals);
    checkout.scan('B')
    const result = checkout.getTotal();
    expect(result).toEqual(30);
  });
  test("4 item 'C' cost : 20", () => {
    let products = "C";
    const checkout = new Checkout(prices, specialDeals);
    checkout.scan('C')
    const result = checkout.getTotal();
    expect(result).toEqual(20);
  });
  test("5 item 'AA' cost : 100", () => {
    let products = "AA";
    const checkout = new Checkout(prices, specialDeals);
    checkout.scan('A')
    checkout.scan('A')
    const result = checkout.getTotal();
    expect(result).toEqual(100);
  });
  test("6 item 'AAA' cost : 130", () => {
    let products = "AAA";
    const checkout = new Checkout(prices, specialDeals);
    checkout.scan('A')
    checkout.scan('A')
    checkout.scan('A')
    const result = checkout.getTotal();
    expect(result).toEqual(130);
  });
  test("7 item 'BB' cost : 45", () => {
    let products = "BB";
    const checkout = new Checkout(prices, specialDeals);
    checkout.scan('B')
    checkout.scan('B')
    const result = checkout.getTotal();
    expect(result).toEqual(45);
  });
  test("8 item 'BAB' cost : 95", () => {
    let products = "BAB";
    const checkout = new Checkout(prices, specialDeals);
    checkout.scan('B')
    checkout.scan('A')
    checkout.scan('B')
    const result = checkout.getTotal();
    expect(result).toEqual(95);
  });
  test("9 item 'AAABA' cost : 210", () => {
    let products = "AAABA";
    const checkout = new Checkout(prices, specialDeals);
    
    checkout.scan('A')
    checkout.scan('A')
    checkout.scan('A')
    checkout.scan('B')
    checkout.scan('A')
    const result = checkout.getTotal();
    expect(result).toEqual(210);
  });
  test("10 item 'BBABBB' cost :170", () => {
    let products = "BBABBB";
    const checkout = new Checkout(prices, specialDeals);
    checkout.scan('B')
    checkout.scan('B')
    checkout.scan('A')
    checkout.scan('B')
    checkout.scan('B')
    checkout.scan('B')
    const result = checkout.getTotal();
    expect(result).toEqual(170);
  });
  test("11 item 'J' - doesn't exist", () => {
    const checkout = new Checkout(prices, specialDeals);
    const consoleSpy = jest.spyOn(console, 'log');
    expect(() => checkout.scan('J')).toThrow('Error: Item J not found.');
    expect(consoleSpy).toHaveBeenCalledWith('Item J not found.');
    consoleSpy.mockRestore(); 
  })
});
