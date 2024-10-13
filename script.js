document.addEventListener("DOMContentLoaded", () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Login User
    document.getElementById('loginForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            window.location.href = "home.html";
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            alert('Invalid username or password');
        }
    });

    // Logout functionality
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        alert('You have been logged out!');
        window.location.href = "index.html";
    });

    // My Books Page - Remove Book
    if (document.querySelector('.remove-book')) {
        const removeButtons = document.querySelectorAll('.remove-book');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.target.closest('.book-card').remove();
                alert('Book removed from your collection!');
            });
        });
    }

    // Browse Page - Add Book to My Books
    if (document.querySelector('.add-to-library')) {
        const addButtons = document.querySelectorAll('.add-to-library');
        addButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const bookCard = e.target.closest('.book-card');
                const bookTitle = bookCard.querySelector('h3').innerText;
                const bookAuthor = bookCard.querySelector('p').innerText;

                const myBooksSection = document.querySelector('.book-collection');
                const newBookCard = document.createElement('div');
                newBookCard.classList.add('book-card');
                newBookCard.innerHTML = `
                    <h3>${bookTitle}</h3>
                    <p>${bookAuthor}</p>
                    <button class="remove-book">Remove</button>
                `;
                myBooksSection.appendChild(newBookCard);

                // Add functionality to the new "Remove" button
                newBookCard.querySelector('.remove-book').addEventListener('click', () => {
                    newBookCard.remove();
                    alert('Book removed from your collection!');
                });

                alert('Book added to your collection!');
            });
        });
    });

    // Display current user in home page
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && document.getElementById('welcomeUser')) {
        document.getElementById('welcomeUser').innerText = currentUser.username;
    }
});
