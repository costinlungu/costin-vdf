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

let searchFiltersButton = document.getElementById("search-filters-button");
let searchInput = document.getElementById("search-input");
let resetFiltersButton = document.getElementById("reset-filters-button");

resetFiltersButton.addEventListener("click", function () {
  window.location.href = "http://localhost:3000/phones";
});
