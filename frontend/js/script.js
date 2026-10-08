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
            "https://blood-donation-network-production.up.railway.app/api/donors/count"
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
            "https://blood-donation-network-production.up.railway.app/api/emergency-requests/count"
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
            "https://blood-donation-network-production.up.railway.app/api/matches/count"
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
                    `https://blood-donation-network-production.up.railway.app/api/donors/search?bloodGroup=${encodeURIComponent(selectedBloodGroup)}&location=${encodeURIComponent(enteredLocation)}`
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
                        "https://blood-donation-network-production.up.railway.app/api/donors",
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

    const unitsInput =
        document.getElementById(
            "units"
        );

    const hospitalInput =
        document.getElementById(
            "hospital"
        );

    const requestLocation =
        document.getElementById(
            "request-location"
        );

    const requestResult =
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


            const patient =
                patientName.value.trim();

            const bloodGroup =
                requiredBloodGroup.value;

            const units =
                unitsInput.value;

            const hospital =
                hospitalInput.value.trim();

            const location =
                requestLocation.value.trim();


            if (
                patient === "" ||
                bloodGroup === "" ||
                units === "" ||
                hospital === "" ||
                location === ""
            ) {

                alert(
                    "Please fill in all emergency request details."
                );

                return;
            }


            if (Number(units) <= 0) {

                alert(
                    "Units required must be greater than 0."
                );

                return;
            }


            const requestData = {

                patientName: patient,
                requiredBloodGroup: bloodGroup,
                units: Number(units),
                hospital: hospital,
                location: location
            };


            requestResult.innerHTML =
                "<p>Submitting emergency request...</p>";


            try {

                const response =
                    await fetch(
                        "https://blood-donation-network-production.up.railway.app/api/emergency-requests",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    requestData
                                )
                        }
                    );


                const data =
                    await response.json();


                if (response.ok) {

                    requestResult.innerHTML = `

                        <h3>
                            Emergency Request Submitted!
                        </h3>

                        <p>
                            Your emergency blood request has been recorded successfully.
                        </p>

                    `;


                    patientName.value = "";
                    requiredBloodGroup.value = "";
                    unitsInput.value = "";
                    hospitalInput.value = "";
                    requestLocation.value = "";


                    updateEmergencyRequestCount();

                } else {

                    requestResult.innerHTML = `

                        <p>
                            ${data.message ||
                            "Unable to submit emergency request."}
                        </p>

                    `;
                }


            } catch (error) {

                console.error(error);

                requestResult.innerHTML =
                    "<p>Unable to connect to the server.</p>";
            }

        }
    );
}


/* =========================
   EMERGENCY REQUESTS
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
                        "https://blood-donation-network-production.up.railway.app/api/emergency-requests"
                    );


                if (!response.ok) {

                    throw new Error(
                        "Unable to get emergency requests"
                    );
                }


                const requests =
                    await response.json();


                requestsList.innerHTML =
                    "";


                if (
                    requests.length === 0
                ) {

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
                                Emergency Request #${request.id}
                            </h3>

                            <p>
                                Patient:
                                ${request.patientName}
                            </p>

                            <p>
                                Blood Group:
                                ${request.requiredBloodGroup}
                            </p>

                            <p>
                                Units:
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

                            <button
                                class="find-match-btn"
                                data-id="${request.id}"
                                data-blood-group="${request.requiredBloodGroup}"
                                data-location="${request.location}"
                            >
                                Find Matching Donors
                            </button>

                            <div
                                class="matching-donors"
                                id="matching-donors-${request.id}"
                            ></div>

                        `;


                        requestsList.appendChild(
                            requestCard
                        );


                        const matchButton =
                            requestCard.querySelector(
                                ".find-match-btn"
                            );


                        matchButton.addEventListener(
                            "click",
                            async function () {

                                const requestId =
                                    this.dataset.id;

                                const bloodGroup =
                                    this.dataset.bloodGroup;

                                const location =
                                    this.dataset.location;

                                const resultsDiv =
                                    document.getElementById(
                                        `matching-donors-${requestId}`
                                    );


                                resultsDiv.innerHTML =
                                    "<p>Searching for matching donors...</p>";


                                try {

                                    const response =
                                        await fetch(
                                            `https://blood-donation-network-production.up.railway.app/api/donors/search?bloodGroup=${encodeURIComponent(bloodGroup)}&location=${encodeURIComponent(location)}`
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
                                                    class="match-donor-btn"
                                                    data-donor-id="${donor.id}"
                                                    data-request-id="${requestId}"
                                                >
                                                    Create Match
                                                </button>

                                            `;


                                            resultsDiv.appendChild(
                                                donorCard
                                            );


                                            const matchDonorBtn =
                                                donorCard.querySelector(
                                                    ".match-donor-btn"
                                                );


                                            matchDonorBtn.addEventListener(
                                                "click",
                                                async function () {

                                                    const donorId =
                                                        this.dataset.donorId;

                                                    const emergencyRequestId =
                                                        this.dataset.requestId;


                                                    this.disabled =
                                                        true;

                                                    this.textContent =
                                                        "Creating Match...";


                                                    try {

                                                        const matchResponse =
                                                            await fetch(
                                                                "https://blood-donation-network-production.up.railway.app/api/matches",
                                                                {

                                                                    method: "POST",

                                                                    headers: {
                                                                        "Content-Type":
                                                                            "application/json"
                                                                    },

                                                                    body:
                                                                        JSON.stringify(
                                                                            {
                                                                                donorId:
                                                                                    Number(
                                                                                        donorId
                                                                                    ),

                                                                                emergencyRequestId:
                                                                                    Number(
                                                                                        emergencyRequestId
                                                                                    )
                                                                            }
                                                                        )
                                                                }
                                                            );


                                                        const matchData =
                                                            await matchResponse.json();


                                                        if (
                                                            matchResponse.ok
                                                        ) {

                                                            alert(
                                                                "Match created successfully!"
                                                            );

                                                            this.textContent =
                                                                "Matched";

                                                            updateMatchCount();

                                                        } else if (
                                                            matchResponse.status ===
                                                            409
                                                        ) {

                                                            alert(
                                                                "This donor has already been matched with this emergency request."
                                                            );

                                                            this.textContent =
                                                                "Already Matched";

                                                        } else {

                                                            alert(
                                                                matchData.message ||
                                                                "Unable to create match."
                                                            );

                                                            this.disabled =
                                                                false;

                                                            this.textContent =
                                                                "Create Match";
                                                        }


                                                    } catch (error) {

                                                        console.error(
                                                            error
                                                        );


                                                        alert(
                                                            "Unable to connect to the server."
                                                        );


                                                        this.disabled =
                                                            false;

                                                        this.textContent =
                                                            "Create Match";
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
                        "https://blood-donation-network-production.up.railway.app/api/matches"
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
                        "https://blood-donation-network-production.up.railway.app/api/users/login",
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

                    localStorage.setItem(
                        "userRole",
                        data.role
                    );

                    localStorage.setItem(
                        "userEmail",
                        email
                    );


                    alert(
                        "Login successful!"
                    );


                    console.log(
                        "Logged-in role:",
                        data.role
                    );


                    emailInput.value = "";
                    passwordInput.value = "";

                    applyRoleBasedAccess();

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

    const signupRole =
        document.getElementById(
            "signup-role"
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

            const role =
                signupRole.value;


            if (
                email === "" ||
                password === "" ||
                role === ""
            ) {

                alert(
                    "Please enter your email, password, and select your role."
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
                password: password,
                role: role
            };


            signupResult.innerHTML =
                "<p>Creating account...</p>";


            try {

                const response =
                    await fetch(
                        "https://blood-donation-network-production.up.railway.app/api/users/register",
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
                    signupRole.value = "";

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
   ROLE-BASED UI CONTROL
========================= */

function applyRoleBasedAccess() {

    const userRole =
        localStorage.getItem("userRole");


    console.log(
        "Current user role:",
        userRole
    );


    if (!userRole) {
        return;
    }


    const emergencySection =
        document.getElementById(
            "emergency-request"
        );

    const emergencyRequestsSection =
        document.getElementById(
            "emergency-requests"
        );

    const matchHistorySection =
        document.getElementById(
            "match-history"
        );

    const findDonorSection =
        document.getElementById(
            "find-donor"
        );


    /* =========================
       DONOR
    ========================= */

    if (userRole === "DONOR") {

        if (emergencySection) {
            emergencySection.style.display =
                "none";
        }

        if (emergencyRequestsSection) {
            emergencyRequestsSection.style.display =
                "none";
        }

        if (matchHistorySection) {
            matchHistorySection.style.display =
                "none";
        }

        if (findDonorSection) {
            findDonorSection.style.display =
                "none";
        }

        console.log(
            "Donor access applied."
        );
    }


    /* =========================
       HOSPITAL STAFF
    ========================= */

    else if (
        userRole === "HOSPITAL_STAFF"
    ) {

        console.log(
            "Hospital staff access applied."
        );
    }


    /* =========================
       ADMIN
    ========================= */

    else if (
        userRole === "ADMIN"
    ) {

        console.log(
            "Admin access applied."
        );
    }
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

        applyRoleBasedAccess();

    }
);