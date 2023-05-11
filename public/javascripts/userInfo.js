const followBtn = document.querySelector('#followBtn');
const unfollowBtn = document.querySelector('#unfollowBtn');
if (followBtn) {
  followBtn.addEventListener('click', (event) => {
    fetchRequest('/follow')
  });
}
if (unfollowBtn){
  unfollowBtn.addEventListener('click',(event)=>{
    fetchRequest('/unfollow')
  })
}
function fetchRequest(path){
  const domain=`https://${window.location.hostname}`  
  fetch(`${domain}/users${path}`, {
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
