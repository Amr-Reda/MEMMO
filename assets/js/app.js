let con=document.getElementById('con');
con.addEventListener('click',event=>{
  event.preventDefault();
  console.log(event);
  // fetch("/auth/signup",{
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //   },
  //     method:"POST",
  //     body: JSON.stringify(data)
  //   })
});
