const button = document.querySelector("#btn-login")

button.addEventListener("click", handleLogin);

async function handleLogin(e) {
    e.preventDefault();
    const inputUserName = document.querySelector("#inputUsername").value;
    const inputPassword = document.querySelector("#inputPassword").value;

    const response = await fetch("http://127.0.0.1:4000/usuarios/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: inputUserName, password: inputPassword })
    });
    const data = await response.json();
    localStorage.setItem("userInSession", JSON.stringify(data));
    sessionStorage.setItem("userInSession", JSON.stringify(data));
    console.log(data);
    console.log('localStorage', localStorage.getItem("userInSession"));
    localStorage.removeItem("userInSession");
}

(function(){
    const userInSession = getUserInSession();
    if (userInSession) {
        window.location.href = 'index.html';
        return;
    }
    document.body.style.display = "block";

    // document.querySelector("#btn-login").addEventListener("click", login);
})();

// async function login(e) {
//     e.preventDefault();

//     const inputUserName = document.querySelector("#inputUsername");
//     const inputPassword = document.querySelector("#inputPassword");

//     const validationUserName = document.querySelector("#validation-username");
//     const validationPassword = document.querySelector("#validation-password");
//     const msgLogin = document.querySelector("#msg-error-login");
//     msgLogin.style.display = "none"

//     let hasError = false;

//     if (inputUserName.value.trim() === "") {
//         hasError = true;
//         validationUserName.style.display = "block";
//     } else {
//         validationUserName.style.display = "none";
//     }

//     if (inputPassword.value.trim() === "") {
//         hasError = true;
//         validationPassword.style.display = "block";
//     } else {
//         validationPassword.style.display = "none";
//     }

//     if (hasError) {
//         return;
//     }

//     const userRequest = {
//         "userName": inputUserName.value,
//         "password": inputPassword.value

//     }
//     try {
//         const response = await fetch("api/usuario/login", {
//             "method": "POST",
//             headers: {
//                 "Accept": "application/json",
//                 "Content-Type": 'application/json'
//             },
//             body: JSON.stringify(userRequest)
//         });
//         if (response.ok) {
//             const userInSession = await response.json();
//             setUserInSession(userInSession);
//             window.location.href = 'index.html';
//         } else {
//             msgLogin.style.display = "block"
//         }
//     } catch (ex) {
//         console.error(ex);
//     }
    
// }
