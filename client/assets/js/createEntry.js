app.createEntry = () => {
  const form = document.getElementById('signup');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formdata = app.getFormdata();
    console.log(formdata);
  });
};
