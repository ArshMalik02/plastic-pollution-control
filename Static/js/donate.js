window.onload= function(){
    document.getElementById('check').onclick= function() {
        var x = document.getElementById("pass");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }
    

}



    
