
let home = '';
let about = '';
let contact = '';
let error='';

const loadPage = async (page) => {
    const response = await fetch(page);
    const getRes = await response.text();
    return getRes;
  };

  const loadAllPages = async () => {
    home = await loadPage('home.html');
    about = await loadPage('about.html');
    error=await loadPage('filenotfound.html');
    contact = await loadPage('contact.html');
  };

  const app_div = document.getElementById('app');

  
  const main = async () => {
    await loadAllPages();
    app.innerHTML = home;
    routes = {
      
      '#home': home,
      '#contact': contact,
      '#about': about,
      '#error':error
    };
  };
  main();

  

  const onNavClick = () => {
    window.history.pushState({}, window.location.hash);
    // app.innerHTML = routes[pathname];
  };

  window.addEventListener('hashchange',onNavClick);
  window.onpopstate=()=>{
    if(!routes[location.hash]){
      app.innerHTML = routes['#error'];
    }
    else{
      app.innerHTML =routes[location.hash];
    }
  }