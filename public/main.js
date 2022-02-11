 $(".toggle-button").click(function(){
   
   $(".navmenu").toggleClass("hidden");
 });
//get all elements from menu

const allnavitems = document.querySelectorAll('.navmenu ul li a');

allnavitems.forEach((item, i) => {
  item.addEventListener("mouseover", function(e){

    //add animation class to all above list items first
    for(var j=0; j < i; j++){
      allnavitems[j].firstChild.classList.add("slide-out-top");
    }

    //add class to the item on which mouse is hovering
    this.firstChild.classList.add("slide-out");

    //add animation class to bottom items
    for(var k=i+1; k < allnavitems.length; k++){
      allnavitems[k].firstChild.classList.add("slide-out-bottom");
    }
  });

  item.addEventListener("mouseout", function(e){

    //add animation class to all above list items first
    for(var j=0; j < i; j++){
      allnavitems[j].firstChild.classList.remove("slide-out-top");
    }

    //add class to the item on which mouse is hovering
    this.firstChild.classList.remove("slide-out");
 
    //add animation class to bottom items
    for(var k=i+1; k < allnavitems.length; k++){
      allnavitems[k].firstChild.classList.remove("slide-out-bottom");
    }
  });
});

document.addEventListener('scroll', function(){

  var h = document.documentElement, 
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';

  var percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;

 let value=100-percent;
  document.querySelector(".scroll-effect").style.left= "-" + value + "%";

});