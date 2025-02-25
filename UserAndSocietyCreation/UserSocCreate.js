function init() {
    const header = $('<div>');
    const placeholderName = "placeholder name";
    $(document.body).append(header);
    $(header).addClass("text-bg-primary p-3").text("Welcome!");
    $(document.body).append('<div id="pageCenter">');
    $('#pageCenter').append('<form>\
        <h2>New User</h2>\
        <div class="mb-3">\
          <label for="usernameInp" class="form-label">Username</label>\
          <input type="text" class="form-control" id="usernameInp">\
        </div>\
        <div class="mb-3">\
          <label for="roleInp" class="form-label">Role</label>\
          <input type="text" class="form-control" id="roleInp">\
        </div>\
        <div class="mb-3">\
          <label for="firstNameInp" class="form-label">First Name</label>\
          <input type="text" class="form-control" id="firstNameInp">\
        </div>\
        <div class="mb-3">\
          <label for="lastnameInp" class="form-label">Last Name</label>\
          <input type="text" class="form-control" id="lastnameInp">\
        </div>\
        <div class="mb-3">\
          <label for="phoneInp" class="form-label">Phone</label>\
          <input type="text" class="form-control" id="phoneInp">\
        </div>\
        <button type="button" id="userCreateButton" class="btn btn-primary">Submit</button>\
      </form>');
    $('#pageCenter').append('<form>\
        <h2>New Society</h2>\
        <div class="mb-3">\
          <label for="societyNameInp" class="form-label">Society Name</label>\
          <input type="text" class="form-control" id="societyNameInp">\
        </div>\
        <button type="button" id="societyCreateButton" class="btn btn-primary">Submit</button>\
      </form>');
    $('form').css('margin', '4vw');
    $('#pageCenter').last().addClass('position-absolute top-50 start-50 translate-middle align-middle d-flex');
    $('#userCreateButton').on('click', async function() {
      const res = await fetch('http://localhost:3000/usrcreate', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
		    body: JSON.stringify({'role': `${$('#roleInp').val()}`, 'username': `${$('#usernameInp').val()}`, 'fname': `${$('#firstNameInp').val()}`, 'lname': `${$('#lastnameInp').val()}`, 'phone': `${$('#phoneInp').val()}`}) 
      });
      if(await res.text() !== "Bad user info...") {
	$("#pageCenter").append('<p>added user succesfully</p>')
      }else {
      	$("#pageCenter").append('<p>failed to add user</p>')
      }
	});
	
    $('#societyCreateButton').on('click', async function() {
    	const res = await fetch('http://localhost:3000/soccreate', 
    	{
        	method: "POST",
        	headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({'societyName': `${$('#societyNameInp').val()}`})
	});
	if(await res.text() !== "Bad society name...") {
		$("#pageCenter").append('<p>added society succesfully</p>')
      	} else {
      		$("#pageCenter").append('<p>failed to add society</p>')
      	}
      
    });
}
$(document).ready(init);
