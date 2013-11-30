/*
  Version: 1.0
  Author: Dário Nascimento
  Author URI: darionascimento.com
  License: Its easy to make pirate but I work for same reason you work...   
*/ 

icon_margin = {};
icon_width = {}; 

$(document).ready(function(){
  screen_size = $(document).width();
  //Change these values if your icons are in random position.
  //These values define the margin
  icon_width["left"] = parseInt($(".menu-ico-left").css("width"), 10);
  icon_margin["left"]= $(".menu-ico-left").offset().left;
  icon_width["right"] = parseInt($(".menu-ico-right").css("width"), 10);
  icon_margin["right"] = screen_size - icon_width["right"] -$(".menu-ico-right").offset().left;

  $(window).resize(function(){
        pad = parseInt($('#wrapper').css("left"),10);
        console.log(pad);
        if(pad < 0){
            toPadding = resizeMenu("right");
            $('#wrapper').animate({left:toPadding}, 10, function() {});
        }
        if(pad >0){
            toPadding = resizeMenu("left");
            $('#wrapper').animate({left:toPadding}, 10, function() {});
        }
  });

  $(".colapsable-header").click(function(e){
    if(!e) e = window.event;
    var target = $(e.target);
    expand(target);
  });

  $(".colapsable-header img").click(function(e){
    if(!e) e = window.event;
    var target = $(e.target);
    expand(target.parent());
  });





    //Sliding menu
    $('.menu-control').click(function(button) {
      //Close both menus
      $(".menu-left").hide();
      $(".menu-right").hide();    

      //Get HREF to know if left or right
      side = $(this).attr("href").substring(1)

      //Get Padding attribute
      pad = parseInt($('#wrapper').css("left"),10);
      if(pad == 0){
        toPadding = resizeMenu(side);
        //Open menu
        $(".menu-"+side).show();
        $("#wrapper").css("overflow","hidden")
      }else{
          //close
          toPadding = 0
          $("#wrapper").css("overflow","scroll")
        }

        $('#wrapper').animate({left:toPadding}, 'fast', function() {});
      });
});


function expand(target){
  target.parent().children("div").toggle("fast");
  target.toggleClass("selected");
  if(target.hasClass("selected")){
    target.children("img").attr('src','img/minus.png');
  }else{
    target.children("img").attr('src','img/plus.png');
  }
}


function resizeMenu(side){
  //GET Screen size
  screen_size = $(document).width();
  //Check if initial calculation wasnot done
  if(icon_width["left"] == 0){
      icon_width["left"] = parseInt($(".menu-ico-left").css("width"), 10);
      icon_margin["left"]= $(".menu-ico-left").offset().left;
      icon_width["right"] = parseInt($(".menu-ico-right").css("width"), 10);
      icon_margin["right"] = screen_size - icon_width["right"] -$(".menu-ico-right").offset().left;
  }

  //Select side
  toPadding = screen_size-(2*icon_margin[side]+icon_width[side]);
  $(".menu-"+side).css("width",toPadding+"px")

  if(side == "right"){
    toPadding = toPadding*-1;
  }
  return toPadding;
}