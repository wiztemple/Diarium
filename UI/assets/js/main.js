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