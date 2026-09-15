/* =========================
   REAL-TIME DONOR COUNT
========================= */

async function updateDonorCount() {

    const donorCount =
        document.getElementById("donor-count");

    if (!donorCount) {
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:8081/api/donors/count"
        );

        if (!response.ok) {
            throw new Error("Unable to get donor count");
        }

        const count = await response.json();

        donorCount.textContent = count;

    } catch (error) {

        console.error(error);

        donorCount.textContent = "0";
    }
}


/* =========================
   EMERGENCY REQUEST COUNT
========================= */

async function updateEmergencyRequestCount() {

    const emergencyRequestCount =
        document.getElementById(
            "emergency-request-count"
        );

    if (!emergencyRequestCount) {
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:8081/api/emergency-requests/count"
        );

        if (!response.ok) {
            throw new Error(
                "Unable to get emergency request count"
            );
        }

        const count = await response.json();

        emergencyRequestCount.textContent = count;

    } catch (error) {

        console.error(error);

        emergencyRequestCount.textContent = "0";
    }
}


/* =========================
   SUCCESSFUL MATCH COUNT
========================= */

async function updateMatchCount() {

    const matchCount =
        document.getElementById("match-count");

    if (!matchCount) {
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:8081/api/matches/count"
        );

        if (!response.ok) {
            throw new Error(
                "Unable to get match count"
            );
        }

        const count = await response.json();

        matchCount.textContent = count;

    } catch (error) {

        console.error(error);

        matchCount.textContent = "0";
    }
}


/* =========================
   FIND DONOR
========================= */

function setupFindDonor() {

    const searchDonorBtn =
        document.getElementById(
            "search-Donor-btn"
        );

    const bloodGroup =
        document.getElementById(
            "blood-group"
        );

    const locationInput =
        document.getElementById(
            "location"
        );

    const resultsDiv =
        document.getElementById(
            "donor-results"
        );


    if (!searchDonorBtn) {
        return;
    }


    searchDonorBtn.addEventListener(
        "click",
        async function (event) {

            event.preventDefault();

            const selectedBloodGroup =
                bloodGroup.value;

            const enteredLocation =
                locationInput.value.trim();


            resultsDiv.innerHTML = "";


            if (
                selectedBloodGroup === "" ||
                enteredLocation === ""
            ) {

                alert(
                    "Please select a blood group and enter a location."
                );

                return;
            }


            resultsDiv.innerHTML =
                "<p>Searching for donors...</p>";


            try {

                const response = await fetch(
                    `http://localhost:8081/api/donors/search?bloodGroup=${encodeURIComponent(selectedBloodGroup)}&location=${encodeURIComponent(enteredLocation)}`
                );


                if (!response.ok) {

                    throw new Error(
                        "Unable to search donors"
                    );
                }


                const matchingDonors =
                    await response.json();


                resultsDiv.innerHTML = "";


                if (
                    matchingDonors.length > 0
                ) {

                    matchingDonors.forEach(
                        function (donor) {

                            const donorCard =
                                document.createElement(
                                    "div"
                                );


                            donorCard.innerHTML = `

                                <h3>
                                    ${donor.name}
                                </h3>

                                <p>
                                    Blood Group:
                                    ${donor.bloodGroup}
                                </p>

                                <p>
                                    Location:
                                    ${donor.location}
                                </p>

                                <p>
                                    Phone:
                                    ${donor.phone}
                                </p>

                            `;


                            resultsDiv.appendChild(
                                donorCard
                            );
                        }
                    );

                } else {

                    resultsDiv.innerHTML =
                        "<p>No matching donor found.</p>";
                }


            } catch (error) {

                console.error(error);

                resultsDiv.innerHTML =
                    "<p>Unable to connect to the server.</p>";
            }

        }
    );
}


/* =========================
   DONOR REGISTRATION
========================= */

function setupDonorRegistration() {

    const registerDonorBtn =
        document.getElementById(
            "register-donor-btn"
        );

    const nameInput =
        document.getElementById(
            "name"
        );

    const donorBloodGroup =
        document.getElementById(
            "donor-blood-group"
        );

    const donorLocation =
        document.getElementById(
            "donor-location"
        );

    const phoneInput =
        document.getElementById(
            "phone"
        );

    const registrationResult =
        document.getElementById(
            "registration-result"
        );


    if (!registerDonorBtn) {
        return;
    }


    registerDonorBtn.addEventListener(
        "click",
        async function (event) {

            event.preventDefault();


            const name =
                nameInput.value.trim();

            const bloodGroup =
                donorBloodGroup.value;

            const location =
                donorLocation.value.trim();

            const phone =
                phoneInput.value.trim();


            if (
                name === "" ||
                bloodGroup === "" ||
                location === "" ||
                phone === ""
            ) {

                alert(
                    "Please fill in all donor registration details."
                );

                return;
            }


            if (!/^[0-9]{10}$/.test(phone)) {

                alert(
                    "Please enter a valid 10-digit phone number."
                );

                return;
            }


            const donorData = {

                name: name,
                bloodGroup: bloodGroup,
                location: location,
                phone: phone
            };


            registrationResult.innerHTML =
                "<p>Registering donor...</p>";


            try {

                const response =
                    await fetch(
                        "http://localhost:8081/api/donors",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    donorData
                                )
                        }
                    );


                if (response.ok) {

                    registrationResult.innerHTML = `

                        <h3>
                            Donor Registration Successful!
                        </h3>

                        <p>
                            Your information has been saved successfully.
                        </p>

                    `;


                    nameInput.value = "";
                    donorBloodGroup.value = "";
                    donorLocation.value = "";
                    phoneInput.value = "";


                    updateDonorCount();

                } else {

                    registrationResult.innerHTML =
                        "<p>Registration failed. Please try again.</p>";
                }


            } catch (error) {

                console.error(error);

                registrationResult.innerHTML =
                    "<p>Unable to connect to the server.</p>";
            }

        }
    );
}


/* =========================
   EMERGENCY REQUEST
========================= */

function setupEmergencyRequest() {

    const emergencyBtn =
        document.getElementById(
            "emergency-request-btn"
        );

    const patientName =
        document.getElementById(
            "patient-name"
        );

    const requiredBloodGroup =
        document.getElementById(
            "required-blood-group"
        );

    const units =
        document.getElementById(
            "units"
        );

    const hospital =
        document.getElementById(
            "hospital"
        );

    const requestLocation =
        document.getElementById(
            "request-location"
        );

    const emergencyResult =
        document.getElementById(
            "emergency-result"
        );


    if (!emergencyBtn) {
        return;
    }


    emergencyBtn.addEventListener(
        "click",
        async function (event) {

            event.preventDefault();


            const name =
                patientName.value.trim();

            const bloodGroup =
                requiredBloodGroup.value;

            const unitCount =
                units.value;

            const hospitalName =
                hospital.value.trim();

            const location =
                requestLocation.value.trim();


            if (
                name === "" ||
                bloodGroup === "" ||
                unitCount === "" ||
                hospitalName === "" ||
                location === ""
            ) {

                alert(
                    "Please fill in all emergency request details."
                );

                return;
            }


            if (Number(unitCount) <= 0) {

                alert(
                    "Number of units must be greater than 0."
                );

                return;
            }


            const emergencyData = {

                patientName: name,
                bloodGroup: bloodGroup,
                units: Number(unitCount),
                hospital: hospitalName,
                location: location
            };


            emergencyResult.innerHTML =
                "<p>Submitting emergency request...</p>";


            try {

                const response =
                    await fetch(
                        "http://localhost:8081/api/emergency-requests",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    emergencyData
                                )
                        }
                    );


                if (response.ok) {

                    emergencyResult.innerHTML = `

                        <h3>
                            Emergency Request Submitted!
                        </h3>

                        <p>
                            Your emergency blood request has been saved successfully.
                        </p>

                    `;


                    patientName.value = "";
                    requiredBloodGroup.value = "";
                    units.value = "";
                    hospital.value = "";
                    requestLocation.value = "";


                    updateEmergencyRequestCount();

                } else {

                    emergencyResult.innerHTML =
                        "<p>Unable to submit the emergency request.</p>";
                }


            } catch (error) {

                console.error(error);

                emergencyResult.innerHTML =
                    "<p>Unable to connect to the server.</p>";
            }

        }
    );
}


/* =========================
   EMERGENCY REQUESTS
   FIND MATCHING DONORS
   CREATE MATCH
========================= */

function setupEmergencyRequests() {

    const viewRequestsBtn =
        document.getElementById(
            "view-emergency-requests-btn"
        );

    const requestsList =
        document.getElementById(
            "emergency-requests-list"
        );


    if (!viewRequestsBtn) {
        return;
    }


    viewRequestsBtn.addEventListener(
        "click",
        async function () {

            requestsList.innerHTML =
                "<p>Loading emergency requests...</p>";


            try {

                const response =
                    await fetch(
                        "http://localhost:8081/api/emergency-requests"
                    );


                if (!response.ok) {

                    throw new Error(
                        "Unable to get emergency requests"
                    );
                }


                const requests =
                    await response.json();


                requestsList.innerHTML = "";


                if (requests.length === 0) {

                    requestsList.innerHTML =
                        "<p>No emergency requests found.</p>";

                    return;
                }


                requests.forEach(
                    function (request) {

                        const requestCard =
                            document.createElement(
                                "div"
                            );


                        requestCard.innerHTML = `

                            <h3>
                                ${request.patientName}
                            </h3>

                            <p>
                                Blood Group:
                                ${request.bloodGroup}
                            </p>

                            <p>
                                Units Required:
                                ${request.units}
                            </p>

                            <p>
                                Hospital:
                                ${request.hospital}
                            </p>

                            <p>
                                Location:
                                ${request.location}
                            </p>

                            <p>
                                Request ID:
                                ${request.id}
                            </p>

                            <button
                                type="button"
                                class="find-matching-donors-btn"
                                data-blood-group="${request.bloodGroup}"
                                data-location="${request.location}"
                                data-request-id="${request.id}"
                            >
                                Find Matching Donors
                            </button>

                            <div
                                class="matching-donors-results"
                            >
                            </div>

                        `;


                        requestsList.appendChild(
                            requestCard
                        );
                    }
                );


                const matchingButtons =
                    document.querySelectorAll(
                        ".find-matching-donors-btn"
                    );


                matchingButtons.forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            async function () {

                                const bloodGroup =
                                    button.dataset.bloodGroup;

                                const location =
                                    button.dataset.location;

                                const requestId =
                                    button.dataset.requestId;


                                const requestCard =
                                    button.parentElement;

                                const resultsDiv =
                                    requestCard.querySelector(
                                        ".matching-donors-results"
                                    );


                                resultsDiv.innerHTML =
                                    "<p>Searching for matching donors...</p>";


                                try {

                                    const response =
                                        await fetch(
                                            `http://localhost:8081/api/donors/search?bloodGroup=${encodeURIComponent(bloodGroup)}&location=${encodeURIComponent(location)}`
                                        );


                                    if (!response.ok) {

                                        throw new Error(
                                            "Unable to search donors"
                                        );
                                    }


                                    const donors =
                                        await response.json();


                                    resultsDiv.innerHTML =
                                        "";


                                    if (
                                        donors.length === 0
                                    ) {

                                        resultsDiv.innerHTML =
                                            "<p>No matching donors found.</p>";

                                        return;
                                    }


                                    donors.forEach(
                                        function (donor) {

                                            const donorCard =
                                                document.createElement(
                                                    "div"
                                                );


                                            donorCard.innerHTML = `

                                                <h4>
                                                    ${donor.name}
                                                </h4>

                                                <p>
                                                    Blood Group:
                                                    ${donor.bloodGroup}
                                                </p>

                                                <p>
                                                    Location:
                                                    ${donor.location}
                                                </p>

                                                <p>
                                                    Phone:
                                                    ${donor.phone}
                                                </p>

                                                <button
                                                    type="button"
                                                    class="create-match-btn"
                                                    data-donor-id="${donor.id}"
                                                    data-request-id="${requestId}"
                                                >
                                                    Match This Donor
                                                </button>

                                            `;


                                            resultsDiv.appendChild(
                                                donorCard
                                            );
                                        }
                                    );


                                    const matchButtons =
                                        resultsDiv.querySelectorAll(
                                            ".create-match-btn"
                                        );


                                    matchButtons.forEach(
                                        function (matchButton) {

                                            matchButton.addEventListener(
                                                "click",
                                                async function () {

                                                    const donorId =
                                                        Number(
                                                            matchButton.dataset.donorId
                                                        );

                                                    const emergencyRequestId =
                                                        Number(
                                                            matchButton.dataset.requestId
                                                        );


                                                    const matchData = {

                                                        donorId:
                                                            donorId,

                                                        emergencyRequestId:
                                                            emergencyRequestId
                                                    };


                                                    matchButton.disabled =
                                                        true;

                                                    matchButton.textContent =
                                                        "Creating Match...";


                                                    try {

                                                        const response =
                                                            await fetch(
                                                                "http://localhost:8081/api/matches",
                                                                {

                                                                    method:
                                                                        "POST",

                                                                    headers: {

                                                                        "Content-Type":
                                                                            "application/json"
                                                                    },

                                                                    body:
                                                                        JSON.stringify(
                                                                            matchData
                                                                        )
                                                                }
                                                            );


                                                        if (
                                                            response.ok
                                                        ) {

                                                            alert(
                                                                "Donor matched successfully!"
                                                            );


                                                            updateMatchCount();


                                                            matchButton.textContent =
                                                                "Matched Successfully";

                                                        }

                                                        else if (
                                                            response.status === 409
                                                        ) {

                                                            alert(
                                                                "This donor has already been matched with this emergency request."
                                                            );


                                                            matchButton.textContent =
                                                                "Already Matched";

                                                        }

                                                        else {

                                                            alert(
                                                                "Unable to create the match. Please try again."
                                                            );


                                                            matchButton.disabled =
                                                                false;

                                                            matchButton.textContent =
                                                                "Match This Donor";
                                                        }


                                                    } catch (error) {

                                                        console.error(
                                                            error
                                                        );


                                                        alert(
                                                            "Unable to connect to the server."
                                                        );


                                                        matchButton.disabled =
                                                            false;

                                                        matchButton.textContent =
                                                            "Match This Donor";
                                                    }

                                                }
                                            );
                                        }
                                    );


                                } catch (error) {

                                    console.error(error);

                                    resultsDiv.innerHTML =
                                        "<p>Unable to search donors.</p>";
                                }

                            }
                        );
                    }
                );


            } catch (error) {

                console.error(error);

                requestsList.innerHTML =
                    "<p>Unable to connect to the server.</p>";
            }

        }
    );
}


/* =========================
   MATCH HISTORY
========================= */

function setupMatchHistory() {

    const viewMatchesBtn =
        document.getElementById(
            "view-matches-btn"
        );

    const matchesList =
        document.getElementById(
            "matches-list"
        );


    if (!viewMatchesBtn) {
        return;
    }


    viewMatchesBtn.addEventListener(
        "click",
        async function () {

            matchesList.innerHTML =
                "<p>Loading successful matches...</p>";


            try {

                const response =
                    await fetch(
                        "http://localhost:8081/api/matches"
                    );


                if (!response.ok) {

                    throw new Error(
                        "Unable to get matches"
                    );
                }


                const matches =
                    await response.json();


                matchesList.innerHTML =
                    "";


                if (
                    matches.length === 0
                ) {

                    matchesList.innerHTML =
                        "<p>No successful matches found.</p>";

                    return;
                }


                matches.forEach(
                    function (match) {

                        const matchCard =
                            document.createElement(
                                "div"
                            );


                        matchCard.innerHTML = `

                            <h3>
                                Successful Match
                            </h3>

                            <p>
                                Match ID:
                                ${match.id}
                            </p>

                            <p>
                                Donor ID:
                                ${match.donorId}
                            </p>

                            <p>
                                Emergency Request ID:
                                ${match.emergencyRequestId}
                            </p>

                        `;


                        matchesList.appendChild(
                            matchCard
                        );
                    }
                );


            } catch (error) {

                console.error(error);


                matchesList.innerHTML =
                    "<p>Unable to load successful matches.</p>";
            }

        }
    );
}


/* =========================
   LOGIN
========================= */

function setupLogin() {

    const loginBtn =
        document.getElementById(
            "login-btn"
        );

    const emailInput =
        document.getElementById(
            "email"
        );

    const passwordInput =
        document.getElementById(
            "password"
        );


    if (!loginBtn) {
        return;
    }


    loginBtn.addEventListener(
        "click",
        async function (event) {

            event.preventDefault();


            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value.trim();


            if (
                email === "" ||
                password === ""
            ) {

                alert(
                    "Please enter your email and password."
                );

                return;
            }


            const loginData = {

                email: email,
                password: password
            };


            try {

                const response =
                    await fetch(
                        "http://localhost:8081/api/users/login",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    loginData
                                )
                        }
                    );


                const data =
                    await response.json();


                if (
                    response.ok &&
                    data.message ===
                    "Login successful"
                ) {

                    alert(
                        "Login successful!"
                    );


                    emailInput.value = "";
                    passwordInput.value = "";

                } else {

                    alert(
                        data.message ||
                        "Invalid email or password."
                    );
                }


            } catch (error) {

                console.error(error);

                alert(
                    "Unable to connect to the server."
                );
            }

        }
    );
}


/* =========================
   SIGN UP
========================= */

function setupSignup() {

    const signupBtn =
        document.getElementById(
            "signup-btn"
        );

    const signupEmail =
        document.getElementById(
            "signup-email"
        );

    const signupPassword =
        document.getElementById(
            "signup-password"
        );

    const signupResult =
        document.getElementById(
            "signup-result"
        );


    if (!signupBtn) {
        return;
    }


    signupBtn.addEventListener(
        "click",
        async function (event) {

            event.preventDefault();


            const email =
                signupEmail.value.trim();

            const password =
                signupPassword.value.trim();


            if (
                email === "" ||
                password === ""
            ) {

                alert(
                    "Please enter your email and password."
                );

                return;
            }


            if (password.length < 6) {

                alert(
                    "Password must contain at least 6 characters."
                );

                return;
            }


            const userData = {

                email: email,
                password: password
            };


            signupResult.innerHTML =
                "<p>Creating account...</p>";


            try {

                const response =
                    await fetch(
                        "http://localhost:8081/api/users/register",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    userData
                                )
                        }
                    );


                const data =
                    await response.json();


                if (
                    response.ok
                ) {

                    signupResult.innerHTML = `

                        <h3>
                            Account Created Successfully!
                        </h3>

                        <p>
                            You can now log in using your email and password.
                        </p>

                    `;


                    signupEmail.value = "";
                    signupPassword.value = "";

                } else {

                    signupResult.innerHTML = `

                        <p>
                            ${data.message ||
                            "Unable to create account."}
                        </p>

                    `;
                }


            } catch (error) {

                console.error(error);

                signupResult.innerHTML =
                    "<p>Unable to create account.</p>";
            }

        }
    );
}


/* =========================
   START APPLICATION
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* Load statistics */

        updateDonorCount();

        updateEmergencyRequestCount();

        updateMatchCount();


        /* Setup all features */

        setupFindDonor();

        setupDonorRegistration();

        setupEmergencyRequest();

        setupEmergencyRequests();

        setupMatchHistory();

        setupLogin();

        setupSignup();

    }
);