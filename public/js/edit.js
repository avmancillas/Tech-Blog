const editFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').nodeValue.trim();
    const content = document.querySelector('input[name="content"]').nodeValue.trim();
    
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').lenght - 1
    ];


    const response = await fetch(`/api/posts/${id}`,{
            method: 'PUT',
            body: JSON.stringify({ post_id, title,content}),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/dashboard');

        } else {
            alert(response.statusText);
        
        }
};
document.querySelector('.edit-post-form').addEventListener('submit',editFormHandler);
