const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Registration page
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
});

// Login page
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Read patients from JSON
function getPatients() {
    try {
        const data = fs.readFileSync("patients.json", "utf8");

        if (data.trim() === "") {
            return [];
        }

        return JSON.parse(data);

    } catch (error) {
        return [];
    }
}

// Register patient
app.post("/register", (req, res) => {

    const {
        name,
        age,
        gender,
        email,
        mobile,
        address,
        bloodGroup,
        problem,
        username,
        password
    } = req.body;

    const patients = getPatients();

    // Check if username already exists
    const existingPatient = patients.find(
        patient =>
            patient.username === username ||
            patient.email === email
    );

    if (existingPatient) {
        return res.json({
            success: false,
            message: "Username or Email already exists!"
        });
    }

    const newPatient = {
        id: patients.length + 1,
        name,
        age,
        gender,
        email,
        mobile,
        address,
        bloodGroup,
        problem,
        username,
        password
    };

    patients.push(newPatient);

    fs.writeFileSync(
        "patients.json",
        JSON.stringify(patients, null, 2)
    );

    res.json({
        success: true,
        message: "Patient registered successfully!"
    });
});


// Login patient
app.post("/login", (req, res) => {

    const { username, password } = req.body;

    const patients = getPatients();

    const patient = patients.find(
        patient =>
            (patient.username === username ||
             patient.email === username) &&
            patient.password === password
    );

    if (patient) {

        res.json({
            success: true,
            message: "Login successful!",
            patient: patient
        });

    } else {

        res.json({
            success: false,
            message: "Invalid Username or Password!"
        });
    }
});


// Get patient details
app.get("/patients", (req, res) => {

    const patients = getPatients();

    res.json(patients);
});


// Start server
app.listen(PORT, () => {

    console.log(`Hospital Management System running at:`);
    console.log(`http://localhost:${PORT}`);

});