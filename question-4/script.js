const handleClick = (e) => {
  e.preventDefault();
  const button = document.querySelector(".add-value-btn");
  const btnSize = parseInt(getComputedStyle(button).width); 
  //reset to default state if button width or height is bigger than the viewport, otherwise
  //just enlarge the button and raise value by 1
  if (btnSize > window.innerWidth || btnSize > window.innerHeight) {
    button.innerHTML = 1;
    button.style.width = `50px`;
    button.style.height = `50px`;
  } else {
      button.innerHTML = parseInt(button.innerHTML) + 1;
      button.style.width = `${btnSize + 50}px`;
      button.style.height = `${btnSize + 50}px`;
  }
};

document.getElementById("addValue").onclick = handleClick;
