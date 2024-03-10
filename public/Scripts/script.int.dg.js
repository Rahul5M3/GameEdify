!window.jQuery && document.write(unescape('%3Cscript src="http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.10.2.min.js"%3E%3C/script%3E'));
/*$('meta[name="viewport"]').prop('content', 'width=1280'); */
var Path;if(window.location.origin=='http://127.0.0.1:8888'){Path = ""}else if(window.location.origin=='http://design.weblink4you.com'){Path = "http://design.weblink4you.com"}else{Path=''}

!function(e,t,r){function n(){for(;d[0]&&"loaded"==d[0][f];)c=d.shift(),c[o]=!i.parentNode.insertBefore(c,i)}for(var s,a,c,d=[],i=e.scripts[0],o="onreadystatechange",f="readyState";s=r.shift();)a=e.createElement(t),"async"in i?(a.async=!1,e.body.appendChild(a)):i[f]?(d.push(a),a[o]=n):e.write("<"+t+' src="'+s+'" defer></'+t+">"),a.src=s}(document,"script",['https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',Path+'Scripts/helpers.min.js'])

if(Page=='home'){
!function(e,t,r){function n(){for(;d[0]&&"loaded"==d[0][f];)c=d.shift(),c[o]=!i.parentNode.insertBefore(c,i)}for(var s,a,c,d=[],i=e.scripts[0],o="onreadystatechange",f="readyState";s=r.shift();)a=e.createElement(t),"async"in i?(a.async=!1,e.body.appendChild(a)):i[f]?(d.push(a),a[o]=n):e.write("<"+t+' src="'+s+'" defer></'+t+">"),a.src=s}(document,"script",[Path+'Scripts/fluid_dg.min.js'])
}

if(Page=='dashboard'){
!function(e,t,r){function n(){for(;d[0]&&"loaded"==d[0][f];)c=d.shift(),c[o]=!i.parentNode.insertBefore(c,i)}for(var s,a,c,d=[],i=e.scripts[0],o="onreadystatechange",f="readyState";s=r.shift();)a=e.createElement(t),"async"in i?(a.async=!1,e.body.appendChild(a)):i[f]?(d.push(a),a[o]=n):e.write("<"+t+' src="'+s+'" defer></'+t+">"),a.src=s}(document,"script",['https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.concat.min.js'])
}

else{
}

if(Page=='details'){}

$(window).load(function(e) {		
$('.pop1').fancybox({iframe:{css:{width:'400'}}});
$('.pop2').fancybox({iframe:{css:{width:'600'}}});
$('.pop3').fancybox({iframe:{css:{width:'900'}}});  


$(function () {$('[data-toggle="tooltip"]').tooltip()})

$('.showhide').click(function(){$(this).next().slideToggle();});
$('.slide-srch').click(function(dg){dg.stopPropagation();$('.srch_pop').slideToggle('fast');}); 

$('.fancybox').fancybox();
$('.mygallery').fancybox({wrapCSS:'fancybox-custom',closeClick : true, openEffect : 'none',helpers : {title : {type : 'inside'},overlay : {css : {'background' : 'rgba(0,0,0,0.6)'}}}});

$('.shownext').click(function(e){var DG=$(this).data('closed');$(DG).hide();$('.subdd').hide('fast');$(this).next().slideToggle('fast');e.stopPropagation()})
$('body').click(function(){$('.cart-div-box,.serch-div,.user-det,.subdd').hide()})
$('.serch-div').click(function(e){e.stopPropagation()})

$('.hp_faq_title').click(function(){$(this).next().slideToggle();$(this).toggleClass('hp_faq_title2');});

$('.dd_next').click(function(){$(this).next().slideToggle('fast');$(this).toggleClass('dd_next_act');})
$('.faq_title').click(function(){$(this).next().slideToggle('fast');$(this).toggleClass('faq_title_act');})

$('.tabs').click(function(){var dg=$(this).attr('href'); $('.form_box').css({'display':'none'});$(dg).css({'display':'block'}); $('.tabs').removeClass('act'); $(this).addClass('act'); return false}) 

$('.tabs2').click(function(){var dg=$(this).attr('href'); $('.form_box2').css({'display':'none'});$(dg).css({'display':'block'}); $('.tabs2').removeClass('act2'); $(this).addClass('act2'); return false}) 

$('input.rad_tabs').click(function(){var dg='.'+$(this).attr('title'); $('.rad_form_box').slideUp('fast');$(dg).slideDown('fast'); })

$('select.changeable').change(function() {$('.r-cont').hide(); $('#' + $(this).find('option:selected').attr('value')).show();});

$(".scroll").click(function(event){
event.preventDefault();
$('html,body').animate({scrollTop:$(this.hash).offset().top-55}, 1000);
});

$("#back-top").hide();	
$(function () {$(window).scroll(function () {if ($(this).scrollTop() > 100) {$('#back-top').fadeIn();} else {$('#back-top').fadeOut();}});
$('#back-top a').click(function () {$('body,html').animate({scrollTop: 0}, 800);return false;});
});
$('.attach_btn').click(function(){$(this).prev().trigger('click');})
$('.dg_custom_file').on('change',function(){var dg=$(this).prop('value');$(this).parent().children('b.file_url').text(dg)})

$("#owl-template").owlCarousel({autoplay:false,dots:true,loop:false,items:1,responsive:{0:{items:1},767:{items:1},991:{items:1},1151:{items:1},1279:{items:1}}});

if(Page=='home'){
$("#owl-free").owlCarousel({autoplay:true,dots:true,loop:0,items:4,responsive:{0:{items:1},767:{items:2},991:{items:3},1151:{items:3},1279:{items:4}}});
}

if(Page=='dashboard'){
$("#owl-customer").owlCarousel({autoplay:true,dots:true,loop:0,items:4,responsive:{0:{items:1},767:{items:2},991:{items:3},1151:{items:3},1279:{items:4}}});
$("#owl-blog").owlCarousel({autoplay:true,dots:true,loop:0,items:4,responsive:{0:{items:1},479:{items:2},767:{items:3},991:{items:3},1151:{items:3},1279:{items:4}}});

//$("#sidebar").mCustomScrollbar({theme: "minimal"});
$('#sidebarCollapse').on('click', function () {
$('#sidebar, #content').toggleClass('active');
$('.collapse.in').toggleClass('in');
$('a[aria-expanded=true]').attr('aria-expanded', 'false');
});
}

});

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});