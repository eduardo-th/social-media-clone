const followBtn = document.querySelector('#followBtn');
const unfollowBtn = document.querySelector('#unfollowBtn');
if (followBtn) {
  followBtn.addEventListener('click', (event) => {
    fetch('http://localhost:3000/users/follow', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ userId: userId }),
    })
      .then((res) => {
        if (res.status===200){
            location.reload();
        }
    })
  });
}
if (unfollowBtn){
  unfollowBtn.addEventListener('click',(event)=>{
    fetchRequest('/unfollow')
  })
}
function fetchRequest(path){  
  fetch(`http://localhost:3000/users${path}`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ userId: userId }),
    })
    .then((res) => {
      if (res.status===200){          
          location.reload();
      }
  })
}
