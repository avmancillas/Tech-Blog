const deleteFormHandler = async (event) => {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').lenght - 1
    ];
    const response = await fetch('/api/comments',{
            method: 'DELETE',
            body: JSON.stringify({ post_id}),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/dashboard');

        } else {
            alert(response.statusText);
            
        }
};
document.querySelector('.delete-post-btn').addEventListener('submit',deleteFormHandler);
