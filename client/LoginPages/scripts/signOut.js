function customerSignOut(event){
    event.stopPropagation()
    alert("You have been signed out! Returning to home page.")
    localStorage.clear()
    window.location.href='/client/LandingPage/pages/landingPage.html';
}