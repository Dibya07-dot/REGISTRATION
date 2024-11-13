
function toggleForm(form) {
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("successMessage").classList.add("hidden");
  
    if (form === "register") {
      document.getElementById("registerForm").classList.remove("hidden");
    } else if (form === "login") {
      document.getElementById("loginForm").classList.remove("hidden");
    }
  }
  

  function validateInput(username, password) {
    const usernamePattern = /^[a-zA-Z0-9]{4,}$/; 
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  
    if (!usernamePattern.test(username)) {
      alert("Username must be at least 4 characters and alphanumeric.");
      return false;
    }
    if (!passwordPattern.test(password)) {
      alert("Password must be at least 6 characters, include a digit, a lowercase and an uppercase letter.");
      return false;
    }
    return true;
  }
  

  async function register() {
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;
  
    if (!validateInput(username, password)) return;
  
    const hashedPassword = CryptoJS.SHA256(password).toString();
    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password: hashedPassword })
    });
    
    const result = await response.json();
    alert(result.message);
    if (response.ok) toggleForm("login");
  }
  

  async function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
  
    const hashedPassword = CryptoJS.SHA256(password).toString();
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password: hashedPassword })
    });
  
    const result = await response.json();
    if (response.ok) {
      document.getElementById("usernameDisplay").textContent = username;
      toggleForm("success");
    } else {
      alert(result.message);
    }
  }
  

  function logout() {
    toggleForm("login");
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";
  }
  