const _images = [
    "./assets/images/1.jpg",
    "./assets/images/2.jpg",
    "./assets/images/3.jpg",
    "./assets/images/4.jpg",
    "./assets/images/5.jpg",
    "./assets/images/6.jpg",
    "./assets/images/7.jpg",
    "./assets/images/8.jpg",
    "./assets/images/9.jpg",
    "./assets/images/10.jpg",
    "./assets/images/11.jpg",
    "./assets/images/12.jpg",
];

const content = document.getElementById("content");

const setNewImages = (images) => {
    localStorage.setItem("currentImages", JSON.stringify(images));
};

const getImages = () => {
    return JSON.parse(localStorage.getItem("currentImages")) || _images;
};
// let images = getImages();


function handleModalClose(event) {
    const modal = document.getElementById("modal");
    modal.classList.add("modal_hide");
}


function handleModalShow(event) {
    const imgURI = event.path[0].src;

    const modal = document.getElementById("modal");
    modal.classList.remove("modal_hide");
    
    const modalImage = document.getElementById("modal__image");
    modalImage.src = imgURI;
}


function handleImageRemove(event) {
    const imgURI = event.path[1].children[0].src;


    if (!!imgURI) {
        images = getImages().filter(
            (image) => !imgURI.includes(image.substring(1, image.length - 1))
        );

        setNewImages(images);
        showImages();
    }
    showImagesCount();
}


function handleImagesRestore() {
    setNewImages(_images);

    showImages();
    showImagesCount();
}


function showImages(parent = content) {
    parent.innerHTML = "";
    const images = getImages();

    for (let i = 0; i < images.length; i++) {
        const container = document.createElement("span");
        const images = getImages();
        container.className = "image__container";

        const image = new Image();
        image.src = images[i];
        image.style.backgroundImage = `url(${images[i]})`;
        image.className = "image";
        image.onclick = handleModalShow;

        const buttonRemoveImage = document.createElement("span");
        buttonRemoveImage.className = "image__button-remove";
        buttonRemoveImage.onclick = handleImageRemove;
        buttonRemoveImage.innerText = "X";

        const buttonRestoreImages = document.createElement("span");
        buttonRestoreImages.className = "image__button-restore";
        buttonRestoreImages.onclick = handleImagesRestore;
        buttonRestoreImages.innerText = "Відновить";

        container.appendChild(image);
        container.appendChild(buttonRemoveImage);
        container.appendChild(buttonRestoreImages);

        parent.appendChild(container);
    }
}


function getCountImages() {
    let count = content.children.length;
    return count;
}


function getCurrentDate() {
    // ДД.ММ.ГГГГ ЧЧ:ММ
    const date = new Date();
    let [day, month, year, hour, minute] = [
        date.getDay(),
        date.getMonth(),
        date.getFullYear(),
        date.getHours(),
        date.getMinutes(),
    ];

    day = day > 9 ? day : "0" + day;
    month = month > 9 ? month : "0" + month;
    hour = hour > 9 ? hour : "0" + hour;
    minute = minute > 9 ? minute : "0" + minute;

    return `${day}.${month}.${year}  ${hour}:${minute}`;
}


function showDate() {
    const date = document.getElementById("date");
    const currentDate = getCurrentDate();
    date.innerHTML = `Час: ${currentDate}`;
}


function showImagesCount() {
    const imagesLabel = document.getElementById("images-count");
    const imagesCount = getCountImages();
    imagesLabel.innerHTML = `К-ть картинок: ${imagesCount}`;
}


const modalButtonClose = document.getElementById("modal__close");
modalButtonClose.onclick = handleModalClose;


showImages();
showDate();
setInterval(showDate, 1000);
showImagesCount();
