const baseUrl = "http://localhost:2000/api/v1/student";
// const baseUrl = "https://sizeable-shoshana-wedgier.ngrok-free.dev/api/v1/student";

export const signupAPI = async (formData) => {
    const resObj = await fetch(`${baseUrl}/signup`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(formData),
        credentials: "include"
    })
    return resObj.json();
}

export const loginAPI = async(formData) => {
    const resObj = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(formData),
        credentials: "include" // otherwise fetch does not accept cookie.
    })
    return resObj.json();
}

export const logoutAPI = async() => {
    const resObj = await fetch(`${baseUrl}/logout`, {
        method: "POST",
        credentials: "include"
    })
    return resObj.json();
}

export const authAPI = async() => {
    console.log("hey i am a message from authAPI function.");
    const resObj = await fetch(`${baseUrl}/itsme`, {
        method: "GET",
        credentials: "include"
    })
    return resObj.json();
}