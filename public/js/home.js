$().ready(function(){
  $( "#registerForm" ).submit(function(event) {
    event.preventDefault();
    var data = $(this).serializeArray().reduce(function(a, x) { a[x.name] = x.value; return a; }, {});
	// var urlshit = buildURL
    $.ajax({
      url: 'http://localhost:3000/user/addsuperadmin',
      type: 'post',
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: 'json',
      success: function () {
        alert('注册成功');
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.responseJSON.message);
      }
    });
  });

  $( "#registerAgentForm" ).submit(function(event) {
    event.preventDefault();
    var data = $(this).serializeArray().reduce(function(a, x) { a[x.name] = x.value; return a; }, {});
    $.ajax({
      url: 'http://localhost:3000/user/addsuperadmin',
      type: 'post',
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: 'json',
      success: function () {
        console.log('success');
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.responseJSON.message);
      }
    });
  });

  $( "#loginForm" ).submit(function( event ) {
    event.preventDefault();
    var data = $(this).serializeArray().reduce(function(a, x) { a[x.name] = x.value; return a; }, {});
    $.ajax({
      url: 'http://localhost:3000/login',
      type: 'post',
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: 'json',
      success: function (result) {
        setCookie('username', data['username'], 1);
        setCookie('role', result.role, 1);
        window.location.href = '/home.html';
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.responseJSON.message);
      }
    });
  });

  if (getCookie('username')) {
    $('.signForm').hide();
    $('.signedForm').show();
  } else {
    $('.signForm').show();
    $('.signedForm').hide();
  }
  console.log('test')
});

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}