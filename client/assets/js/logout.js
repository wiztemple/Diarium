const logOutBtn = document.getElementById('logOutBtn');

const logOut = () => {
  localStorage.removeItem('xxxxx');
  window.location = '../../index.html';
};
logOutBtn.addEventListener('click', logOut);
