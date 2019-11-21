function persistLikes(id, likes, e) {
    fetch(`http://localhost:4000/candies/${id}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            accepts: "application/json"
        },
        body: JSON.stringify({ likes: likes })
    })
        .then(function (resp) { return resp.json() })
        .then(console.log)
}