// Header on Scroll
$(window).on('scroll', function () {
  if (jQuery(this).scrollTop() > 160) { // Set position from top to add class
    jQuery('header').addClass('header-appear');
  }
  else {
    jQuery('header').removeClass('header-appear');
  }
});

function openCity(evt, cityName) {
  var i, main_tabcontent, main_tablinks;
  main_tabcontent = document.getElementsByClassName("main_tabcontent");
  for (i = 0; i < main_tabcontent.length; i++) {
    main_tabcontent[i].style.display = "none";
  }
  main_tablinks = document.getElementsByClassName("main_tablinks");
  for (i = 0; i < main_tablinks.length; i++) {
    main_tablinks[i].className = main_tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Testimonials
$(".testimonial_carousel").owlCarousel({
  // autoplay: true,
  margin: 0,
  autoplayTimeout: 7000,
  nav: true,
  navText: ['<i class="fa fa-long-arrow-left" aria-hidden="true"></i>', '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'],
  dots: false,
  responsive: {
    0: {
      items: 1
    },

    600: {
      items: 2
    },

    1024: {
      items: 2
    },

    1366: {
      items: 2
    }
  }
});


// dashboard sidebar Mobile
$(".mobile_hamburger").click(function () {
  $(".sidebar").toggleClass("show");
});
// expand right content
$(".expand_content").click(function () {
  $(".dashboard_wrapper").toggleClass("expand_class");
})


// toggle

$('.btn-toggler').click(function() {
  $(this).find('.btn-toggleopt').toggleClass('active');  
  
  if ($(this).find('.btn-toggleopt').length>0) {
    $(this).find('.btn-toggleopt').toggleClass('.btn-toggleopt');
  }
  
  $(this).find('.btn-toggleopt').toggleClass('.default-btntgl');
     
});

// $('form').submit(function(){
// alert($(this["options"]).val());
//   return false;
// });

// input toggle

const toggle = document.getElementById('toggle');
    const inputContainer = document.querySelector('.input-containernew');

    toggle.addEventListener('change', function() {
        if (toggle.checked) {
            inputContainer.style.display = 'block';
        } else {
            inputContainer.style.display = 'none';
        }
    });


    // Suppliers Management toggle
    
    $('.switch3 input').on('change', function(){
      var dad = $(this).parent();
      if($(this).is(':checked'))
        dad.addClass('switch3-checked');
      else
        dad.removeClass('switch3-checked');
    });