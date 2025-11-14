import React from "react";

const MlCode = () => {
  const lineSeparator =
    "--------------------------------------------------------------------------------------------------------------";
const code = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Event Registration App</title>
<style>
body { font-family: Arial, sans-serif; padding: 20px; }
.tabs { display: flex; margin-bottom: 10px; cursor: pointer; }
.tab {
padding: 10px 20px;
border: 1px solid #ccc;
margin-right: 5px;
background-color: #f2f2f2;
}
.tab.active {
background-color: #007BFF;
color: white;
}
.tab-content { display: none; border: 1px solid #ccc; padding: 15px; }
.tab-content.active { display: block; }
input, select {
padding: 10px;
margin-bottom: 10px;
width: 100%;
box-sizing: border-box;
}
button {
padding: 10px 15px;
background-color: #28a745;
color: white;
border: none;
cursor: pointer;
}
.error { color: red; font-size: 0.9em; }
.success { color: green; font-size: 1em; }
table { width: 100%; border-collapse: collapse; margin-top: 15px; }
th, td {
border: 1px solid #ccc;
padding: 8px;
text-align: left;
}
</style>
</head>
<body>
<h2>🎉 Event Registration Application</h2>
<!-- Tabs -->
<div class="tabs">
<div class="tab active" onclick="switchTab('formTab')">🎉 Register</div>
<div class="tab" onclick="switchTab('viewTab')">🎉 View Registrations</div>
</div>
<!-- Registration Form Tab -->
<div id="formTab" class="tab-content active">
<form id="eventForm">
<label>Name *</label>
<input type="text" id="name" name="name">
<div class="error" id="nameError"></div>
<label>Email *</label>
<input type="email" id="email" name="email">
<div class="error" id="emailError"></div>
<label>Event *</label>
<select id="event" name="event">
<option value="">-- Select Event --</option>
<option value="Tech Talk">Tech Talk</option>
<option value="Startup Meetup">Startup Meetup</option>
<option value="Design Workshop">Design Workshop</option>
</select>
<div class="error" id="eventError"></div>
<button type="submit">Register</button>
<div id="formMessage"></div>
</form>
</div>
<!-- View Registrations Tab -->
<div id="viewTab" class="tab-content">
<h3>🎉 Registered Participants</h3>
<table id="registrationsTable">
<thead>
<tr><th>Name</th><th>Email</th><th>Event</th></tr>
</thead>
<tbody>
<!-- Data will be injected here -->
</tbody>
</table>
</div>
<script>
// Store registrations
const registrations = [];
// Switch tabs
function switchTab(tabId) {
document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
document.querySelector(`.tab[onclick="switchTab('${tabId}')"]`).classList.add('active');
document.getElementById(tabId).classList.add('active');
if (tabId === 'viewTab') renderTable(); }
// Form submission
document.getElementById('eventForm').addEventListener('submit', function(e) {
e.preventDefault();
// Clear messages
document.getElementById('formMessage').innerHTML = '';
document.getElementById('nameError').innerText = '';
document.getElementById('emailError').innerText = '';
document.getElementById('eventError').innerText = '';
const name = document.getElementById('name').value.trim();
const email = document.getElementById('email').value.trim();
const event = document.getElementById('event').value;
let valid = true;
// Validation
if (name === '') {
valid = false;
document.getElementById('nameError').innerText = 'Name is required.';
}
const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
if (email === '' || !emailPattern.test(email)) {
valid = false;
document.getElementById('emailError').innerText = 'Valid email is required.'; }
if (event === '') {
valid = false;
document.getElementById('eventError').innerText = 'Please select an event.';
}
if (valid) {
registrations.push({ name, email, event });
document.getElementById('formMessage').innerHTML = '<p class="success">Successfully Registered!</p>';
document.getElementById('eventForm').reset();
}
});
// Render registered data in table
function renderTable() {
const tbody = document.querySelector('#registrationsTable tbody');
tbody.innerHTML = '';
if (registrations.length === 0) {
tbody.innerHTML = '<tr><td colspan="3">No registrations yet.</td></tr>';
return;
}
registrations.forEach((entry) => {
const row = `<tr><td>${entry.name}</td><td>${entry.email}</td><td>${entry.event}</td></tr>`;
tbody.insertAdjacentHTML('beforeend', row); }); }
</script>
</body>
</HTML>
`

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">IOT Code Viewer</h2>
      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-sm leading-6">
        <div>
          2. IoT Application Development Using sensors and actuators
          (temperature sensor, light sensor, infrared sensor)
        </div>
        <code>{code} </code>
      </pre>
    </div>
  );
};

export default MlCode;
