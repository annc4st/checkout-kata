class Product {
    constructor(sku, price) {
      this.sku = sku;
      this.price = price;
    }
  }
  
  
  class SpecialDeal {
    constructor(sku, quantity, specialPrice) {
      this.sku = sku;
      this.quantity = quantity;
      this.specialPrice = specialPrice;
    }
  }
  

  class Checkout {
    constructor(prices, specialDeals) {
      this.prices = prices.map(({ sku, price }) => new Product(sku, price));
      this.specialDeals = specialDeals.map(
        ({ sku, quantity, specialPrice }) =>
          new SpecialDeal(sku, quantity, specialPrice)
      );
      this.scanned = [];
    }
  
    scan(item) {
      const product = this.prices.find((p) => p.sku === item);
      if (product) {
        this.scanned.push(item);
      } else {
        console.log(`Item ${item} not found.`);
        throw new Error(`Error: Item ${item} not found.`)
      }
    }
  
    getScanned() {
      return this.scanned;
    }
  
    getTotal() {
      let total = 0;

      const skuCount = this.scanned.reduce((acc, currVal) => {
          acc[currVal] = (acc[currVal] || 0) + 1;
          return acc;
        }, {});
    
      for (const skuLetter in skuCount) {
        const product = this.prices.find((item) => item.sku === skuLetter);
        const specialDeal = this.specialDeals.find(
          (deal) => deal.sku === skuLetter && deal.quantity <= skuCount[skuLetter]
        );
  
        if (specialDeal) {
          let specialDealNumber = Math.floor(
              skuCount[skuLetter] / specialDeal.quantity
          );
  
          total += specialDeal.specialPrice * specialDealNumber;
  
          skuCount[skuLetter] -= specialDeal.quantity * specialDealNumber;
          if (skuCount[skuLetter] > 0) {
            total += skuCount[skuLetter] * product.price;
          }
  
          if (skuCount[skuLetter] >= specialDeal.quantity) {
            total += specialDeal.specialPrice * specialDealNumber;
            skuCount[skuLetter] -= specialDealNumber * specialDeal.quantity;
          }
        } else if (product) {
          total += skuCount[skuLetter] * product.price;
        }
      }
      return total;
    }
  }
  
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
  
  const checkout = new Checkout(prices, specialDeals);
  checkout.scan('A')
  checkout.scan('A')
  checkout.scan('A')
  checkout.scan('B')
  checkout.scan('A')
  const total = checkout.getTotal();
  console.log(`Total Price: ${total}`);
  
  module.exports = { Product, SpecialDeal, Checkout };
  