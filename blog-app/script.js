import { backendUrl } from "./constantsAPI";

function cleanUpBody() {
  if (body) {
    body.querySelectorAll("*").forEach((n) => n.remove());
  }
}

function fetchHomepageData() {
  cleanUpBody();

  fetch(
    // "http://localhost:3000/articles"
    backendUrl.resources.articles,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      createHead();
      renderNavbar();
      createBtnAddArticle();
      renderArticle(data);
      renderFooter();
      body.appendChild(createModal());
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function fetchDetailsArticleData() {
  cleanUpBody();

  fetch(
    // backendUrl.resources.detailsArticle
    "http://localhost:3000/detailsArticle",
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      createHead();
      renderNavbar();
      renderDetailsArticle(data);
      renderFooter();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function createHead() {
  let head = document.getElementsByTagName("head")[0];

  let linkCDNJS = document.createElement("link");
  linkCDNJS.rel = "stylesheet";
  linkCDNJS.href =
    "https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css";

  head.appendChild(linkCDNJS);

  let linkFonts = document.createElement("link");
  linkFonts.rel = "stylesheet";
  linkFonts.href = "https://fonts.googleapis.com/css?family=Cardo|Montserrat";

  head.appendChild(linkFonts);

  let linkStyleCSS = document.createElement("link");
  linkStyleCSS.rel = "stylesheet";
  linkStyleCSS.type = "text/css";
  linkStyleCSS.href = "style.css";

  head.appendChild(linkStyleCSS);
}

const body = document.getElementById("body");
const container = document.createElement("div");
container.setAttribute("class", "container");

const main = document.createElement("main");
main.setAttribute("class", "main");

function createNavbar() {
  let nav = document.createElement("nav");
  nav.setAttribute("class", "nav");

  let navContainer = document.createElement("ul");
  navContainer.setAttribute("class", "nav__container");

  let navItem = document.createElement("li");
  navItem.setAttribute("class", "nav__item");

  let navItemTravel = document.createElement("a");
  navItemTravel.setAttribute("class", "nav__link");
  navItemTravel.textContent = "Travel Updates";
  navItemTravel.href = "#travel";

  let navItemReviews = document.createElement("a");
  navItemReviews.setAttribute("class", "nav__link");
  navItemReviews.textContent = "Review";
  navItemReviews.href = "#review";

  let navItemAbout = document.createElement("a");
  navItemAbout.setAttribute("class", "nav__link");
  navItemAbout.textContent = "About";
  navItemAbout.href = "#about";

  let navItemContact = document.createElement("a");
  navItemContact.setAttribute("class", "nav__link");
  navItemContact.textContent = "Contact";
  navItemContact.href = "#contact";

  let divTheme = document.createElement("div");
  divTheme.setAttribute("class", "theme-switch-wrapper");

  let labelTheme = document.createElement("label");
  labelTheme.setAttribute("class", "theme-switch");
  labelTheme.setAttribute("for", "checkbox");

  divTheme.appendChild(labelTheme);

  let inputTheme = document.createElement("input");
  inputTheme.setAttribute("type", "checkbox");
  inputTheme.setAttribute("id", "checkbox");
  labelTheme.appendChild(inputTheme);

  let sliderTheme = document.createElement("div");
  sliderTheme.setAttribute("class", "slider round");
  labelTheme.appendChild(sliderTheme);

  // append all to body
  body.appendChild(container);
  container.appendChild(divTheme);

  container.appendChild(nav);
  nav.appendChild(navContainer);
  navContainer.appendChild(navItem);
  navItem.appendChild(navItemTravel);
  navItem.appendChild(navItemReviews);
  navItem.appendChild(navItemAbout);
  navItem.appendChild(navItemContact);

  return container;
}

function createBtnAddArticle() {
  let divBtn = document.createElement("div");
  divBtn.setAttribute("class", "add__container");
  container.appendChild(divBtn);

  let addBtn = document.createElement("button");
  addBtn.setAttribute("type", "button");
  addBtn.setAttribute("class", "button button__addArticle");
  addBtn.textContent = " + Add Article";
  divBtn.appendChild(addBtn);
}

function createArticle(article) {
  for (let i = 0; i < article.length; i++) {
    const domArticle = document.createElement("article");
    domArticle.setAttribute("id", "article");

    const domTitle = document.createElement("h2");
    domTitle.textContent = article[i].title;
    domTitle.setAttribute("class", "title");

    const domUlArticle = document.createElement("ul");
    domUlArticle.setAttribute("class", "info__container");

    let articleDetails = document.createElement("li");
    articleDetails.setAttribute("class", "info__item");
    articleDetails.textContent = article[i].articleDetails;
    let addedBy = document.createElement("li");
    addedBy.setAttribute("class", "info__item");
    addedBy.textContent = article[i].addedBy;
    let author = document.createElement("span");
    author.setAttribute("class", "info__mark");
    author.textContent = article[i].authorMark;
    let postDate = document.createElement("li");
    postDate.setAttribute("class", "info__item");
    postDate.textContent = article[i].postDate;

    domUlArticle.appendChild(articleDetails);
    domUlArticle.appendChild(addedBy);
    addedBy.appendChild(author);
    domUlArticle.appendChild(postDate);

    let image = document.createElement("img");
    image.setAttribute("class", "img");
    image.setAttribute("src", "./img/" + article[i].image);

    let divContentContainer = document.createElement("div");
    divContentContainer.setAttribute("class", "content__container");

    let paragraph1 = document.createElement("p");
    let paragraph2 = document.createElement("p");
    paragraph1.textContent = article[i].paragraph1;
    paragraph2.textContent = article[i].paragraph2;

    main.appendChild(domArticle);
    domArticle.appendChild(domTitle);
    domArticle.appendChild(domUlArticle);

    domArticle.appendChild(createBtnsArticle());

    domArticle.appendChild(image);
    domArticle.appendChild(divContentContainer);
    divContentContainer.appendChild(paragraph1);
    divContentContainer.appendChild(paragraph2);

    domArticle.appendChild(createBtnReadMore());
  }
  return main;
}

function createBtnsArticle() {
  let divBtn = document.createElement("div");
  divBtn.setAttribute("class", "actions__container");

  let editBtn = document.createElement("button");
  editBtn.setAttribute("type", "button");
  editBtn.setAttribute("class", "actions__btn");
  editBtn.textContent = "Edit";
  divBtn.appendChild(editBtn);

  let deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("type", "button");
  deleteBtn.setAttribute("class", "actions__btn");
  deleteBtn.textContent = "Delete";
  divBtn.appendChild(deleteBtn);

  return divBtn;
}

function createBtnReadMore() {
  let divBtn = document.createElement("div");
  divBtn.setAttribute("class", "readmore__container");

  let readMoreBtn = document.createElement("button");
  readMoreBtn.setAttribute("type", "button");
  readMoreBtn.setAttribute("class", "button button__readMore");
  readMoreBtn.textContent = " Read More ";
  divBtn.appendChild(readMoreBtn);

  return divBtn;
}

function createFooter() {
  let footer = document.createElement("footer");
  footer.setAttribute("class", "footer");

  let divBtnPrevious = document.createElement("button");
  divBtnPrevious.setAttribute("type", "button");
  divBtnPrevious.setAttribute("class", "footer__link");
  divBtnPrevious.textContent = "previous";

  let divBtnNext = document.createElement("button");
  divBtnNext.setAttribute("type", "button");
  divBtnNext.setAttribute("class", "footer__link footer__link--next");
  divBtnNext.textContent = "next";

  footer.appendChild(divBtnPrevious);
  footer.appendChild(divBtnNext);

  return footer;
}

function createModal() {
  let divModalOverlay = document.createElement("div");
  divModalOverlay.setAttribute("class", "modal__overlay");

  let divModal = document.createElement("div");
  divModal.setAttribute("class", "modal");

  let divModalContent = document.createElement("div");
  divModalContent.setAttribute("class", "modal__content");

  divModalOverlay.appendChild(divModal);
  divModal.appendChild(divModalContent);

  let modalTitle = document.createElement("h2");
  modalTitle.setAttribute("class", "title");
  modalTitle.textContent = "Add/Edit article";

  divModalContent.appendChild(modalTitle);

  let inputContainer = document.createElement("div");
  inputContainer.setAttribute("class", "inputs__container");

  divModalContent.appendChild(inputContainer);

  let inputTitle = document.createElement("input");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("class", "input");
  inputTitle.setAttribute("placeholder", "Please enter title");

  let inputTag = document.createElement("input");
  inputTag.setAttribute("type", "text");
  inputTag.setAttribute("class", "input");
  inputTag.setAttribute("placeholder", "Please enter tag");

  let inputAuthor = document.createElement("input");
  inputAuthor.setAttribute("type", "text");
  inputAuthor.setAttribute("class", "input");
  inputAuthor.setAttribute("placeholder", "Please enter author");

  let inputDate = document.createElement("input");
  inputDate.setAttribute("type", "text");
  inputDate.setAttribute("class", "input");
  inputDate.setAttribute("placeholder", "Please enter date");

  let inputImageUrl = document.createElement("input");
  inputImageUrl.setAttribute("type", "text");
  inputImageUrl.setAttribute("class", "input");
  inputImageUrl.setAttribute("placeholder", "Please enter image url");

  let inputSaying = document.createElement("input");
  inputSaying.setAttribute("type", "text");
  inputSaying.setAttribute("class", "input");
  inputSaying.setAttribute("placeholder", "Please enter saying");

  inputContainer.appendChild(inputTitle);
  inputContainer.appendChild(inputTag);
  inputContainer.appendChild(inputAuthor);
  inputContainer.appendChild(inputDate);
  inputContainer.appendChild(inputImageUrl);
  inputContainer.appendChild(inputSaying);

  let textareaContent = document.createElement("textarea");
  textareaContent.setAttribute("class", "textarea");
  textareaContent.setAttribute("name", "content");
  textareaContent.setAttribute("cols", "28");
  textareaContent.setAttribute("rows", "7");
  textareaContent.setAttribute("placeholder", "Please enter content");

  divModalContent.appendChild(textareaContent);

  let divModalBtns = document.createElement("div");
  divModalBtns.setAttribute("class", "modal__buttons");

  divModalContent.appendChild(divModalBtns);

  let btnCancel = document.createElement("button");
  btnCancel.setAttribute("type", "button");
  btnCancel.setAttribute("class", "button modal__cancel");
  btnCancel.textContent = " Cancel ";

  let btnSave = document.createElement("button");
  btnSave.setAttribute("type", "button");
  btnSave.setAttribute("class", "button modal__save button--pink");
  btnSave.textContent = " Save ";

  divModalBtns.appendChild(btnCancel);
  divModalBtns.appendChild(btnSave);

  return divModalOverlay;
}

function renderNavbar() {
  const domNavbar = createNavbar();
  body.appendChild(domNavbar);
}

function renderArticle(article) {
  const domArticle = createArticle(article);
  container.appendChild(domArticle);
}

function renderFooter() {
  const footer = createFooter();
  container.appendChild(footer);
}

function generateHomePage() {
  createHead();
  renderNavbar();
  createBtnAddArticle();
  renderArticle(article);
  renderFooter();
  body.appendChild(createModal());
}

function createDetailsArticle(detailsArticle) {
  const domArticle = document.createElement("article");
  domArticle.setAttribute("id", "article");

  const domTitle = document.createElement("h2");
  domTitle.textContent = detailsArticle.title;
  domTitle.setAttribute("class", "title title--details");

  const domUlArticle = document.createElement("ul");
  domUlArticle.setAttribute(
    "class",
    "info__container info__container--details"
  );

  let articleDetails = document.createElement("li");
  articleDetails.setAttribute("class", "info__item");
  articleDetails.textContent = detailsArticle.articleDetails;
  let addedBy = document.createElement("li");
  addedBy.setAttribute("class", "info__item");
  addedBy.textContent = detailsArticle.addedBy;
  let author = document.createElement("span");
  author.setAttribute("class", "info__mark");
  author.textContent = detailsArticle.authorMark;
  let postDate = document.createElement("li");
  postDate.setAttribute("class", "info__item");
  postDate.textContent = detailsArticle.postDate;

  domUlArticle.appendChild(articleDetails);
  domUlArticle.appendChild(addedBy);
  addedBy.appendChild(author);
  domUlArticle.appendChild(postDate);

  let image = document.createElement("img");
  //   image.setAttribute("class", "img");
  image.setAttribute("src", "./img/" + detailsArticle.image);
  image.setAttribute("alt", "Bike");

  let divContentContainer = document.createElement("div");
  divContentContainer.setAttribute(
    "class",
    "content__container content__details"
  );

  let paragraph1 = document.createElement("p");
  let paragraph2 = document.createElement("p");
  let paragraph3 = document.createElement("p");
  paragraph2.setAttribute("class", "saying");
  paragraph1.textContent = detailsArticle.paragraph1;
  paragraph2.textContent = detailsArticle.paragraph2;
  paragraph3.textContent = detailsArticle.paragraph3;

  main.appendChild(domArticle);
  domArticle.appendChild(domTitle);
  domArticle.appendChild(domUlArticle);

  domArticle.appendChild(image);
  domArticle.appendChild(divContentContainer);
  divContentContainer.appendChild(paragraph1);
  divContentContainer.appendChild(paragraph2);
  divContentContainer.appendChild(paragraph3);

  return main;
}

function renderDetailsArticle(detailsArticle) {
  const domArticle = createDetailsArticle(detailsArticle);
  container.appendChild(domArticle);
}

function generateDetailsPage() {
  createHead();
  renderNavbar();
  renderDetailsArticle(detailsArticle);
  renderFooter();
}

class IndexView {
  constructor() {
    window.addEventListener("hashchange", (e) => this.onRouteChange(e));
    this.body = document.getElementById("body");
  }

  onRouteChange(e) {
    const hashLocation = window.location.hash.substring(1);
    this.loadContent(hashLocation);
  }

  loadContent(uri) {
    const contentUri = `${uri}`;

    cleanUpBody();

    switch (contentUri) {
      case "home":
        // generateHomePage();
        fetchHomepageData();
        break;
      case "details":
        // generateDetailsPage();
        fetchDetailsArticleData();
        break;
      default:
        let message = document.createElement("h1");
        message.innerText = "Page not found";
        body.appendChild(message);
        break;
    }

    if (contentUri === "home") {
      var modalBtnAddArticle = document.querySelector(".button__addArticle");
      var modalBg = document.querySelector(".modal__overlay");
      var modalCancel = document.querySelector(".modal__cancel");
      var modalSave = document.querySelector(".modal__save");
      var modalBlur = document.querySelector(".container");
      var btnReadMore = document.querySelector(".button__readMore");

      modalBtnAddArticle.addEventListener("click", function () {
        modalBlur.classList.add("bg-filter");
        modalBg.classList.add("bg-active");
      });
      modalCancel.addEventListener("click", function () {
        modalBlur.classList.remove("bg-filter");
        modalBg.classList.remove("bg-active");
      });
      modalSave.addEventListener("click", function () {
        modalSave.classList.remove("bg-active");
      });
      btnReadMore.addEventListener("click", function () {
        document.location.href = "#details";
      });
    }

    const toggleSwitch = document.querySelector(
      '.theme-switch input[type="checkbox"]'
    );
    function switchTheme(e) {
      if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }
    }
    toggleSwitch.addEventListener("change", switchTheme, false);
  }

  updateSlot(content) {
    this.slot.innerHTML = content;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("dom");

  console.log(window.location.hash);
  new IndexView();

  window.location.hash = "#home";
});
