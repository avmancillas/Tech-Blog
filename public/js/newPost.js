const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').nodeValue.trim();
    const content = document.querySelector('input[name="content"]').nodeValue.trim();

    const response = await fetch('/api/post',{
            method: 'POST',
            body: JSON.stringify({ title, content}),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/dashboard');

        } else {
            alert(response.statusText);
        }
};
document.querySelector('#new-post-form').addEventListener('submit',newFormHandler);
