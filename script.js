document.addEventListener("DOMContentLoaded", () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Show Registration Form
    document.getElementById('showRegister')?.addEventListener('click', () => {
        document.getElementById('loginSection').classList.add('hidden');
        document.getElementById('registerSection').classList.remove('hidden');
    });

    // Show Login Form
    document.getElementById('showLogin')?.addEventListener('click', () => {
        document.getElementById('registerSection').classList.add('hidden');
        document.getElementById('loginSection').classList.remove('hidden');
    });

    // Handle Registration
    document.getElementById('registerForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        const newUser = { username, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert("Registration Successful!");
        document.getElementById('registerForm').reset();
        document.getElementById('showLogin').click();
    });

    // Handle Login
    document.getElementById('loginForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = "home.html";
        } else {
            alert("Invalid Username or Password");
        }
    });

    // Display Welcome Message in Home
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('welcomeUser').textContent = currentUser.username;
    }

    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = "index.html";
    });

    // Add Book to My Books
    const bookCards = document.querySelectorAll('.add-to-library');
    bookCards.forEach(card => {
        card.addEventListener('click', () => {
            const bookTitle = card.previousElementSibling.previousElementSibling.textContent;
            alert(`${bookTitle} has been added to your library!`);
            // Here you can implement the logic to add the book to the user's collection
        });
    });
});
