
const form = document.getElementById('signup-form');
const signupBtn = document.getElementById('signupBtn');

const signupUser = async (e) => {
  e.preventDefault();
  const {
    firstname, lastname, email, password,
  } = form.elements;
  const url = 'api/v1/auth/signup';
  const data = {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    password: password.value,
  };
  const fetchData = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  };

  const response = await fetch(url, fetchData);
  const body = await response.json();
  if (body.status === 201 && body.success === true) {
    localStorage.setItem('token', body.token);
    window.location = '../../index.html';
  }
};
signupBtn.addEventListener('submit', signupUser);
