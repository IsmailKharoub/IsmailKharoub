import assert from "node:assert/strict";
import test from "node:test";
import { normalizeFamily } from "../src/catalog.js";

const family = { id: "iphone18pro", name: "iPhone 18 Pro" };

function payload() {
  return {
    body: {
      productLocatorOverlayData: {
        productLocatorMeta: {
          prices: {
            "1199_00_att_iphone_18_pro": { fullPrice: "$1,099.00" },
            "1199_00_unlocked_iphone_18_pro": { fullPrice: "$1,199.00" },
            "1299_00_unlocked_iphone_18_pro_max": { fullPrice: "$1,299.00" },
          },
          dimensionsVariations: {
            dimensionScreensize: [
              { key: "6_3inch", value: "iPhone 18 Pro" },
              { key: "6_9inch", value: "iPhone 18 Pro Max" },
            ],
            dimensionColor: [
              { key: "black", value: "Black", swatchImage: { imageName: "finish-black" } },
              { key: "silver", value: "Silver", swatchImage: { imageName: "finish-silver" } },
            ],
            dimensionCapacity: [{ key: "256gb" }],
          },
          products: [
            {
              partNumber: "MJQ34LL/A",
              productTitle: "iPhone\u00a018\u00a0Pro 256GB Black AT&T",
              price: "1199_00_att_iphone_18_pro",
              dimensionScreensize: "6_3inch",
              dimensionColor: "black",
              dimensionCapacity: "256gb",
              image: "hero-black",
              productLink: "/shop/buy-iphone/iphone-18-pro/black",
              carrierModel: "ATT_IPHONE18PRO",
            },
            {
              partNumber: "MJQ34LL/A",
              productTitle: "iPhone\u00a018\u00a0Pro 256GB Black",
              price: "1199_00_unlocked_iphone_18_pro",
              dimensionScreensize: "6_3inch",
              dimensionColor: "black",
              dimensionCapacity: "256gb",
              image: "hero-black",
              productLink: "/shop/buy-iphone/iphone-18-pro/black",
              carrierModel: "UNLOCKED/US",
            },
            {
              partNumber: "MJW44LL/A",
              productTitle: "iPhone 18 Pro Max 256GB Black",
              price: "1299_00_unlocked_iphone_18_pro_max",
              dimensionScreensize: "6_9inch",
              dimensionColor: "black",
              dimensionCapacity: "256gb",
              image: "hero-max",
              productLink: "https://www.apple.com/shop/buy-iphone/iphone-18-pro/max",
              carrierModel: "UNLOCKED/US",
            },
          ],
        },
      },
    },
  };
}

test("catalog keeps one unlocked configuration per part", () => {
  const normalized = normalizeFamily(family, payload());
  assert.equal(normalized.models.length, 2);
  const pro = normalized.models.find((item) => item.id === "6_3inch");
  assert.equal(pro.products.length, 1);
  assert.equal(pro.products[0].title, "iPhone 18 Pro 256GB Black");
  assert.equal(pro.products[0].price, 1199);
  assert.equal(pro.products[0].priceLabel, "$1,199.00");
  assert.equal(pro.products[0].buyUrl, "https://www.apple.com/shop/buy-iphone/iphone-18-pro/black");
  assert.equal(pro.colors[0].swatch, "finish-black");
});

test("capacity falls back to the product title", () => {
  const body = payload();
  const meta = body.body.productLocatorOverlayData.productLocatorMeta;
  meta.dimensionsVariations.dimensionScreensize = [];
  meta.dimensionsVariations.dimensionCapacity = [];
  meta.products = [
    {
      partNumber: "MYAW3LL/A",
      productTitle: "iPhone 16 128GB Teal",
      price: "1199_00_unlocked_iphone_18_pro",
      dimensionColor: "black",
      image: "hero-16",
      productLink: "/shop/buy-iphone/iphone-16/teal",
    },
  ];
  const normalized = normalizeFamily({ id: "iphone16", name: "iPhone 16" }, body);
  assert.equal(normalized.models[0].name, "iPhone 16");
  assert.equal(normalized.models[0].products[0].capacity, "128GB");
});
