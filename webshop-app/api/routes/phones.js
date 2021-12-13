const path = require("path");
const fs = require("fs");
var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  let products = fs.readFileSync("./products.json", "utf8");
  let parsedProducts = JSON.parse(products);

  console.log(req.query);

  res.json(parsedProducts.products);

  // let filteredProducts = parsedProducts.products.filter(
  //   (item) =>
  //     filterByBrands(item, req.query.brand) &&
  //     filterByPrice(item, req.query.price) &&
  //     filterByOS(item, req.query.os)
  // );
  // console.log(filteredProducts);

  // res.json(filteredProducts);
});

function filterByBrands(item, checkedBrands) {
  if (checkedBrands.length > 0) {
    return checkedBrands.includes(item.brand);
  } else {
    return true;
  }
}

function filterByPrice(item, checkedRadioPrices) {
  if (checkedRadioPrices) {
    checkedRadioPrices = checkedRadioPrices.split("-");

    if (checkedRadioPrices[0] === "") {
      return item.price < checkedRadioPrices[1];
    } else if (checkedRadioPrices[1] === "") {
      return item.price > checkedRadioPrices[0];
    } else {
      return (
        item.price > checkedRadioPrices[0] && item.price < checkedRadioPrices[1]
      );
    }
  } else {
    return true;
  }
}

function filterByOS(item, checkedOS) {
  if (checkedOS) {
    return checkedOS.indexOf(item.operating_system) !== -1;
  } else {
    return true;
  }
}

module.exports = router;
