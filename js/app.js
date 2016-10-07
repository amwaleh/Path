





$(document).ready(function(){


  var header =[
    {href:"/createcohort",tag:"cycle"},
    {href:"/applicants",tag:"applicants"},
    {href:"/tools",tag:"tools"},
    {href:"/candidate",tag:"candidate"},
    {href:"/cycleAnalytics",tag:"analytic"}
  ];

  var nav ='<nav class="navbar navbar-light bg-faded navbar-fixed-top">' +
  '<div class="container">' +
      '<a class="navbar-brand" href="/">Paths</a>'+
    '<div class="pull-right menu">'+
      '<script id="nav-template" type="text/x-handlebars-template">'+
        '{{#each menu}}'+
      '  <a  href={{this.href}}>{{this.tag}}</a>'+
        '{{/each}}'+
      '</script>'+
    '</div>'+
  '</nav>';


$('body').prepend(nav);

var source =$('#nav-template').html();
var template = Handlebars.compile(source);
var context = {menu:header}
var compiledHTML = template(context);
$('.menu').html(compiledHTML );


var source = $("#entry-template").html() || '';
// compile the template
var template = Handlebars.compile(source);
var context = {seedData : data || '' };
var compiledHTML = template(context);
$('.seed').html(compiledHTML);


source = $('#location-template').html() ||'';
template = Handlebars.compile(source);
var loco =seedLocation.map(function(item){
   if(item.Location === 'Nigeria'){
  return item} return null});
context = {seed:loco || ''};
compiledHTML = template(context)
$('.location').html(compiledHTML);


source = $('#tools-template').html() ||'';
template = Handlebars.compile(source);
tools =_.chain(tools).groupBy('Current Usage').value();
context = {tool:tools};
compiledHTML =template(context);
console.log(context)
$('.tools').html(compiledHTML);

$(document).on('click','.element>button',function(){
  if($(this).html() =='remove'){
    console.log('removed')
    $(this).parent().css('display','none');
  }
  $(this).html('remove')
  $('#myModal2>.modal-dialog>.modal-content>.modal-body>.app').html($(this).parent())
  $('#myModal2>.modal-dialog>.modal-content>.modal-body>.description').html("''"+$(this).attr('tooltip')"'")
  // $('#drop').append($(this).parent())
  console.log($(this).attr('title'))

});
$(document).on('click','.modal-footer>.btn-primary', function(){
  $('#drop').append(  $('#myModal2>.modal-dialog>.modal-content>.modal-body>.app').html())
})
// initialize Packery
var $grid = $('#drop').packery({
  itemSelector: '.grid-item',
  // columnWidth helps with drop positioning
  columnWidth: 100
});

// make all items draggable
var $items = $grid.find('.grid-item').draggable();
// bind drag events to Packery
$grid.packery( 'bindUIDraggableEvents', $items );
function orderItems() {
var itemElems = $grid.packery('getItemElements');
$( itemElems ).each( function( i, itemElem ) {
  $( itemElem).find('p').text( i + 1 );
});
}
$grid.on( 'layoutComplete', orderItems );
$grid.on( 'dragItemPositioned', orderItems );

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
// ---------------------





});
