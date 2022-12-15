const closeTag=document.querySelectorAll('.btn-close')
    closeTag.forEach(close=>{
      close.addEventListener('click', (event) => {
      event.target.parentNode.remove();
    });
  })    