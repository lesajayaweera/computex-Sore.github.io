// Variable Declarations
const navbar = document.querySelector(".header .flex .navbar");
const profile = document.querySelector(".profile");
const profileName = document.getElementById("user_name");
var darkMode = localStorage.getItem("darkmode");

// Registration Variables
const regUsername = document.getElementById("regUsername");
const regEmail = document.getElementById("regEmail");
const regPassword = document.getElementById("regPassword");
const regCorPassword = document.getElementById("regCorPassword");
const saveButton = document.getElementById("saveButton");
const usersList = JSON.parse(localStorage.getItem("usersList")) || [];

// Login Variables
const logIdentifier = document.getElementById("logIdentifier");
const logPassword = document.getElementById("logPassword");

// Update Variables
const updUsername = document.getElementById("updUsername");
const updEmail = document.getElementById("updEmail");
const updOldPass = document.getElementById("updOldPass");
const updNewPass = document.getElementById("updNewPass");
const updConfNewPass = document.getElementById("updConfNewPass");

// Checking which theme should load
document.addEventListener("DOMContentLoaded", function () {
  themeCheck();
});

// Theme switch function
function themeSwitch() {
  darkMode = darkMode === "true" ? "false" : "true";
  localStorage.setItem("darkmode", darkMode);
  themeCheck();
}

// Function that checks which theme is selected and applies it
function themeCheck() {
  const root = document.documentElement;
  const fadeTexts = document.querySelectorAll(".fadeRedText, .fadePurpleText");
  const fadeBackgrounds = document.querySelectorAll(
    ".fadeRedBg, .fadePurpleBg"
  );

  if (darkMode == "true") {
    // Switch to dark mode
    root.style.setProperty("--main-color", "#6000c5");
    root.style.setProperty("--black", "#e9e9e9");
    root.style.setProperty("--white", "#161616");
    root.style.setProperty("--gray", "#888 ");
    root.style.setProperty("--bg", "#131313");
    root.style.setProperty("--light-bg", "#181818");
    root.style.setProperty("--box-shadow", "#000");
    root.style.setProperty("--box-shadow-Del", "#131313");
    fadeTexts.forEach((fadeText) => {
      fadeText.classList.remove("fadeRedText");
      fadeText.classList.add("fadePurpleText");
    });
    fadeBackgrounds.forEach((fadeBackground) => {
      fadeBackground.classList.remove("fadeRedBg");
      fadeBackground.classList.add("fadePurpleBg");
    });
  } else {
    // Switch to light mode
    root.style.setProperty("--main-color", "#c5002e");
    root.style.setProperty("--black", "#161616");
    root.style.setProperty("--white", "#f2f2f2");
    root.style.setProperty("--gray", "#777");
    root.style.setProperty("--bg", "#ececec");
    root.style.setProperty("--light-bg", "#e7e7e7");
    root.style.setProperty("--box-shadow", "#c5c5c5");
    root.style.setProperty("--box-shadow-Del", "#ececec");
    fadeTexts.forEach((fadeText) => {
      fadeText.classList.remove("fadePurpleText");
      fadeText.classList.add("fadeRedText");
    });
    fadeBackgrounds.forEach((fadeBackground) => {
      fadeBackground.classList.remove("fadePurpleBg");
      fadeBackground.classList.add("fadeRedBg");
    });
  }
}

// Mobile Dropdown menu function
document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
  profile.classList.remove("active");
};

// Profile options function
document.querySelector("#user-btn").onclick = () => {
  profile.classList.toggle("active");
  navbar.classList.remove("active");
};

// Automatically close navbar and/or profile if scroll
window.onscroll = () => {
  navbar.classList.remove("active");
  profile.classList.remove("active");
};

// Preventing going to cart or wishlist or orders page if user isnt logged in
document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const orderButtons = document.querySelectorAll(".orderLink");
  const cartButtons = document.querySelectorAll(".cartLink");
  const wishlistButtons = document.querySelectorAll(".wishlistLink");

  orderButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      if (!isLoggedIn) {
        window.location.assign("./login.html");
      } else {
        window.location.assign("./orders.html");
      }
    });
  });

  cartButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      if (!isLoggedIn) {
        event.preventDefault();
        window.location.assign("./login.html");
      } else {
        window.location.assign("./cart.html");
      }
    });
  });

  wishlistButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      if (!isLoggedIn) {
        event.preventDefault();
        window.location.assign("./login.html");
      } else {
        window.location.assign("./wishlist.html");
      }
    });
  });
});

// Preventing going to login or register page if user is logged in
document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const loginButtons = document.querySelectorAll(".loginLink");
  const registerButtons = document.querySelectorAll(".registerLink");

  loginButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      if (isLoggedIn === "true") {
        event.preventDefault();
        window.alert("To log in again please log out first");
      } else {
        window.location.assign("./login.html");
      }
    });
  });

  registerButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      if (isLoggedIn === "true") {
        event.preventDefault();
        window.alert("To register again please log out first");
      } else {
        window.location.assign("./register.html");
      }
    });
  });
});

// Displaying the user name in html page function
document.addEventListener("DOMContentLoaded", function () {
  updateCartAndWishlistCounts();
  var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    const profileNameElement = document.createElement("h1");
    profileNameElement.textContent = loggedInUser.name;
    profileNameElement.classList.add("username");
    const firstChild = profile.firstChild;
    profile.insertBefore(profileNameElement, firstChild);
  }
});

// Cart and Wishlist counts update function
function updateCartAndWishlistCounts() {
  const cartCount = document.getElementById("cartCount");
  const wishlistCount = document.getElementById("wishlistCount");

  var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  var user = usersList.find((user) => user.id == loggedInUser.id);

  if (user) {
    cartCount.innerText = `(${user.cart.length})`;
    wishlistCount.innerText = `(${user.wishlist.length})`;
  }
}

// Button visibility function
document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const optBtn = document.querySelectorAll(".option-btn");
  const dissBtn = document.querySelectorAll("#diss-btn");

  if (isLoggedIn) {
    dissBtn.forEach((btn) => (btn.style.display = "block"));
    optBtn.forEach((btn) => (btn.style.display = "none"));
  } else {
    dissBtn.forEach((btn) => (btn.style.display = "none"));
    optBtn.forEach((btn) => (btn.style.display = "block"));
  }
});

// Password show/hide function
document.addEventListener("DOMContentLoaded", function () {
  var showPasswordCheckbox = document.getElementById("showPassword");
  var passwordInputs = document.querySelectorAll(".passInput");

  showPasswordCheckbox.addEventListener("change", function () {
    var inputType = this.checked ? "text" : "password";

    passwordInputs.forEach(function (input) {
      input.type = inputType;
    });
  });
});

// Function to validate username
function validateUsername(username) {
  const firstCharRegex = /^[a-zA-Z]/;
  const validCharsRegex = /^[a-zA-Z0-9]+$/;

  if (!firstCharRegex.test(username.charAt(0))) {
    return false; // Username must start with a letter
  }

  return validCharsRegex.test(username);
}

// Function to validate email
function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Function to validate the password
function validatePassword(password) {
  // Regular expressions for the requirements
  const regexCapital = /[A-Z]/;
  const regexNumber = /[0-9]/;
  const regexSpecial = /[^A-Za-z0-9]/;
  const regexLength = /^.{8,}$/;

  // Check each requirement using a loop
  let passed = 0;
  if (regexCapital.test(password)) passed++;
  if (regexNumber.test(password)) passed++;
  if (regexSpecial.test(password)) passed++;
  if (regexLength.test(password)) passed++;

  // If all requirements are met, return true
  if (passed === 4) return true;

  // Otherwise, return false
  return false;
}

// Register function
function save() {
  // Check if any field is empty
  if (
    !regUsername.value ||
    !regEmail.value ||
    !regPassword.value ||
    !regCorPassword.value
  ) {
    alert("Please fill in all fields.");
    return false;
  }

  // Validate the username
  const isUsernameValid = validateUsername(regUsername.value);

  if (!isUsernameValid) {
    alert("Username does not meet the requirements or is invalid.");
    regUsername.classList.add("inputError");
    regEmail.classList.remove("inputError");
    regPassword.classList.remove("inputError");
    regCorPassword.classList.remove("inputError");
    return false;
  }

  // Validate the Email
  const isEmailValid = validateEmail(regEmail.value);

  if (!isEmailValid) {
    alert("Email does not meet the requirements or is invalid.");
    regUsername.classList.remove("inputError");
    regEmail.classList.add("inputError");
    regPassword.classList.remove("inputError");
    regCorPassword.classList.remove("inputError");
    return false;
  }

  // Validate the password
  const isPasswordValid = validatePassword(regPassword.value);

  if (!isPasswordValid) {
    alert("Password does not meet the requirements or is invalid.");
    regUsername.classList.remove("inputError");
    regEmail.classList.remove("inputError");
    regPassword.classList.add("inputError");
    regCorPassword.classList.remove("inputError");
    return false;
  }

  // Check if passwords match
  if (regPassword.value !== regCorPassword.value) {
    alert("Passwords do not match.");
    regUsername.classList.remove("inputError");
    regEmail.classList.remove("inputError");
    regPassword.classList.add("inputError");
    regCorPassword.classList.add("inputError");
    return false;
  } else {
    // Registration process
    const newUser = {
      id: usersList.length + 1,
      name: regUsername.value,
      email: regEmail.value,
      password: regPassword.value,
      cart: [],
      wishlist: [],
      orders: [],
    };

    usersList.push(newUser);

    localStorage.setItem("usersList", JSON.stringify(usersList));
    window.location.assign("./login.html");
    return true;
  }
}

// Log in function
function login() {
  const logIdentifierValue = logIdentifier.value;
  const logPasswordValue = logPassword.value;

  for (const user of usersList) {
    if (
      (user.email === logIdentifierValue || user.name === logIdentifierValue) &&
      user.password === logPasswordValue
    ) {
      const { id, name, email, password } = user;
      const loggedInUser = {
        id,
        name,
        email,
        password,
      };

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

      window.location.assign("./home.html");
      return true;
    }
  }
  logIdentifier.classList.add("inputError");
  logPassword.classList.add("inputError");
  return false;
}

// Profile update function
function update() {
  var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!updOldPass.value || !updUsername.value || !updEmail.value) {
    alert("Please fill in all fields.");
    return false;
  }

  if (loggedInUser.password === updOldPass.value) {
    // Validate the username
    const updUsernameValid = validateUsername(updUsername.value);
    if (!updUsernameValid) {
      alert("Username does not meet the requirements or is invalid.");
      updUsername.classList.add("inputError");
      updEmail.classList.remove("inputError");
      updOldPass.classList.remove("inputError");
      updNewPass.classList.remove("inputError");
      updConfNewPass.classList.remove("inputError");
      return false;
    }

    // Validate the Email
    const updEmailValid = validateEmail(updEmail.value);

    if (!updEmailValid) {
      alert("Email does not meet the requirements or is invalid.");
      updUsername.classList.remove("inputError");
      updEmail.classList.add("inputError");
      updOldPass.classList.remove("inputError");
      updNewPass.classList.remove("inputError");
      updConfNewPass.classList.remove("inputError");
      return false;
    }

    // Validate the password
    const updNewPassValid = validatePassword(updNewPass.value);

    if (!updNewPassValid) {
      alert("Password does not meet the requirements or is invalid.");
      updUsername.classList.remove("inputError");
      updEmail.classList.remove("inputError");
      updOldPass.classList.remove("inputError");
      updNewPass.classList.add("inputError");
      updConfNewPass.classList.remove("inputError");
      return false;
    }

    loggedInUser.name = updUsername.value;
    loggedInUser.email = updEmail.value;

    if (updNewPass.value === updConfNewPass.value) {
      loggedInUser.password = updNewPass.value;
    } else {
      alert("Please enter the same passwords");
      window.location.reload();
    }

    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    alert("Update successful.");
    window.location.reload();
  } else {
    alert("Invalid Credentials");
    updUsername.classList.remove("inputError");
    updEmail.classList.remove("inputError");
    updOldPass.classList.add("inputError");
    updNewPass.classList.remove("inputError");
    updConfNewPass.classList.remove("inputError");
  }
}

// Displaying items in Wishlist
document.addEventListener("DOMContentLoaded", function () {
  var wishlistContainer = document.getElementById("wishlistContainer");

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const user = usersList.find((user) => user.id == loggedInUser.id);

  if (wishlistContainer) {
    if (user && user.wishlist.length > 0) {
      user.wishlist.forEach(function (product) {
        const box = document.createElement("div");
        const img = document.createElement("img");
        const name = document.createElement("div");
        const type = document.createElement("div");
        const flexContainer = document.createElement("div");
        const price = document.createElement("div");
        const qtyInput = document.createElement("input");
        const deleteBtn = document.createElement("input");
        const addToCartBtn = document.createElement("input");

        box.classList.add("box");
        img.src = product.ProductImageSrc;
        img.alt = product.ProductName;
        name.classList.add("name");
        name.textContent = product.ProductName;
        type.classList.add("type");
        type.textContent = product.ProductType;
        flexContainer.classList.add("flex");
        price.classList.add("price");
        price.textContent = product.ProductPrice;
        qtyInput.type = "number";
        qtyInput.name = "qty";
        qtyInput.classList.add("qty");
        qtyInput.min = "1";
        qtyInput.max = "99";
        qtyInput.value = product.ProductQuantity;
        deleteBtn.type = "button";
        deleteBtn.value = "delete item";
        deleteBtn.classList.add("btn");
        deleteBtn.name = "delete";
        addToCartBtn.type = "button";
        addToCartBtn.value = "Add to cart";
        addToCartBtn.classList.add("btn");
        addToCartBtn.name = "add_to_cart";

        flexContainer.appendChild(price);
        flexContainer.appendChild(qtyInput);
        box.appendChild(img);
        box.appendChild(name);
        box.appendChild(type);
        box.appendChild(flexContainer);
        box.appendChild(deleteBtn);
        box.appendChild(addToCartBtn);

        deleteBtn.addEventListener("click", function () {
          wishlistDelete(product, box);
        });

        addToCartBtn.addEventListener("click", function () {
          wishlistAddToCart(product, box);
        });

        const wishlistContainer = document.getElementById("wishlistContainer");
        wishlistContainer.addEventListener("change", function (event) {
          if (event.target.classList.contains("qty")) {
            const newQuantity = parseInt(event.target.value);
            const parentBox = event.target.closest(".box");
            const productName = parentBox.querySelector(".name").textContent;

            var loggedInUserId = localStorage.getItem("loggedInUserId");

            // Find the user in usersList by their ID
            var user = usersList.find((user) => user.id == loggedInUserId);

            if (user) {
              // Find the product in the wishlist by its name
              const productIndex = user.wishlist.findIndex(
                (item) => item.ProductName === productName
              );

              if (productIndex > -1) {
                // Update the quantity
                user.wishlist[productIndex].ProductQuantity = newQuantity;
                localStorage.setItem("usersList", JSON.stringify(usersList));
              }
            }
            window.location.reload();
          }
        });

        wishlistContainer.appendChild(box);
      });
    } else if (user && user.wishlist.length == 0) {
      const errorBox = document.createElement("div");
      errorBox.classList.add("errorBox");
      const errorMsg = document.createElement("h1");
      errorMsg.classList.add("heading");
      errorMsg.textContent = "No items Yet";
      errorBox.appendChild(errorMsg);
      wishlistContainer.appendChild(errorBox);
    }
  }
});

// Add to Wishlist function
function wishlist(event) {
  var isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    alert("Please log in to add items to your wishlist.");
    return;
  }
  var targetButton = event.target;
  var parentDiv = targetButton.closest(".box");
  var productName = parentDiv.querySelector(".name").textContent;
  var productType = parentDiv.querySelector(".type").textContent;
  var productImage = parentDiv.querySelector("img").getAttribute("src");
  var productPrice = parentDiv.querySelector("span").textContent;
  var productQty = parseInt(parentDiv.querySelector(".qty").value);

  var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Find the user in usersList by their ID
  var user = usersList.find((user) => user.id == loggedInUser.id);

  if (user) {
    var product = {
      ProductName: productName,
      ProductType: productType,
      ProductImageSrc: productImage,
      ProductPrice: productPrice,
      ProductQuantity: productQty,
    };

    // Check if the product already exists in the wishlist
    var existingProductIndex = user.wishlist.findIndex(
      (item) => item.ProductName === productName
    );

    if (existingProductIndex !== -1) {
      // Product already exists, update quantity
      user.wishlist[existingProductIndex].ProductQuantity += productQty;
    } else {
      // Product doesn't exist, add it to the wishlist
      user.wishlist.push(product);
    }

    // Update localStorage with the modified user data
    localStorage.setItem("usersList", JSON.stringify(usersList));

    updateCartAndWishlistCounts(); // Update UI
  }
}

// Wishlist delete function
function wishlistDelete(product, box) {
  var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  var user = usersList.find((user) => user.id == loggedInUser.id);

  if (user) {
    const index = user.wishlist.indexOf(product);

    if (index > -1) {
      user.wishlist.splice(index, 1);
      localStorage.setItem("usersList", JSON.stringify(usersList)); // Update local storage
      wishlistContainer.removeChild(box);
      updateCartAndWishlistCounts(); // Update UI
      window.location.reload();
    }
  }
}

// Wishlist addToCart function
function wishlistAddToCart(product, box) {
  var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Find the user in usersList by their ID
  var user = usersList.find((user) => user.id == loggedInUser.id);

  if (user) {
    // Remove the product from wishlist
    const indexInWishlist = user.wishlist.findIndex(
      (item) => item.ProductName === product.ProductName
    );
    if (indexInWishlist > -1) {
      user.wishlist.splice(indexInWishlist, 1);
      localStorage.setItem("usersList", JSON.stringify(usersList)); // Update local storage
      wishlistContainer.removeChild(box); // Remove the corresponding box from the wishlist UI
      updateCartAndWishlistCounts(); // Update UI
    }

    // Add the product to the cart
    var existingProduct = user.cart.find(
      (item) => item.ProductName === product.ProductName
    );

    if (existingProduct) {
      // Product already exists in cart, update quantity
      existingProduct.ProductQuantity += product.ProductQuantity;
    } else {
      // Product doesn't exist in cart, add it
      user.cart.push(product);
    }

    // Update localStorage with the modified user data
    localStorage.setItem("usersList", JSON.stringify(usersList));
    updateCartAndWishlistCounts(); // Update UI
    window.location.assign("./login.html");
  }
}

// Displaying items in Cart
document.addEventListener("DOMContentLoaded", function () {
  var cartContainer = document.getElementById("cartContainer");

  var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const user = usersList.find((user) => user.id == loggedInUser.id);

  if (cartContainer) {
    if (user && user.cart.length > 0) {
      user.cart.forEach(function (product) {
        const box = document.createElement("div");
        const img = document.createElement("img");
        const name = document.createElement("div");
        const type = document.createElement("div");
        const flexContainer = document.createElement("div");
        const price = document.createElement("div");
        const qtyInput = document.createElement("input");
        const deleteBtn = document.createElement("input");

        box.classList.add("box");
        img.src = product.ProductImageSrc;
        img.alt = product.ProductName;
        name.classList.add("name");
        name.textContent = product.ProductName;
        type.classList.add("type");
        type.textContent = product.ProductType;
        flexContainer.classList.add("flex");
        price.classList.add("price");
        price.textContent = product.ProductPrice;
        qtyInput.type = "number";
        qtyInput.name = "qty";
        qtyInput.classList.add("qty");
        qtyInput.min = "1";
        qtyInput.max = "99";
        qtyInput.value = product.ProductQuantity;
        deleteBtn.type = "button";
        deleteBtn.value = "delete item";
        deleteBtn.classList.add("btn");
        deleteBtn.name = "delete";

        flexContainer.appendChild(price);
        flexContainer.appendChild(qtyInput);
        box.appendChild(img);
        box.appendChild(name);
        box.appendChild(type);
        box.appendChild(flexContainer);
        box.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", function () {
          cartDelete(product, box);
        });

        const cartContainer = document.getElementById("cartContainer");
        cartContainer.addEventListener("change", function (event) {
          if (event.target.classList.contains("qty")) {
            const newQuantity = parseInt(event.target.value);
            const parentBox = event.target.closest(".box");
            const productName = parentBox.querySelector(".name").textContent;

            var loggedInUserId = localStorage.getItem("loggedInUserId");

            // Find the user in usersList by their ID
            var user = usersList.find((user) => user.id == loggedInUserId);

            if (user) {
              // Find the product in the cart by its name
              const productIndex = user.cart.findIndex(
                (item) => item.ProductName === productName
              );

              if (productIndex > -1) {
                // Update the quantity
                user.cart[productIndex].ProductQuantity = newQuantity;
                localStorage.setItem("usersList", JSON.stringify(usersList));
              }
            }
            window.location.reload();
          }
        });

        cartContainer.appendChild(box);
      });
    } else if (user && user.wishlist.length == 0) {
      const errorBox = document.createElement("div");
      errorBox.classList.add("errorBox");
      const errorMsg = document.createElement("h1");
      errorMsg.classList.add("heading");
      errorMsg.textContent = "No items Yet";
      errorBox.appendChild(errorMsg);
      cartContainer.appendChild(errorBox);
    }
  }
});

// Total price function
document.addEventListener("DOMContentLoaded", function () {
  var totalPrice = document.getElementById("totalPrice");

  var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Find the user in usersList by their ID
  var user = usersList.find((user) => user.id == loggedInUser.id);

  if (totalPrice) {
    if (user) {
      var totalCartPrice = user.cart.reduce((total, item) => {
        const price = parseFloat(item.ProductPrice.replace("$", ""));
        const quantity = item.ProductQuantity;
        if (!isNaN(price) && !isNaN(quantity)) {
          return total + price * quantity;
        } else {
          console.error("Invalid data for item:", item);
          return total;
        }
      }, 0);

      totalPrice.textContent = `$${totalCartPrice.toFixed(2)}`;
    }
  }
});

// Add to Cart function
function cart(event) {
  var isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    alert("Please log in to add items to your cart.");
    return;
  }

  var targetButton = event.target;
  var parentDiv = targetButton.closest(".box");
  var productName = parentDiv.querySelector(".name").textContent;
  var productType = parentDiv.querySelector(".type").textContent;
  var productImage = parentDiv.querySelector("img").getAttribute("src");
  var productPrice = parentDiv.querySelector("span").textContent;
  var productQty = parseInt(parentDiv.querySelector(".qty").value);

  var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Find the user in usersList by their ID
  var user = usersList.find((user) => user.id == loggedInUser.id);

  if (user) {
    var product = {
      ProductName: productName,
      ProductType: productType,
      ProductImageSrc: productImage,
      ProductPrice: productPrice,
      ProductQuantity: productQty,
    };

    // Check if the product already exists in the cart
    var existingProductIndex = user.cart.findIndex(
      (item) => item.ProductName === productName
    );

    if (existingProductIndex !== -1) {
      // Product already exists, update quantity
      user.cart[existingProductIndex].ProductQuantity += productQty;
    } else {
      // Product doesn't exist, add it to the cart
      user.cart.push(product);
    }

    // Update localStorage with the modified user data
    localStorage.setItem("usersList", JSON.stringify(usersList));

    updateCartAndWishlistCounts(); // Update UI
  }
}

// Cart delete function
function cartDelete(product, box) {
  var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Find the user in usersList by their ID
  var user = usersList.find((user) => user.id == loggedInUser.id);

  if (user) {
    const index = user.cart.indexOf(product);

    if (index > -1) {
      user.cart.splice(index, 1);
      localStorage.setItem("usersList", JSON.stringify(usersList)); // Update local storage
      cartContainer.removeChild(box);
      updateCartAndWishlistCounts(); // Update UI
      window.location.reload();
    }
  }
}

// Cart delete all function
function cartDeleteAll() {
  var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Find the user in usersList by their ID
  var user = usersList.find((user) => user.id == loggedInUser.id);

  if (user) {
    // Clear the cart
    user.cart = [];
    localStorage.setItem("usersList", JSON.stringify(usersList)); // Update local storage

    // Remove all boxes from the cart container
    while (cartContainer.firstChild) {
      cartContainer.removeChild(cartContainer.firstChild);
    }

    updateCartAndWishlistCounts(); // Update UI
    window.location.reload();
  }
}

// Checkout function
function placeOrder() {
  const nameInput = document.querySelector('input[name="name"]');
  const numberInput = document.querySelector('input[name="number"]');
  const emailInput = document.querySelector('input[name="email"]');
  const methodInput = document.querySelector('select[name="method"]');
  const streetInput = document.querySelector('input[name="street"]');
  const flatInput = document.querySelector('input[name="flat"]');
  const cityInput = document.querySelector('input[name="city"]');
  const countryInput = document.querySelector('input[name="country"]');

  const name = nameInput.value;
  const number = numberInput.value;
  const email = emailInput.value;
  const method = methodInput.value;
  const street = streetInput.value;
  const flat = flatInput.value;
  const city = cityInput.value;
  const country = countryInput.value;

  if (!name || !number || !email || !street || !city || !country) {
    alert("Please fill in all fields.");
    return;
  }

  const namePattern = /^[A-Za-z\s]+$/;
  const addressPattern = /^[A-Za-z0-9\s]+$/;

  // Validate the name
  if (!namePattern.test(name)) {
    alert("Name does not meet the requirements or is invalid.");
    nameInput.classList.add("inputError");
    numberInput.classList.remove("inputError");
    emailInput.classList.remove("inputError");
    streetInput.classList.remove("inputError");
    cityInput.classList.remove("inputError");
    countryInput.classList.remove("inputError");
    return false;
  }

  // Validate the address
  if (!addressPattern.test(street)) {
    alert("Address does not meet the requirements or is invalid.");
    nameInput.classList.remove("inputError");
    numberInput.classList.remove("inputError");
    emailInput.classList.remove("inputError");
    streetInput.classList.add("inputError");
    cityInput.classList.remove("inputError");
    countryInput.classList.remove("inputError");
    return false;
  }

  // Validate the city
  if (!namePattern.test(city)) {
    alert("City does not meet the requirements or is invalid.");
    nameInput.classList.remove("inputError");
    nameInput.classList.remove("inputError");
    numberInput.classList.remove("inputError");
    emailInput.classList.remove("inputError");
    streetInput.classList.remove("inputError");
    cityInput.classList.add("inputError");
    countryInput.classList.remove("inputError");
    return false;
  }

  // Validate the country
  if (!namePattern.test(country)) {
    alert("Country does not meet the requirements or is invalid.");
    nameInput.classList.remove("inputError");
    nameInput.classList.remove("inputError");
    numberInput.classList.remove("inputError");
    emailInput.classList.remove("inputError");
    streetInput.classList.remove("inputError");
    cityInput.classList.remove("inputError");
    countryInput.classList.add("inputError");
    return false;
  }
  var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const user = usersList.find((user) => user.id == loggedInUser.id);

  if (user) {
    const order = {
      items: user.cart,
      address: {
        name,
        number,
        email,
        method,
        flat,
        street,
        city,
        country,
      },
    };

    user.orders = user.orders || [];
    user.orders.push(order);

    user.cart = [];
    localStorage.setItem("usersList", JSON.stringify(usersList));

    window.location.assign("./orders.html");
  }
}

// Displaying items in Orders
document.addEventListener("DOMContentLoaded", function () {
  const ordersContainer = document.getElementById("ordersContainer");

  var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const user = usersList.find((user) => user.id == loggedInUser.id);

  if (ordersContainer) {
    if (user && user.orders.length > 0) {
      user.orders.forEach((order, index) => {
        const orderBox = document.createElement("div");
        orderBox.classList.add("order-box");

        const orderTitle = document.createElement("h4");
        orderTitle.textContent = `Order ${index + 1}`;
        orderBox.appendChild(orderTitle);

        order.items.forEach((item) => {
          const itemDetails = document.createElement("p");
          itemDetails.textContent = `${item.ProductName} - Quantity: ${item.ProductQuantity} - Price: ${item.ProductPrice}`;
          orderBox.appendChild(itemDetails);
        });

        const totalCartPrice = order.items.reduce((total, item) => {
          const price = parseFloat(item.ProductPrice.replace("$", ""));
          const quantity = item.ProductQuantity;
          if (!isNaN(price) && !isNaN(quantity)) {
            return total + price * quantity;
          } else {
            console.error("Invalid data for item:", item);
            return total;
          }
        }, 0);

        const priceAndAddressDiv = document.createElement("div");
        const addressInfo = document.createElement("p");
        addressInfo.textContent = `Delivery Address: ${order.address.name}, ${order.address.number}, ${order.address.street}, ${order.address.city}, ${order.address.country}`;
        addressInfo.classList.add("heading");
        priceAndAddressDiv.appendChild(addressInfo);

        const totalCartPriceText = `Total Price: $${totalCartPrice.toFixed(2)}`;
        const totalCartPriceElement = document.createElement("p");
        totalCartPriceElement.textContent = totalCartPriceText;
        totalCartPriceElement.classList.add("heading");
        totalCartPriceElement.classList.add("fadeRedText");
        priceAndAddressDiv.appendChild(totalCartPriceElement);

        orderBox.appendChild(priceAndAddressDiv);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Order";
        deleteButton.classList.add("btn");
        deleteButton.addEventListener("click", function () {
          deleteOrder(index);
        });
        orderBox.appendChild(deleteButton);
        ordersContainer.appendChild(orderBox);
      });
    } else if (user && user.orders.length == 0) {
      const errorBox = document.createElement("div");
      errorBox.classList.add("errorBox");
      const errorMsg = document.createElement("h1");
      errorMsg.classList.add("heading");
      errorMsg.textContent = "No items Yet";
      errorBox.appendChild(errorMsg);
      ordersContainer.appendChild(errorBox);
    }
  }
});

// Order delete function
function deleteOrder(orderIndex) {
  var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const user = usersList.find((user) => user.id == loggedInUser.id);

  if (user && user.orders && user.orders.length > orderIndex) {
    user.orders.splice(orderIndex, 1);
    localStorage.setItem("usersList", JSON.stringify(usersList));
    window.location.reload();
  }
}

// Search function
function searchFunc() {
  const input = document.querySelector(".navSearch");
  const boxes = document.querySelectorAll(".box");

  for (const box of boxes) {
    const itemName = box.querySelector(".name");
    const itemType = box.querySelector(".type");

    if (itemName || itemType) {
      const nameText = itemName
        ? itemName.textContent || itemName.innerText
        : "";
      const typeText = itemType
        ? itemType.textContent || itemType.innerText
        : "";

      const txtValue = nameText + typeText;
      if (txtValue.toUpperCase().includes(input.value.toUpperCase())) {
        box.style.display = "block";
      } else {
        box.style.display = "none";
      }
    }
    if (input.value === "") {
      box.style.display = "none";
    }
  }
}

// Contact Us function
function contactUs(event) {
  const target = event.target;
  const parentForm = target.closest(".form");
  const nameInput = parentForm.querySelector('input[name="name"]');
  const numberInput = parentForm.querySelector('input[name="number"]');
  const emailInput = parentForm.querySelector('input[name="email"]');
  const msgInput = parentForm.querySelector('textarea[name="msg"]');

  const name = nameInput.value;
  const number = numberInput.value;
  const email = emailInput.value;
  const message = msgInput.value;

  if (!name || !number || !email) {
    alert("Please fill in all fields.");
    return;
  }

  const namePattern = /^[A-Za-z\s]+$/;

  // Validate the name
  if (!namePattern.test(name)) {
    alert("Name does not meet the requirements or is invalid.");
    nameInput.classList.add("inputError");
    numberInput.classList.remove("inputError");
    emailInput.classList.remove("inputError");
    msgInput.classList.remove("inputError");
    return false;
  }

  // Validate the Email
  const isEmailValid = validateEmail(email);

  if (!isEmailValid) {
    alert("Email does not meet the requirements or is invalid.");
    nameInput.classList.remove("inputError");
    numberInput.classList.remove("inputError");
    emailInput.classList.add("inputError");
    msgInput.classList.remove("inputError");
    return false;
  }

  // Validate the message is not empty
  if (message.trim() === "") {
    alert("Message should not be empty.");
    nameInput.classList.remove("inputError");
    numberInput.classList.remove("inputError");
    emailInput.classList.remove("inputError");
    msgInput.classList.add("inputError");
    return false;
  }

  alert("Thank you for your message" + " " + name);
}

// Updating user values function
async function saveValues() {
  try {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    for (const user of usersList) {
      if (user.id == loggedInUser.id) {
        user.name = loggedInUser.name;
        user.email = loggedInUser.email;
        user.password = loggedInUser.password;
        localStorage.setItem("usersList", JSON.stringify(usersList));
        return;
      }
    }

    console.log("User not found");
  } catch (error) {
    console.error("Error saving values:", error);
  }
}

// Logout function
async function logout() {
  try {
    await saveValues();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    window.location.assign("./home.html");
  } catch (error) {
    console.error("Error logging out:", error);
  }
}
