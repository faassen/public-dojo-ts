import { Shop, Item } from "./gilded_rose";

describe("General rules", function () {
  it("Quality decrease within sell period", function () {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 20),]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(19);
    expect(items[0].sellIn).toBe(9);
  });
  it("Quality decrease after sell period", function () {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 0, 20),]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
    expect(items[0].sellIn).toBe(-1);
  });
  it("Quality decrease day before sell by date", function () {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 1, 20),]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(19);
    expect(items[0].sellIn).toBe(0);
  });
  it("Quality cannot become negative", function () {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 1, 0),]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
  it("Initial quality can be more than 50", function () {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 1, 60),]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(59);
  });

});

describe("Aged Brie rules", function () {
 
  it("Quality increases with age", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 0),]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
    expect(items[0].sellIn).toBe(1);
  });

  it("Quality should not increase above 50", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 50),]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  })

  it("Quality increases twice as fast after expiry date", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 20),]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
  })

  it("Quality should not increase above 50 after expired sell date", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 49),]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  })

});

describe("Sulfuras rules", function () {
 
  it("Sulfuras does not decrease in quality", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80),]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(0);
  });

  it("Sulfuras does never have to be sold", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 80),]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(-1);
  });

  it("Sulfuras sell by date does not change", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 5, 80),]);
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(5);
  });

});
