const displayLogos = async () => {
  
  const logoLinks = document.querySelectorAll('.logo-link');
  const logoContainer = document.querySelector('.logo-container');
  const userHasNoRoles = document.querySelector('.user-has-no-roles');

  const visibleLogos = [];
    for (let i = 0; i < logoLinks.length; i++) {
      const logoLink = logoLinks[i];
      const logoName = new URL(logoLink.href).pathname.split('/')[1].split('.')[0];

      if (userRoles.includes(logoName)) {
          visibleLogos.push(logoLink);
      } else {
          logoLink.style.display = 'none';
      }
  }

  if (visibleLogos.length === 0) {
      userHasNoRoles.style.display = 'block';
  } else if (visibleLogos.length === 1) {
    window.location.href = visibleLogos[0].href;
  } else if (visibleLogos.length < 4) {
    logoContainer.style.display = 'flex';
    logoContainer.style.justifyContent = 'center';
    logoContainer.style.alignItems = 'center';
    logoContainer.style.gap = '50px';
  } else {
    let columns = Math.ceil(Math.sqrt(visibleLogos.length));
    logoContainer.style.display = 'grid';
    logoContainer.style.gridTemplateColumns = `repeat(${columns}, 300px)`;
    logoContainer.style.justifyItems = 'center';
    logoContainer.style.alignItems = 'start';
    logoContainer.style.gap = '40px';
  }

  logoContainer.classList.remove('hidden');
};



const displayLogosWhenRolesFetched = async () => {
  while (!RolesFetched) {
    await new Promise(resolve => setTimeout(resolve, 200)); 
  }
  await displayLogos();
};


const logoContainer = document.querySelector('.logo-container');
logoContainer.classList.add('hidden'); // Add the hidden class to the logo container
displayLogosWhenRolesFetched();









