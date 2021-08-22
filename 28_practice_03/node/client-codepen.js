// you can execute code in console to check rest api work

// get request
(() => {
  fetch('http://localhost:8080/feed/posts')
    .then((res) => res.json())
    .then((resData) => {
      console.log(resData);
    })
    .catch((err) => console.log(err));
})();

// post request
(() => {
  fetch('http://localhost:8080/feed/post', {
    method: 'POST',
    body: JSON.stringify({
      title: 'title',
      content: 'content',
    }),
    // setting for sending body data collectly to api server
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((resData) => {
      console.log(resData);
    })
    .catch((err) => console.log(err));
})();
