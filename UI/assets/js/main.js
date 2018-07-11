let i = 0;
const time = 2000;
const images  = ['./assets/images/feelings.jpg','./assets/images/jog_drib_2.png','./assets/images/notes.jpg','./assets/images/assets.png','./assets/images/pen-mascot-01.jpg',];


const changeImage = () => {
  document.slider.src = images[i];
  if (i < images.length - 1) {
    i++;
  } else {
    i = 0;
  }
  setTimeout("changeImage()", time);
}
window.onload = changeImage;

const footer = document.getElementById('footer');
window.onscroll = function () {
  if (window.pageYOffset >= 50) {
    footer.style.display = 'block';
  } else {
    footer.style.display = 'none';
  }
};

let modal = document.getElementById('simpleModal');

let modalBtn = document.getElementById('modalBtn');

let closeBtn = document.querySelector('.closeBtn');

// listen for open click
modalBtn.addEventListener('click', openModal);

// listen for close click
closeBtn.addEventListener('click', closeModal);

//listen for outside click
window.addEventListener('click', clickOutSide);

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function clickOutSide(e){
  if(e.target == modal) {
    modal.style.display = 'none';
  }
}

