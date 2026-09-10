// Registration

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function(event) {

        event.preventDefault();


        const data = {

            name: document.getElementById("name").value,

            age: document.getElementById("age").value,

            gender: document.getElementById("gender").value,

            email: document.getElementById("email").value,

            mobile: document.getElementById("mobile").value,

            address: document.getElementById("address").value,

            bloodGroup: document.getElementById("bloodGroup").value,

            problem: document.getElementById("problem").value,

            username: document.getElementById("username").value,

            password: document.getElementById("password").value
        };


        const response = await fetch("/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });


        const result = await response.json();


        document.getElementById("message").innerText =
            result.message;


        if (result.success) {

            setTimeout(() => {

                window.location.href = "login.html";

            }, 1500);

        }

    });

}



// Login

const loginForm = document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();


        const data = {

            username:
                document.getElementById("loginUsername").value,

            password:
                document.getElementById("loginPassword").value

        };


        const response = await fetch("/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });


        const result = await response.json();


        document.getElementById("loginMessage").innerText =
            result.message;


        if (result.success) {

            localStorage.setItem(
                "patient",
                JSON.stringify(result.patient)
            );


            window.location.href = "dashboard.html";

        }

    });

}



// Dashboard

const patientData = localStorage.getItem("patient");


if (window.location.pathname.includes("dashboard.html")) {

    if (!patientData) {

        window.location.href = "login.html";

    } else {

        const patient = JSON.parse(patientData);


        document.getElementById("patientName").innerText =
            patient.name;

        document.getElementById("patientAge").innerText =
            patient.age;

        document.getElementById("patientGender").innerText =
            patient.gender;

        document.getElementById("patientEmail").innerText =
            patient.email;

        document.getElementById("patientMobile").innerText =
            patient.mobile;

        document.getElementById("patientBlood").innerText =
            patient.bloodGroup;

        document.getElementById("patientProblem").innerText =
            patient.problem;

    }

}



// Logout

function logout() {

    localStorage.removeItem("patient");

    window.location.href = "login.html";

}