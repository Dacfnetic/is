const count = 10;
let photosArray = [];
const apiKey = 'NiLNug_KYh1WUZfqgzGWYqunADpYNWxlOTr4LZ4Uqgk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imagesContainer = document.getElementById('images-container');
let ready = false;
let imagesLoadess = 0;
let totalImages = 30;
const setAttributes = (element,atts) => {
    for(const key in atts){
        element.setAttribute(key,atts[key]);
    }
}
const displayPhotos = () => {
    imagesLoadess = 0;
    totalImages = photosArray.length;
    photosArray.forEach(photo => {
        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank' 
        });
        const image = document.createElement('img');
        setAttributes(image,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        image.addEventListener('load', imageLoaded);
        item.appendChild(image);
        imagesContainer.appendChild(item);
    });
}
const getImages = async () => {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}
const imagesLoaded = () => {
    imagesLoadess++;
    if(imagesLoadess === totalImages){
        ready = true;
        loader.hidden = true;
    }
}
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-2000 && ready){
        ready = false;
        getImages();
    }
});
getImages();