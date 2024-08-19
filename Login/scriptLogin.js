// Function to set a cookie with an expiration date
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie by name
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

// Function to register a user and store their data in cookies
function registerUser(e) {
    e.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var age = document.getElementById("age").value;
    var gender = document.getElementById("gender").value;
    var birthday = document.getElementById("birthday").value;
    var fitnessGoal = document.getElementById("fitnessGoal").value;
    var selfIntroduction = document.getElementById("selfIntroduction").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match! Please try again.");
        return;
    }

    // Generate a unique cookie key for each user based on their email
    var userCookieKey = "user_" + encodeURIComponent(email);

    // Store user data in cookies with a 30-day expiration
    setCookie(userCookieKey + "_name", encodeURIComponent(name), 30);
    setCookie(userCookieKey + "_email", encodeURIComponent(email), 30);
    setCookie(userCookieKey + "_password", encodeURIComponent(password), 30);
    setCookie(userCookieKey + "_age", encodeURIComponent(age), 30);
    setCookie(userCookieKey + "_gender", encodeURIComponent(gender), 30);
    setCookie(userCookieKey + "_birthday", encodeURIComponent(birthday), 30);
    setCookie(userCookieKey + "_fitnessGoal", encodeURIComponent(fitnessGoal), 30);
    setCookie(userCookieKey + "_selfIntroduction", encodeURIComponent(selfIntroduction), 30);

    alert("Registration successful! Redirecting to login page...");
    window.location.href = "login.html";
}

// Function to login a user
function loginUser(e) {
    e.preventDefault();

    var loginEmail = document.getElementById("loginEmail").value;
    var loginPassword = document.getElementById("loginPassword").value;

    // Generate the cookie key for the user based on their email
    var userCookieKey = "user_" + encodeURIComponent(loginEmail);

    var storedEmail = getCookie(userCookieKey + "_email");
    var storedPassword = getCookie(userCookieKey + "_password");

    if (storedEmail === encodeURIComponent(loginEmail) && storedPassword === encodeURIComponent(loginPassword)) {
        alert("Login successful!");
        sessionStorage.setItem("loggedInUser", loginEmail);
        window.location.href = "profile.html";
    } else {
        alert("Invalid email or password!");
    }
}

// Function to redirect to another page
function goToAnotherPage() {
    window.location.href = "index.html"; // Replace with your actual HTML page
}

// Function to load the profile data when the page loads
function loadProfile() {
    var loggedInUserEmail = sessionStorage.getItem("loggedInUser");

    if (!loggedInUserEmail) {
        alert("You must be logged in to view your profile.");
        window.location.href = "login.html";
        return;
    }

    // Generate the cookie key for the logged-in user based on their email
    var userCookieKey = "user_" + encodeURIComponent(loggedInUserEmail);

    var storedName = getCookie(userCookieKey + "_name");
    var storedEmail = getCookie(userCookieKey + "_email");
    var storedAge = getCookie(userCookieKey + "_age");
    var storedGender = getCookie(userCookieKey + "_gender");
    var storedBirthday = getCookie(userCookieKey + "_birthday");
    var storedFitnessGoal = getCookie(userCookieKey + "_fitnessGoal");
    var storedSelfIntroduction = getCookie(userCookieKey + "_selfIntroduction");

    if (storedEmail) {
        document.getElementById("profileName").textContent = decodeURIComponent(storedName);
        document.getElementById("profileEmail").textContent = decodeURIComponent(storedEmail);
        document.getElementById("profileAge").textContent = decodeURIComponent(storedAge);
        document.getElementById("profileGender").textContent = decodeURIComponent(storedGender);
        document.getElementById("profileBirthday").textContent = decodeURIComponent(storedBirthday);
        document.getElementById("profileFitnessGoal").textContent = decodeURIComponent(storedFitnessGoal);
        document.getElementById("profileSelfIntroduction").textContent = decodeURIComponent(storedSelfIntroduction);
    } else {
        alert("Profile data not found.");
        window.location.href = "login.html";
    }
}

// Function to toggle edit mode
function toggleEditProfile() {
    var form = document.getElementById("editProfileForm");
    var profileView = document.getElementById("profileView");

    if (form.style.display === "none") {
        form.style.display = "block";
        profileView.style.display = "none";

        // Populate the form fields with current profile data
        var loggedInUserEmail = sessionStorage.getItem("loggedInUser");
        var userCookieKey = "user_" + encodeURIComponent(loggedInUserEmail);

        document.getElementById("editEmail").value = decodeURIComponent(getCookie(userCookieKey + "_email"));
        document.getElementById("editAge").value = decodeURIComponent(getCookie(userCookieKey + "_age"));
        document.getElementById("editGender").value = decodeURIComponent(getCookie(userCookieKey + "_gender"));
        document.getElementById("editBirthday").value = decodeURIComponent(getCookie(userCookieKey + "_birthday"));
        document.getElementById("editFitnessGoal").value = decodeURIComponent(getCookie(userCookieKey + "_fitnessGoal"));
        document.getElementById("editSelfIntroduction").value = decodeURIComponent(getCookie(userCookieKey + "_selfIntroduction"));
    } else {
        form.style.display = "none";
        profileView.style.display = "block";
    }
}

// Function to update profile information
function updateProfile(e) {
    e.preventDefault();

    var loggedInUserEmail = sessionStorage.getItem("loggedInUser");
    var userCookieKey = "user_" + encodeURIComponent(loggedInUserEmail);

    var age = document.getElementById("editAge").value;
    var gender = document.getElementById("editGender").value;
    var birthday = document.getElementById("editBirthday").value;
    var fitnessGoal = document.getElementById("editFitnessGoal").value;
    var selfIntroduction = document.getElementById("editSelfIntroduction").value;

    // Update cookies with new profile data
    setCookie(userCookieKey + "_age", encodeURIComponent(age), 30);
    setCookie(userCookieKey + "_gender", encodeURIComponent(gender), 30);
    setCookie(userCookieKey + "_birthday", encodeURIComponent(birthday), 30);
    setCookie(userCookieKey + "_fitnessGoal", encodeURIComponent(fitnessGoal), 30);
    setCookie(userCookieKey + "_selfIntroduction", encodeURIComponent(selfIntroduction), 30);

    alert("Profile updated successfully!");

    // Reload the profile view with updated information
    toggleEditProfile();
    loadProfile();
}

// Function to log out the user
function logoutUser() {
    // Clear session data
    sessionStorage.removeItem("loggedInUser");

    alert("Logged out successfully!");

    // Redirect to login page
    window.location.href = "login.html";
}
