// Test if our JS file is properly linked to the HTML file:
// console.log("Hello!");
// console.log(1 + 3);

// Grabbing the target elements from the HTML file:

const list = document.querySelector(".gallery-carousel-image-container-list");
const images = Array.from(list.children);
const button = document.querySelector(".gallery-carousel-btn");
const buttonRight = document.querySelector(".gallery-carousel-btn-right");
const buttonLeft = document.querySelector(".gallery-carousel-btn-left");
const carouselNav = document.querySelector(".gallery-carousel-navigation");
const bottomButtons = Array.from(carouselNav.children); //the bottom dots;

const imageWidth = images[0].getBoundingClientRect().width; // getting the width of our images;

// Arranging the images next to one another:

const setImagePosition = (img, index) => {
  img.style.left = imageWidth * index + "px";
};

images.forEach(setImagePosition);

const moveToImage = (list, currentImage, targetImage) => {
  list.style.transform = "translateX(-" + targetImage.style.left + ")";
  currentImage.classList.remove("current-image");
  targetImage.classList.add("current-image");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-image");
  targetDot.classList.add("current-image");
};

const hideShowArrows = (images, buttonLeft, buttonRight, targetIndex) => {
  if (targetIndex === 0) {
    buttonLeft.classList.add("hidden");
    buttonRight.classList.remove("hidden");
  } else if (targetIndex === images.length - 1) {
    buttonLeft.classList.remove("hidden");
    buttonRight.classList.add("hidden");
  } else {
    buttonLeft.classList.remove("hidden");
    buttonRight.classList.remove("hidden");
  }
};

buttonRight.addEventListener("click", (event) => {
  const currentImage = list.querySelector(".current-image");
  const nextImage = currentImage.nextElementSibling;
  const currentDot = carouselNav.querySelector(".current-image");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = images.findIndex((image) => image === nextImage);

  moveToImage(list, currentImage, nextImage);
  updateDots(currentDot, nextDot);
  hideShowArrows(images, buttonLeft, buttonRight, nextIndex);
});

buttonLeft.addEventListener("click", (event) => {
  const currentImage = list.querySelector(".current-image");
  const prevImage = currentImage.previousElementSibling;
  const currentDot = carouselNav.querySelector(".current-image");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = images.findIndex((image) => image === prevImage);

  moveToImage(list, currentImage, prevImage);
  updateDots(currentDot, prevDot);
  hideShowArrows(images, buttonLeft, buttonRight, prevIndex);
});

carouselNav.addEventListener("click", (event) => {
  const targetDot = event.target.closest("button");

  if (!targetDot) return;

  const currentImage = list.querySelector(".current-image");
  const currentDot = carouselNav.querySelector(".current-image");
  const targetIndex = bottomButtons.findIndex((dot) => dot === targetDot);
  const targetImage = images[targetIndex];

  moveToImage(list, currentImage, targetImage);
  updateDots(currentDot, targetDot);
  hideShowArrows(images, buttonLeft, buttonRight, targetIndex);
});
