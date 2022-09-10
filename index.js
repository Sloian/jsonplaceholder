const postList = document.querySelector('.posts-list');
const getPostsBtn = document.querySelector('.get-posts');
const getAuthorBtn = document.querySelector('.get-author');

const limitPost = 80;

const state = {
  posts: [],
  usersId:[]
};

const getSomeBody = (postId) => {

  if(postList.classList.contains( "scroll-style" )){
    postList.classList.remove("scroll-style")
  }

  const post = state.posts.find(item => item.id === postId)
  console.log(postList.style);

  postList.innerHTML = somePostHTML(post);
};

const getHeaderPostList = (post) =>  `
  <div class="post">

    <div class="post-wrapper">
      <ol class="ball">
        <li>
          <h1 class="post-title" onclick="getSomeBody(${post.id})">${post.title}</h1>
        </li>
      </ol>
    </div>

  </div>
  `;


const getUserPosts = (userId) =>{
  const userPosts = state.posts.filter(element => element.userId === userId)
  console.log(userPosts)
  postList.innerHTML = "";
  userPosts.forEach(element => postList.innerHTML += getHeaderPostList(element));
}

const somePostHTML = (post) =>  `
  <div class="wrapper">

    <div class="somePost-wrapper">
      <h1 class="somePost-title">${post.title}</h1>
      <p class="somePost-body">${post.body}</p>
      <p class="somePost-userId">UserId: ${post.userId}</p>
    </div>
  </div>
  `;


const createPost = (post) => `
  <div class="post">

    <div class="post-wrapper">
      <ol class="ball">
        <li>
          <h1 class="post-title" onclick="getSomeBody(${post.id})">${post.title}</h1>
        </li>
      </ol>
    </div>

  </div>

`;

const createAuthor = (post) =>`
  <div class="post">

    <div class="post-wrapper">
      <ol class="ball">
        <li>
          <h1 class="post-title" onclick="getUserPosts(${post})">userId: ${post}</h1>
        </li>
      </ol>
    </div>

  </div>
`



const fillAuthorList = (posts) =>{

  postList.innerHTML = "";
  if (posts.length){
    posts.filter(item =>{
      if(!state.usersId.length){
        state.usersId.push(item.userId)
      }
      else if(!state.usersId.includes(item.userId)){
        state.usersId.push(item.userId)
      }
    })

    state.usersId.forEach(element => postList.innerHTML += createAuthor(element));

    console.log(posts)
  }


}

const fillPostsList = (posts) =>{
  postList.innerHTML = "";

  if (posts.length){
    posts.forEach((post) => postList.innerHTML += createPost(post) )
  }
};

getAuthorBtn.addEventListener('click', async() =>{
  if(state.posts.length === 0){
    await getPostsRequest();
  }

  if(getPostsBtn.classList.contains( "button-active" )){
    getPostsBtn.classList.remove("button-active")
  }
  getAuthorBtn.classList.add("button-active")

  if(postList.classList.contains( "scroll-style" )){
    postList.classList.remove("scroll-style")
  }




  console.log(state.posts.length);
  fillAuthorList(state.posts);
  console.log(state)
})


getPostsBtn.addEventListener('click', async () =>{
  if(state.posts.length === 0){
    await getPostsRequest();
  }

  if(getAuthorBtn.classList.contains( "button-active" )){
    getAuthorBtn.classList.remove("button-active")
  }

  getPostsBtn.classList.add("button-active")
  postList.classList.add("scroll-style")


  console.log(state.posts.length);
  fillPostsList(state.posts);
  console.log(state)
})



const getPostsRequest = () =>{
  return fetch('https://jsonplaceholder.typicode.com/posts?_limit=' + limitPost)
  .then((res) => res.json())
  .then((posts) => state.posts = state.posts.concat(posts))
};



