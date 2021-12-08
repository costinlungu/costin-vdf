let objProducts = {
  products: [
    {
      name: "Galaxy A12",
      brand: "Samsung",
      images: "images/galaxy_a12.png",
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
      images: "images/Galaxy_a52s_5G.png",
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
      images: "images/Galaxy_s21.png",
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
      images: "images/Moto_G30.png",
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
      images: "images/iPhone_13.png",
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
      images: "images/iPhone13Pro.png",
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
      images: "images/Mi11_Lite_5G.png",
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
      images: "images/Pixel6.png",
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

const url = window.location.pathname;
console.log(url);
const phoneName = decodeURI(url.slice(9));

// const urlParams = new URLSearchParams(window.location.search);
// const phoneName = urlParams.get("phone");
console.log(phoneName);

let product = objProducts.products.find((item) => item.name === phoneName);
console.log(product);

if (product) {
  document.getElementById("imgPhone").setAttribute("src", product.images);

  document.getElementById("name").innerHTML =
    product.brand + " " + product.name;
  document.getElementById("os").innerHTML = product.operating_system;
  document.getElementById("price").innerHTML = product.price;
  document.getElementById("availability").innerHTML = product.availability_date;
  document.getElementById("imgPhone").innerHTML = product.images;
}
if (!product) {
  window.location.href = "/error";
}
