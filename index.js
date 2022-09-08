const postList = document.querySelector('.posts-list');
const getPostsBtn = document.querySelector('.get-posts');

const limitPost = 8;

const state = {
  posts: [],
  somePost: {}
};


const getSomeBody = (index) => {
  const clickPost = state.posts[index];
  console.log(clickPost)
  state.somePost = clickPost;

  fillPostsList(state.posts);
  postList.innerHTML = "";

  const somePostHTML =  `
  <div class="wrapper">


    <div class="somePost-wrapper">
      <h1 class="somePost-title">${state.somePost.title}</h1>
      <p class="somePost-body">${state.somePost.body}</p>
      <p class="somePost-userId">UserId: ${state.somePost.userId}</p>
    </div>
  </div>
  `;

  postList.innerHTML = somePostHTML;
};


const createPost = (post, index) => `
  <div class="post">

    <div class="post-wrapper">
      <ol class="ball">
        <li>
          <h1 class="post-title" onclick="getSomeBody(${index})">${post.title}</h1>
        </li>
      </ol>
    </div>

  </div>

`;


const fillPostsList = (posts) =>{

  postList.innerHTML = "";

  if (posts.length){
    posts.forEach((post, index) => postList.innerHTML += createPost(post,index) )
  }
};

getPostsBtn.addEventListener('click', async () =>{

  if(state.posts.length === 0){
    await getPostsRequest();
  }

  console.log(state.posts.length);

  fillPostsList(state.posts);
  console.log(state)
})

const getPostsRequest = () =>{
  return fetch('https://jsonplaceholder.typicode.com/posts?_limit=' + limitPost)
  .then((res) => res.json())
  .then((posts) => state.posts = state.posts.concat(posts))
};

