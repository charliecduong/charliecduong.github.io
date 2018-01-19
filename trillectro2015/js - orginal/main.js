$(document).ready(function(){

  // Email
  setMessage = function(data){
    if (data.error === 'yes'){
      $('#email').removeClass().addClass('error');
      $('#email h4').html(data.message);
    } else {
      $('#email').removeClass().addClass('success');
      $('#email h4').html(data.message);
    }

    if (typeof data.button !== 'undefined'){
      $('form button').html(data.button);
    }
  };

  $('#signup').submit(function(event) {
    event.preventDefault();
    // Simple front-end email val.
    var cemail = $('#cemail').val();
    var cgroupid = $('#cgroupid').val();
    var cgroup1 = $('#cgroup1').val();
    // var cgroup2 = $('#cgroup2').val();

    if( /(.+)@(.+){2,}\.(.+){2,}/.test(cemail) ){

      // Send email to script and on to the chimp.
      var action = $(this).attr('action');
      $.ajax({
          url: action,
          type: 'POST',
          data: {
              email: cemail,
              groupid: cgroupid,
              group1: cgroup1
              // group2: cgroup2,
          },
          success: function(data) {
            console.log(data);
            data = $.parseJSON(data);
            setMessage(data);
          },
          error: function() {
            // If email doesn't make it to the script...
            data = {error:"yes", message:"Please try again later."};
            setMessage(data);
          }
      });

    } else {
      data = {error:"yes", message:"Please enter a valid email.", button:"Try again"};
      setMessage(data);
    }

  });

});