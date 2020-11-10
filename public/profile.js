const addInfo = (res) => {
    const profile = document.querySelector(".profile");
    let html = "";
    html +=`
    <img src="${res.profile_image.large}" />
    <h1 class="name_profile">${res.username}</h1>
    <div class="followerbox">
      <h5 class="follower-1">${res.total_photos} posts</h5>
      <h5 class="follower-2">${res.followers_count} followers</h5>
      <h5 class="follower-3">${res.following_count} following</h5>
    </div>

    
    <h5 class="biobox">${res.bio}<h5>
    
    
    `;

    profile.innerHTML = html;
  };
  
  const callAPI = async (username) => {
    try {
      console.log("username --> ", username);
      const response = await fetch("/api/searchUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const res = await response.json();
      //check response return from our API
      console.log("response ----> ", res);
  //6. Add images to gallery
      addInfo(res);
    } catch (error) {
      console.log("message error --->", error);
    }
  };

  const addphoto = (res) => {
    const photo = document.querySelector(".photo");
    let html = "";
    res.forEach((element) => {
    html +=`
  <div class="profile1">
  <div class="pro_colum">
    <img src="${element.urls.small}"/>
    <div class="photo__info">
        <div class="photo__icons">
          <span class="photo__icon">
            <i class="fa fa-heart-o heart fa-lg"></i>
          </span>
          <span class="photo__icon">
            <i class="fa fa-comment-o fa-lg"></i>
          </span>
        </div>
        <span class="photo__likes">${element.likes}likes</span>
        <div class="photo__comment">
                        <div class="photo__comment">
                              <span class="photo__comment-author"><a href="profile.html?username=${element.user.username}">${element.user.username}</a></span>${element.alt_description}
                        </div>
        </div>
      </div>
      </div>
  </div>
    `;
});
    photo.innerHTML = html;
  };
  const callAPIphoto = async (username) => {
    try {
      console.log("username --> ", username);
      const response = await fetch("/api/searchPhoto", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const res = await response.json();
      //check response return from our API
      console.log("response ----> ", res);
  //6. Add images to gallery
      addphoto(res);
    } catch (error) {
      console.log("message error --->", error);
    }
  };
  
  

  const main = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.has('username')){
        const username = urlParams.get('username');
        console.log('username -->', username);
        callAPI(username);
        callAPIphoto(username);
    }
    else{
        console.log('Username is missing');
    }
  };
   
  main();
  
  