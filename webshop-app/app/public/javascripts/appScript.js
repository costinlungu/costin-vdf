let productObj = {
  products: [
    {
      name: "Galaxy A12",
      brand: "Samsung",
      img: "images/galaxy_a12.png",
      operating_system: "Android",
      price: 899,
      discount: 0,
      quantity: -500,
      availability_date: "2021-11-24",
      rating: 4,
      color: "blue",
    },
    {
      name: "Galaxy a52s 5G",
      brand: "Samsung",
      img: "images/Galaxy_a52s_5G.png",
      operating_system: "Android",
      price: 1849,
      discount: 70,
      quantity: 2500,
      availability_date: "2021-08-17",
      rating: 5,
      color: "red",
    },
    {
      name: "Galaxy s21",
      brand: "Samsung",
      img: "images/Galaxy_s21.png",
      operating_system: "Android",
      price: 3899,
      discount: 50,
      quantity: 800,
      availability_date: "2021-01-29",
      rating: 4,
      color: "red",
    },
    {
      name: "Moto G30",
      brand: "Motorola",
      img: "images/Moto_G30.png",
      operating_system: "Android",
      price: 799,
      discount: 100,
      quantity: 1000,
      availability_date: "2021-03-17",
      rating: 4.5,
      color: "blue",
    },
    {
      name: "iPhone 13",
      brand: "Apple",
      img: "images/iPhone_13.png",
      operating_system: "iOS",
      price: 4449,
      discount: 0,
      quantity: 3500,
      availability_date: "2021-09-14",
      rating: 5,
      color: "white",
    },
    {
      name: "iPhone 13 Pro",
      brand: "Apple",
      img: "images/iPhone13Pro.png",
      operating_system: "iOS",
      price: 5699,
      discount: 0,
      quantity: 3000,
      availability_date: "2021-09-14",
      rating: 5,
      color: "black",
    },
    {
      name: "Mi 11 Lite 5G",
      brand: "Xiaomi",
      img: "images/Mi11_Lite_5G.png",
      operating_system: "Android",
      price: 1449,
      discount: 0,
      quantity: 1500,
      availability_date: "2021-03-29",
      rating: -1,
      color: "purple",
    },
    {
      name: "Pixel 6",
      brand: "Google",
      img: "images/Pixel6.png",
      operating_system: "Android",
      price: 649,
      discount: 0,
      quantity: 0,
      availability_date: "2021-10-23",
      rating: -1,
      color: "black",
    },
  ],
};

let products = productObj.products;

function displayAverageRatingByBrand(brandName) {
  let ratingsAverage = products.reduce(
    (
      (sumRatings, countPhones) => (averageRating, currentProduct) =>
        currentProduct.brand === brandName
          ? (sumRatings += currentProduct.rating) / ++countPhones
          : averageRating
    )(0, 0),
    0
  );
  return ratingsAverage.toFixed(2);
}

function displayProducts(filterFunction) {
  let html = "<ul>";
  let prod = productObj.products;

  if (filterFunction) {
    prod = prod.filter(filterFunction);
  }

  prod.forEach((product) => {
    html += `<li class="phone">`;
    if (product.img) {
      html += `<div class="phoneImage"><img class="imageClass" src="${product.img}" alt="Photo not found"></img></div>`;
    }
    html += `<h3 class="phoneName"><a href="/details/${product.name}" target=_blank>${product.brand} ${product.name}</a></h3>
    <p>Sistem de operare: <span>${product.operating_system}</span></p>`;
    if (product.discount > 0) {
      let finalPrice = product.price - product.discount;
      html += `
          <p><span class="discounted">${product.price}</span> &nbsp; ${finalPrice} lei</p>
      `;
    } else {
      html += `
      <p>${product.price} lei</p>
      `;
    }
    if (product.rating > 0) {
      html += `
      <p>${product.rating} (average: ${displayAverageRatingByBrand(
        product.brand
      )})</p>`;
    } else {
      html += `<p>-</p>`;
    }

    html += `</li>`;
  });
  html += "</ul>";

  document.getElementById("container").innerHTML = html;
}
displayProducts();

let searchFiltersButton = document.getElementById("search-filters-button");
let searchInput = document.getElementById("search-input");
let resetFiltersButton = document.getElementById("reset-filters-button");

function filterByBrands(item) {
  //pt brands
  let arraySearchFilters = [];

  let checkedBrands = document.querySelectorAll(
    "#filter-by-brand input[type=checkbox]:checked"
  );
  checkedBrands.forEach((item) => arraySearchFilters.push(item.value));

  if (arraySearchFilters.length > 0) {
    return arraySearchFilters.includes(item.brand.toLowerCase());
  } else {
    return true;
  }
}

function filterByPrice(item) {
  //pt price
  let arraySearchFiltersByPrices = [];
  let checkedRadioPrices = document.querySelectorAll(
    "#filter-by-price input[type=radio]:checked"
  );
  checkedRadioPrices.forEach((item) =>
    arraySearchFiltersByPrices.push(item.value)
  );

  if (arraySearchFiltersByPrices.length > 0) {
    arraySearchFiltersByPrices = arraySearchFiltersByPrices[0].split("-");

    if (arraySearchFiltersByPrices[0] === "") {
      return item.price < arraySearchFiltersByPrices[1];
    } else if (arraySearchFiltersByPrices[1] === "") {
      return item.price > arraySearchFiltersByPrices[0];
    } else {
      return (
        item.price > arraySearchFiltersByPrices[0] &&
        item.price < arraySearchFiltersByPrices[1]
      );
    }
  } else {
    return true;
  }
}

function filterByOS(item) {
  //pt os
  let arraySearchFiltersByOS = [];

  let checkedOS = document.querySelectorAll(
    "#filter-by-os input[type=checkbox]:checked"
  );
  checkedOS.forEach((item) => arraySearchFiltersByOS.push(item.value));

  if (arraySearchFiltersByOS.length > 0) {
    return arraySearchFiltersByOS.includes(item.operating_system.toLowerCase());
  } else {
    return true;
  }
}

searchFiltersButton.addEventListener("click", function () {
  let searchValue = searchInput.value;

  displayProducts(
    (item) =>
      (item.brand.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.name.toLowerCase().includes(searchValue.toLowerCase())) &&
      filterByBrands(item) &&
      filterByPrice(item) &&
      filterByOS(item)
  );
});

resetFiltersButton.addEventListener("click", function () {
  let checkedBrands = document.querySelectorAll(
    "#filter-by-brand input[type=checkbox]:checked"
  );
  let checkedRadioPrices = document.querySelectorAll(
    "#filter-by-price input[type=radio]:checked"
  );
  let checkedOS = document.querySelectorAll(
    "#filter-by-os input[type=checkbox]:checked"
  );
  checkedBrands.forEach((item) => (item.checked = false));
  checkedRadioPrices.forEach((item) => (item.checked = false));
  checkedOS.forEach((item) => (item.checked = false));
  displayProducts();
});
