
const app = {};

app.saveToken = token => localStorage.setItem('token', token);

app.getToken = () => localStorage.getItem('token');

app.auth = (url, formdata) => {
  const requestHeader = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    referrer: 'no-referrer',
    body: JSON.stringify(formdata),
  };
  return fetch(url, requestHeader).then(data => data.json()).catch((error) => {
    // eslint-disable-next-line
    console.log(error.message);
  });
};
app.getFormdata = () => {
  const form = document.getElementsByTagName('form')[0];
  const inputs = form.getElementsByTagName('input');
  const formdata = {};
  for (let i = 0; i < inputs.length; i += 1) {
    formdata[inputs[i].name] = inputs[i].value;
  }
  return formdata;
};
app.signup = () => {
  const form = document.getElementById('signup');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formdata = app.getFormdata();
    console.log(formdata);
    app.auth('/api/v1/auth/signup', formdata).then((data) => {
      const errorMsg = document.querySelector('.js__errormsg');
      if (data.status === 'fail') {
        errorMsg.innerHTML = data.message;
      }
      if (data.status === 'success') {
          console.log(data)
        errorMsg.innerHTML = data.message;
        app.saveToken(data.token);
        /* setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1000); */
      }

      if (data.status === 'error') {
        errorMsg.innerHTML = data.message;
      }
    });
  });
};
