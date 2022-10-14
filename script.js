const form = document.getElementById('form-post');
const baseUrl = 'https://jsonplaceholder.typicode.com/comments';
const output = document.getElementById('output');
const postId = document.getElementById('post-id');

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const id = postId.value;
    const url = `${baseUrl}/?postId=${id}`;

    const response = await fetch(url);

    if (response.ok) {
        const comments = await response.json();
        outputComments(comments);
    } else {
        outputError(response.status);
    }
});

form.addEventListener('reset', function (e) {
    e.preventDefault();

    postId.value = '';
    output.innerHTML = '';
});

function outputError(msg) {
    const error = document.getElementById('error');
    error.innerHTML = `<div class="error"><p>ERROR -> ${msg}</p></div>`;
}

function outputComments(comments) {
    for (const comment of comments) {
        output.innerHTML += `
<div class="card">
    <div class="card-header">
        <h4>${comment.name}</h4>
    </div>
    
    <div class="card-body">
        <p>${comment.body}</p>
    </div>
    
    <div class="card-footer">
        <p>${comment.email}</p>
    </div>
</div>
        `;
    }
}