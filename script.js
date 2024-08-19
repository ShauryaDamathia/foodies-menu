document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".links");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");
  const cartIcon = document.querySelector('.cart-icon');
  const cartModal = document.querySelector('.cart-modal');
  const closeModal = document.querySelector('.close-modal');
  const cartItemsContainer = document.querySelector('.cart-items');
  const totalAmountElement = document.querySelector('.total-amount');
  const cartCountElement = document.querySelector('.cart-count');
  const menuItems = document.querySelectorAll('.menu-item');

  let cart = {};

  navToggle.addEventListener("click", function () {
    links.classList.toggle("show");
  });

  function switchSection(sectionId) {
    sections.forEach((section) => {
      if (section.id === sectionId) {
        section.classList.add("active");
        window.scrollTo({
          top: section.offsetTop - document.querySelector(".navbar").offsetHeight,
          behavior: "smooth",
        });
      } else {
        section.classList.remove("active");
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const sectionId = this.getAttribute("data-section");
      switchSection(sectionId);
      links.classList.remove("show"); 
    });
  });

  switchSection("home");

  menuItems.forEach((menuItem) => {
    const itemName = menuItem.dataset.item;
    const itemPrice = parseFloat(menuItem.dataset.price);
    const quantityElement = menuItem.querySelector('.quantity');

    if (!cart[itemName]) {
      cart[itemName] = 0;
    }

    const btnPlus = menuItem.querySelector('.btn-plus');
    const btnMinus = menuItem.querySelector('.btn-minus');

    btnPlus.addEventListener('click', () => {
      cart[itemName]++;
      quantityElement.textContent = cart[itemName];
      updateCartDisplay();
    });

    btnMinus.addEventListener('click', () => {
      if (cart[itemName] > 0) {
        cart[itemName]--;
        quantityElement.textContent = cart[itemName];
        updateCartDisplay();
      }
    });
  });

  function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';

    let totalAmount = 0;
    let totalItems = 0; 
    for (let item in cart) {
      if (cart[item] > 0) {
        const listItem = document.createElement('li');
        const itemPrice = parseFloat(document.querySelector(`[data-item="${item}"]`).dataset.price);
        listItem.textContent = `${item} x${cart[item]} - ₹${(cart[item] * itemPrice).toFixed(2)}`;
        cartItemsContainer.appendChild(listItem);
        totalAmount += cart[item] * itemPrice;
        totalItems += cart[item]; 
      }
    }

    totalAmountElement.textContent = `₹${totalAmount.toFixed(2)}`;
    cartCountElement.textContent = totalItems; 
  }

  cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
  });

  closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
  });

  window.addEventListener('click', event => {
    if (event.target === cartModal) {
      cartModal.style.display = 'none';
    }
  });
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name === '' || email === '' || message === '') {
    alert('Please fill out all required fields.');
    return;
  }

  alert('Thank you for your message! We will get back to you shortly.');

  document.getElementById('contactForm').reset();
});
