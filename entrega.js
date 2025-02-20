const url = "https://jsonplaceholder.typicode.com";

function getUserInfo(userId){
    return fetch(url + "/users/" + userId).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error fetching user info");
        }
        
    });
}


function getPosts(userId){
    return fetch(url + "/posts/").then(response => {
        if (response.ok) {
            return response.json().then(posts => posts.filter(post => post.userId == userId));
        } else {
            throw new Error("Error fetching user posts");
        }
    })
}

function getComments(postId){
    return fetch(url + "/comments/?postId=" + postId).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error fetching comments");
        }
    })
}

/**
 * Returns an array of lengths of the comments, only those longer than minLength
 */
function getLongCommentsLength(postId, minLength){
    return getComments(postId).then(comments => comments
        .filter(comment => comment.body.length > minLength)
        .map(comment => comment.body.length)
        .sort((l1, l2) => l1 - l2)
    )
}

await getUserInfo("1").then(user => console.log(
`Information for user 1:

Username: ${user.username}
Full name: ${user.name}
E-mail: ${user.email}
Phone: ${user.phone}
Website: ${user.website}
Company name: ${user.company.name}

Address:
${user.address.street}
${user.address.suite}
${user.address.zipcode} ${user.address.city}
`
));


await getPosts("1").then(posts => {
    posts.forEach(post => {
        console.log(`Title: ${post.title}\n${post.body}\n\n`);
    });
});

await getComments("1").then(comments => {
    comments.forEach(comment => {
        console.log(`Comment from user ${comment.email}: \n${comment.body}\n\n`);
    })
})

await getLongCommentsLength("1", 50).then(lengths => {
    console.log("Lengths of comments longer than 50 characters: " + lengths);
})

