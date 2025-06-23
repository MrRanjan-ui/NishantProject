
const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user1", password: "user123", role: "user" },
  { username: "user2", password: "user123", role: "user" },
]

function login(username, password, role) {
  console.log("Login attempt:", { username, role })
  const user = validateUser(username, password, role)
  
  if (user) {
    console.log("Login successful")
    localStorage.setItem("currentUser", JSON.stringify(user))
    localStorage.setItem("isLoggedIn", "true")
    return true
  }
  
  console.log("Login failed: Invalid credentials")
  return false
}

function logout() {
  localStorage.removeItem("currentUser")
  localStorage.removeItem("isLoggedIn")
  window.location.href = "index.html"
}

function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true"
}

function getCurrentUser() {
  const userStr = localStorage.getItem("currentUser")
  return userStr ? JSON.parse(userStr) : null
}

function register(username, password, role) {
  console.log("Registration attempt:", { username, role })
  
  
  const success = saveUser({ username, password, role })
  
  if (success) {
    console.log("Registration successful")
    return true
  }
  
  console.log("Registration failed: Username exists")
  return false
}

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname
  if (
    !currentPath.includes("index.html") &&
    !currentPath.includes("register.html") &&
    currentPath !== "/" &&
    !isLoggedIn()
  ) {
    window.location.href = "index.html"
  }
})
