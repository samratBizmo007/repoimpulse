// ---------- Product page script file ----------------//

// function to add multiple divs for product image
$(document).ready(function () {
  var max_fields = 5;
  var wrapper = $("#addedmore_imageDiv");
  var add_button = $("#add_moreimage");
  var x = 1;
  $(add_button).click(function (e) {
    e.preventDefault();
    if (x < max_fields) {
      x++;
      $(wrapper).append('<div>\n\
        <div class="w3-container w3-padding-small w3-margin-top" style="border:1px dotted">\n\
        <a href="#" style="padding:1px" class="delete btn w3-text-red w3-right w3-small" title="remove image"><i class="fa fa-remove"></i>\n\
        </a>\n\
        <div class="w3-col l12 ">\n\
        <label>Product Image: <font color ="red"><span id ="simage_star">*</span></font></label>\n\
        <input type="file" name="prod_image[]" id="prod_image_'+x+'" class="w3-input w3-border" onchange="readURL(this,'+x+');" required>\n\
        <span class="w3-text-red w3-small" id="image_error_'+x+'"></span>\n\
        </div>\n\
        <div class="w3-col l12 w3-margin-top w3-margin-bottom">\n\
        <img src="" width="auto" id="prodImagePreview_'+x+'" height="150px" alt="Product Image will be displayed here once chosen." class=" w3-centerimg img-thumbnail">\n\
        </div>\n\
        </div>\n\
        </div>'); //add input box
    } 
    else 
    {
      $.alert('<label class="w3-label w3-text-red"><i class="fa fa-warning w3-xxlarge"></i> You Reached the maximum limit of adding ' + max_fields + ' fields</label>');   //alert when added more than 4 input fields
    }
                });
  $(wrapper).on("click", ".delete", function (e) {
    e.preventDefault();
    $(this).parent('div').remove();
    x--;
  })
});

// function to add multiple divs for product video
$(document).ready(function () {
  var max_fields = 5;
  var wrapper = $("#addedmore_vidDiv");
  var add_button = $("#add_morevideo");
  var x = 1;
  $(add_button).click(function (e) {
    e.preventDefault();
    if (x < max_fields) {
      x++;
      $(wrapper).append('<div>\n\
        <div class="w3-container w3-padding-small w3-margin-top" style="border:1px dotted">\n\
        <a href="#" style="padding:1px" class="delete btn w3-text-red w3-right w3-small" title="remove image"><i class="fa fa-remove"></i>\n\
        </a>\n\
        <div class="w3-col l12 ">\n\
        <label>Embed Video (optional):</label>\n\
        <input type="input" name="prod_video[]" id="prod_video_'+x+'" class="w3-input w3-border" onkeyup="readVideo(this,'+x+');" placeholder="Copy & paste url link">\n\
        <span class="w3-text-red w3-small" id="video_error_'+x+'"></span>\n\
        </div>\n\
        <div class="w3-col l12 w3-margin-top">\n\
        <iframe src="" class="w3-border" style="width: 100%;height: 120px;display:none" id="prodVideoPreview_'+x+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\n\
        </div>\n\
        </div>\n\
              </div>'); //add input box
    } else {
                $.alert('<label class="w3-label w3-text-red"><i class="fa fa-warning w3-xxlarge"></i> You Reached the maximum limit of adding ' + max_fields + ' fields</label>');   //alert when added more than 4 input fields
              }
            });
  $(wrapper).on("click", ".delete", function (e) {
    e.preventDefault();
    $(this).parent('div').remove();
    x--;
  })
});

// function to add multiple divs for product file brochures
$(document).ready(function () {
  var max_fields = 5;
  var wrapper = $("#addedmore_fileDiv");
  var add_button = $("#add_morefile");
  var x = 1;
  $(add_button).click(function (e) {
    e.preventDefault();
    if (x < max_fields) {
      x++;
      $(wrapper).append('<div>\n\
        <div class="w3-container w3-padding-small w3-margin-top" style="border:1px dotted">\n\
        <a href="#" style="padding:1px" class="delete btn w3-text-red w3-right w3-small" title="remove image"><i class="fa fa-remove"></i>\n\
        </a>\n\
        <div class="w3-col l12 ">\n\
        <label>Brochures (optional):</label>\n\
        <input type="file" name="prod_file[]" id="prod_file_'+x+'" class="w3-input w3-border">\n\
        <span class="w3-text-red w3-small" id="file_error_'+x+'"></span>\n\
        </div>\n\
        </div>\n\
              </div>'); //add input box
    } else {
                $.alert('<label class="w3-label w3-text-red"><i class="fa fa-warning w3-xxlarge"></i> You Reached the maximum limit of adding ' + max_fields + ' fields</label>');   //alert when added more than 4 input fields
              }
            });
  $(wrapper).on("click", ".delete", function (e) {
    e.preventDefault();
    $(this).parent('div').remove();
    x--;
  })
});

// ----function to preview selected image for product------//
function readURL(input,id) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

    var extension = $('#prod_image_'+id).val().split('.').pop().toLowerCase();
        // image validation
        if ($.inArray(extension, ['jpeg', 'png', 'jpg']) == -1) {
          $('#prodImagePreview_'+id).attr('src', '');
          $('#image_error_'+id).html('<i class="fa fa-remove"></i> ERROR: Please Select Image File. ');
          $("#submitForm").attr("disabled", true);
        } else {
          $('#image_error_'+id).html('');
          reader.onload = function (e) {
           $('#prodImagePreview_'+id).attr('src', e.target.result);
         }
         reader.readAsDataURL(input.files[0]);
         $('#submitForm').removeAttr("disabled");
       }
     }
   }

// ----function to preview selected image for product------//
function readVideo(input,id) {
  var url=$('#prod_video_'+id).val();
  if(url==''){
    $('#prodVideoPreview_'+id).hide();
  }
  else{
    $('#prodVideoPreview_'+id).show();
    $('#prodVideoPreview_'+id).error(function() {
      console.clear();
      $('#video_error_'+id).html('<span class="w3-text-red"> ERROR: URL not valid!</span>');
    }).attr( "src",url );
  }    
  console.clear();
}

// ------------ UPDATE PRODUCT JS-------------------//
// function to add multiple divs for product image
// $(document).ready(function () {
//     var max_fields = 5;
//     var wrapper = $("#update_addedmore_imageDiv");
//     var add_button = $("#update_add_moreimage");
//     var x = 1;
//     $(add_button).click(function (e) {
//         e.preventDefault();
//         if (x < max_fields) {
//             x++;
//             $(wrapper).append('<div>\n\
//               <div class="w3-container w3-padding-small w3-margin-top" style="border:1px dotted">\n\
//               <a href="#" style="padding:1px" class="delete btn w3-text-red w3-right w3-small" title="remove image"><i class="fa fa-remove"></i>\n\
//               </a>\n\
//               <div class="w3-col l12 ">\n\
//               <label>Product Image: <font color ="red"><span id ="simage_star">*</span></font></label>\n\
//               <input type="file" name="update_prod_image[]" id="update_prod_image_'+x+'" class="w3-input w3-border" onchange="readURL(this,'+x+');" required>\n\
//               <span class="w3-text-red w3-small" id="update_image_error_'+x+'"></span>\n\
//               </div>\n\
//               <div class="w3-col l12 w3-margin-top w3-margin-bottom">\n\
//               <img src="" width="auto" id="prodImagePreview_'+x+'" height="150px" alt="Product Image will be displayed here once chosen." class=" w3-centerimg img-thumbnail">\n\
//               </div>\n\
//               </div>\n\
//               </div>'); //add input box
//         } else {
//                     $.alert('<label class="w3-label w3-text-red"><i class="fa fa-warning w3-xxlarge"></i> You Reached the maximum limit of adding ' + max_fields + ' fields</label>');   //alert when added more than 4 input fields
//                 }
//             });
//     $(wrapper).on("click", ".delete", function (e) {
//         e.preventDefault();
//         $(this).parent('div').remove();
//         x--;
//     })
// });

// function to add multiple divs for product video
// $(document).ready(function () {
//     var max_fields = 5;
//     var wrapper = $("#update_addedmore_vidDiv");
//     var add_button = $("#update_add_morevideo");
//     var x = 1;
//     $(add_button).click(function (e) {
//         e.preventDefault();
//         if (x < max_fields) {
//             x++;
//             $(wrapper).append('<div>\n\
//                 <div class="w3-container w3-padding-small w3-margin-top" style="border:1px dotted">\n\
//                 <a href="#" style="padding:1px" class="delete btn w3-text-red w3-right w3-small" title="remove image"><i class="fa fa-remove"></i>\n\
//                 </a>\n\
//                 <div class="w3-col l12 ">\n\
//                 <label>Embed Video (optional):</label>\n\
//                 <input type="input" name="update_prod_video[]" id="update_prod_video_'+x+'" class="w3-input w3-border" onkeyup="readVideo(this,'+x+');" placeholder="Copy & paste url link">\n\
//                 <span class="w3-text-red w3-small" id="update_video_error_'+x+'"></span>\n\
//                 </div>\n\
//                 <div class="w3-col l12 w3-margin-top">\n\
//                 <iframe src="" class="w3-border" style="width: 100%;height: 120px;display:none" id="prodVideoPreview_'+x+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\n\
//                 </div>\n\
//                 </div>\n\
//               </div>'); //add input box
//         } else {
//                 $.alert('<label class="w3-label w3-text-red"><i class="fa fa-warning w3-xxlarge"></i> You Reached the maximum limit of adding ' + max_fields + ' fields</label>');   //alert when added more than 4 input fields
//             }
//         });
//     $(wrapper).on("click", ".delete", function (e) {
//         e.preventDefault();
//         $(this).parent('div').remove();
//         x--;
//     })
// });

// function to add multiple divs for product file brochures
// $(document).ready(function () {
//     var max_fields = 5;
//     var wrapper = $("#update_addedmore_fileDiv");
//     var add_button = $("#update_add_morefile");
//     var x = 1;
//     $(add_button).click(function (e) {
//         e.preventDefault();
//         if (x < max_fields) {
//             x++;
//             $(wrapper).append('<div>\n\
//                 <div class="w3-container w3-padding-small w3-margin-top" style="border:1px dotted">\n\
//                 <a href="#" style="padding:1px" class="delete btn w3-text-red w3-right w3-small" title="remove image"><i class="fa fa-remove"></i>\n\
//                 </a>\n\
//                 <div class="w3-col l12 ">\n\
//                 <label>Brochures (optional):</label>\n\
//                 <input type="file" name="update_prod_file[]" id="update_prod_file_'+x+'" class="w3-input w3-border">\n\
//                 <span class="w3-text-red w3-small" id="update_file_error_'+x+'"></span>\n\
//                 </div>\n\
//                 </div>\n\
//               </div>'); //add input box
//         } else {
//                 $.alert('<label class="w3-label w3-text-red"><i class="fa fa-warning w3-xxlarge"></i> You Reached the maximum limit of adding ' + max_fields + ' fields</label>');   //alert when added more than 4 input fields
//             }
//         });
//     $(wrapper).on("click", ".delete", function (e) {
//         e.preventDefault();
//         $(this).parent('div').remove();
//         x--;
//     })
// });

// ----function to preview selected image for product------//
// function update_readURL(input,id) {
//   if (input.files && input.files[0]) {
//     var reader = new FileReader();

//         var extension = $('#update_prod_image_'+id).val().split('.').pop().toLowerCase();
//         // image validation
//         if ($.inArray(extension, ['jpeg', 'png', 'jpg']) == -1) {
//             $('#update_prodImagePreview_'+id).attr('src', '');
//             $('#update_image_error_'+id).html('<i class="fa fa-remove"></i> ERROR: Please Select Image File. ');
//             $("#update_submitForm").attr("disabled", true);
//         } else {
//             $('#image_error_'+id).html('');
//             reader.onload = function (e) {
//              $('#update_prodImagePreview_'+id).attr('src', e.target.result);
//          }
//          reader.readAsDataURL(input.files[0]);
//          $('#update_submitForm').removeAttr("disabled");
//      }
//  }
// }

// ----function to preview selected image for product------//
// function update_readVideo(input,id) {
//   var url=$('#update_prod_video_'+id).val();
//   if(url==''){
//     $('#update_prodVideoPreview_'+id).hide();
// }
// else{
//     $('#update_prodVideoPreview_'+id).show();
//     $('#update_prodVideoPreview_'+id).error(function() {
//         console.clear();
//         $('#update_video_error_'+id).html('<span class="w3-text-red"> ERROR: URL not valid!</span>');
//     }).attr( "src",url );
// }    
// console.clear();
// }
// ------------------END UPDATE---------------------//


// ----function to open modal product------//
function openModal(id) {
  var modal=$('#ProdModal_'+id);
  modal.addClass('in');
}

// ----function to open modal product------//
function openHelp(modal_id) {
  var modal=$('#'+modal_id);
  modal.addClass('in');
}


// Angular js for all product view
var app = angular.module("prodApp", ['ngSanitize']); 
app.controller("ProdCtrl", function($scope,$http,$window) {

// remove product from db
$scope.removeProduct = function (product_id) {
  $.confirm({
    title: '<h4 class="w3-text-red">Please confirm the action!</h4><span class="w3-medium">Do yo really want to delete this product?</span>',
    content: '',
    type: 'red',
    buttons: {
      confirm: function () {
       $http({
         method: 'get',
         url: 'product/delProduct',
         params: {product_id: product_id},
       }).then(function successCallback(response) {
        $scope.delMessage = response.data;
        $window.setTimeout(function() {
          $(".alert").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove(); 
          });
          location.reload();
        }, 1500);

        // $scope.getServices();
      }); 
     },
     cancel: function () {
     }
   }
 });
}

// Download file code
$scope.downloadFile = function (file_path) {
  $http({
   method: 'get',
   url: 'product/downloadFile',
   params: {file_path: file_path},
 }).then(function successCallback(response) {
  alert(response.data);
  // $scope.delMessage = response.data;
  // $window.setTimeout(function() {
  //   $(".alert").fadeTo(500, 0).slideUp(500, function(){
  //     $(this).remove(); 
  //   });
  //   location.reload();
  // }, 2000);
});
}


// add new product
$("#addProduct_form").on('submit', function(e) {
 e.preventDefault(); 
 var cat=$('#product_category').val();
 var brand=$('#product_brand').val();
 var location=$('#product_location').val();

 $('#cat_error').html('');
 $('#brand_error').html('');
 $('#location_error').html('');

 if(cat==0){
  $('#cat_error').html('  ERROR: Please select Product Category. ');
  if(navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {           
    $("html,body").animate({scrollTop:0},"slow");
    document.scrollingElement.scrollTop;
  } else {
   $("html,body").animate({scrollTop:0},"slow");
 }
 return false;
}
if(brand==0){
  $('#brand_error').html('  ERROR: Please select Product Brand. ');
  if(navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {           
    $("html,body").animate({scrollTop:0},"slow");
    document.scrollingElement.scrollTop;
  } else {
   $("html,body").animate({scrollTop:0},"slow");
 }
 return false;
}
if(location==0){
  $('#location_error').html('  ERROR: Please select Location. ');
  if(navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {           
    $("html,body").animate({scrollTop:0},"slow");
    document.scrollingElement.scrollTop;
  } else {
   $("html,body").animate({scrollTop:0},"slow");
 }
 return false;
}

dataString = $("#addProduct_form").serialize();
$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('#_token').val()
  }
});
$.ajax({
    url: "product/addProduct", // point to server-side PHP script
    data: new FormData(this),
    type: 'POST',
    contentType: false, // The content type used when sending data to the server.
    cache: false, // To unable request pages to be cached
    processData: false,
    beforeSend: function(){
      $('#btnsubmit').html('<span class="w3-card w3-padding-small w3-margin-bottom w3-round"><i class="fa fa-spinner fa-spin w3-large"></i> <b>Adding Product. Hold on...</b></span>');
    },
    success: function(data){
      $('#formOutput').html(data);
      $('#btnsubmit').html('<button type="submit" title="Add new product" id="submitForm" class="btn theme_bg">Save and Add Product</button>');

      window.setTimeout(function() {
       $(".alert").fadeTo(500, 0).slideUp(500, function(){
         $(this).remove(); 
       });
       window.location.reload();
     }, 1000);
    },
    error:function(data){
     $('#formOutput').html('<div class="alert alert-warning alert-dismissible fade in alert-fixed w3-round"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Failure!</strong> Something went wrong. Please refresh the page and try once again.</div>');
     $('#btnsubmit').html('<button type="submit" title="Add new product" id="submitForm" class="btn theme_bg">Save and Add Product</button>');
     window.setTimeout(function() {
       $(".alert").fadeTo(500, 0).slideUp(500, function(){
         $(this).remove(); 
       });
     }, 5000);
   }
 });
return false;  //stop the actual form post !important!
});

});
