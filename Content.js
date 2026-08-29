let images = [
  "https://upload.wikimedia.org/wikipedia/commons/6/60/Ivan_Aivazovsky_-_Ship_on_Stormy_Seas.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Hovhannes_Aivazovsky_-_The_Ninth_Wave_-_Google_Art_Project.jpg/3840px-Hovhannes_Aivazovsky_-_The_Ninth_Wave_-_Google_Art_Project.jpg",
];


function replaceImages() {
  const imgs = document.querySelectorAll("img");
  for (image of imgs) {
    if (!image.dataset.replaced) {
      const index = Math.floor(Math.random() * images.length);
      image.src = images[index];
      image.dataset.replaced = "true";
    }
  }
}

// replaceImages();

const observer = new MutationObserver((mutations) => {
  replaceImages();
});

if (document.body) {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })
}
