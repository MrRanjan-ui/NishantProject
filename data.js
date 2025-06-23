// Data management using localStorage to simulate JSON file storage ----

// Sample initial data
const initialData = [
  {
    id: 1,
    initiativeTitle: "Automated Testing Framework",
    initiativeDescription:
      "Developed to reduce manual testing effort and improve quality.",
    rightThingForCoE: "Ensured best practices and compliance.",
    beyondTraditionalScope: "Enabled business users to write tests.",
    advancedUnderstanding: "Integrated with CI/CD and cloud tools.",
    seekOpportunities: "Proposed AI-based test generation.",
    createdBy: "admin",
    dateCreated: "2024-01-01T10:00:00.000Z",
  },
  {
    id: 2,
    initiativeTitle: "Knowledge Sharing Portal",
    initiativeDescription: "Centralized platform for sharing technical knowledge.",
    rightThingForCoE: "Promoted learning culture.",
    beyondTraditionalScope: "Open to all departments.",
    advancedUnderstanding: "Used latest web frameworks.",
    seekOpportunities: "Gamified contributions.",
    createdBy: "user1",
    dateCreated: "2024-01-02T11:00:00.000Z",
  },
]

// Initialize data if not exists
function initializeData() {
  if (!localStorage.getItem("dashboardData")) {
    localStorage.setItem("dashboardData", JSON.stringify(initialData))
  }
}

// Get all data
function getData() {
  initializeData()
  const dataStr = localStorage.getItem("dashboardData")
  return dataStr ? JSON.parse(dataStr) : []
}

// Save new data
function saveData(newItem) {
  const currentData = getData()
  currentData.push(newItem)
  localStorage.setItem("dashboardData", JSON.stringify(currentData))
}

// Update existing data
function updateData(id, updatedItem) {
  const currentData = getData()
  const index = currentData.findIndex((item) => item.id === id)
  if (index !== -1) {
    currentData[index] = { ...currentData[index], ...updatedItem }
    localStorage.setItem("dashboardData", JSON.stringify(currentData))
    return true
  }
  return false
}

// Delete data
function deleteData(id) {
  const currentData = getData()
  const filteredData = currentData.filter((item) => item.id !== id)
  localStorage.setItem("dashboardData", JSON.stringify(filteredData))
}

// Get data by user (for role-based access)
function getDataByUser(username) {
  const allData = getData()
  return allData.filter((item) => item.createdBy === username)
}

// Search data
function searchData(searchTerm) {
  const allData = getData()
  const term = searchTerm.toLowerCase()
  return allData.filter(
    (item) =>
      item.name.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term) ||
      item.department.toLowerCase().includes(term) ||
      item.position.toLowerCase().includes(term),
  )
}

// Get data statistics
function getDataStats() {
  const data = getData()
  const stats = {
    total: data.length,
    byDepartment: {},
    byCreator: {},
  }

  data.forEach((item) => {
    // Count by department
    stats.byDepartment[item.department] = (stats.byDepartment[item.department] || 0) + 1

    // Count by creator
    stats.byCreator[item.createdBy] = (stats.byCreator[item.createdBy] || 0) + 1
  })

  return stats
}

// User data management
const initialUsers = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user1", password: "user123", role: "user" },
  { username: "user2", password: "user123", role: "user" },
]

// Initialize users if not exists
function initializeUsers() {
  if (!localStorage.getItem("userData")) {
    localStorage.setItem("userData", JSON.stringify(initialUsers))
  }
}

// Get all users
function getUsers() {
  initializeUsers()
  const usersStr = localStorage.getItem("userData")
  return usersStr ? JSON.parse(usersStr) : []
}

// Save new user
function saveUser(newUser) {
  const currentUsers = getUsers()
  // Check if username already exists
  if (currentUsers.some((user) => user.username === newUser.username)) {
    return false
  }
  currentUsers.push(newUser)
  localStorage.setItem("userData", JSON.stringify(currentUsers))
  return true
}

// Validate user login
function validateUser(username, password, role) {
  const users = getUsers()
  return users.find(
    (user) =>
      user.username === username &&
      user.password === password &&
      user.role === role,
  )
}

// Add function to delete user
function deleteUser(username) {
  const users = getUsers();
  const updatedUsers = users.filter(user => user.username !== username);
  localStorage.setItem("userData", JSON.stringify(updatedUsers));
  return true;
}

// Export data (modified to include users)
function exportData() {
  const data = {
    users: getUsers(),
    dashboardData: getData(),
  }
  const dataStr = JSON.stringify(data, null, 2)
  const dataBlob = new Blob([dataStr], { type: "application/json" })

  const link = document.createElement("a")
  link.href = URL.createObjectURL(dataBlob)
  link.download = `dashboard-full-data-${new Date()
    .toISOString()
    .split("T")[0]}.json`
  link.click()
}

// Import data (modified to handle users)
function importData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result)
        if (importedData.users && importedData.dashboardData) {
          localStorage.setItem("userData", JSON.stringify(importedData.users))
          localStorage.setItem("dashboardData", JSON.stringify(importedData.dashboardData))
          resolve(true)
        } else {
          reject("Invalid data format")
        }
      } catch (error) {
        reject("Error parsing JSON file")
      }
    }
    reader.readAsText(file)
  })
}

  link.click()


// Import data (modified to handle users)
function importData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result)
        if (importedData.users && importedData.dashboardData) {
          localStorage.setItem("userData", JSON.stringify(importedData.users))
          localStorage.setItem("dashboardData", JSON.stringify(importedData.dashboardData))
          resolve(true)
        } else {
          reject("Invalid data format")
        }
      } catch (error) {
        reject("Error parsing JSON file")
      }
    }
    reader.readAsText(file)
  })
}
