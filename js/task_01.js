import images from '../gallery-items.js';

const refs = {
  jsGallery: document.querySelector('.js-gallery'),
  gallery: document.querySelector('.gallery'),
  lightBox: document.querySelector('.lightbox'),
  closeModal: document.querySelector('button[data-action="close-lightbox"]'),
  lightBoxImage: document.querySelector('.lightbox__image'),
  lightBoxContent: document.querySelector('.lightbox__content'),
};

//
const mainImage = refs.lightBoxImage;
//

const gallery = image => {
  const galleryItem = document.createElement('li');
  const galleryLink = document.createElement('a');
  const galleryImage = document.createElement('img');

  galleryItem.classList.add('gallery__item');
  galleryLink.classList.add('gallery__link');
  galleryImage.classList.add('gallery__image');

  galleryLink.href = image.original;
  galleryImage.src = image.preview;
  galleryImage.alt = image.description;
  galleryImage.setAttribute('data-source', image.original);

  galleryLink.appendChild(galleryImage);
  galleryItem.appendChild(galleryLink);

  return galleryItem;
};

const createGallery = images.map(image => gallery(image));
refs.jsGallery.append(...createGallery);

//

refs.gallery.addEventListener('click', onImagesClick);

function onImagesClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  showModal();
}

function showModal() {
  refs.lightBox.classList.add('is-open');

  mainImage.src = event.target.dataset.source;
  mainImage.alt = event.target.alt;

  window.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  });
}

refs.closeModal.addEventListener('click', closeModal);

function closeModal() {
  refs.lightBox.classList.remove('is-open');
  mainImage.src = '';
  mainImage.alt = '';
}

refs.lightBoxContent.addEventListener('click', event => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
});
