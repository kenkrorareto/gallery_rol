document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.getElementById("gallery");

  fetchImages().then((images) => {
    images.forEach((image) => {
      const thumbnailContainer = createThumbnailContainer(image);
      gallery.appendChild(thumbnailContainer);
    });
  });

  async function fetchImages() {
    const response = await fetch("./images.json");
    const data = await response.json();
    return data.images;
  }

  function createThumbnailContainer(imageName) {
    const container = document.createElement("div");
    container.classList.add("thumbnail-container");

    const heading = document.createElement("h1");
    heading.textContent = getImageNameWithoutExtension(imageName);

    const thumbnail = createThumbnail(imageName);

    const hr = document.createElement("hr");

    container.appendChild(heading);
    container.appendChild(thumbnail);
    container.appendChild(hr);

    return container;
  }

  function createThumbnail(imageName) {
    const thumbnail = document.createElement("img");
    thumbnail.src = `./images/${imageName}`;
    thumbnail.alt = imageName;
    thumbnail.classList.add("img");
    return thumbnail;
  }

  function getImageNameWithoutExtension(imageName) {
    imageName = imageName.replace(/\.[^/.]+$/, "");
    const parts = imageName.split("/");
    const fileName = parts[parts.length - 1];

    return fileName.replace(/([a-z])([A-Z])/g, "$1 $2");
  }
});
