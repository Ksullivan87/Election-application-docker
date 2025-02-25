function init() {
    const header = $('<div>');
    const placeholderName = "placeholder name";
    $(document.body).append(header);
    $(header).addClass("text-bg-primary p-3").text("Welcome!");
    $(document.body).append('<form>\
        <h2>Log-in</h2>\
        <div class="mb-3">\
          <label for="InputUsername" class="form-label">Username</label>\
          <input type="username" class="form-control" id="InputUsername" aria-describedby="emailHelp">\
        </div>\
        <div class="mb-3">\
          <label for="InputPassword" class="form-label">Password</label>\
          <input type="password" class="form-control" id="InputPassword">\
        </div>\
        <button type="button" class="btn btn-primary">Submit</button>\
      </form>');
    $('form').last().addClass('position-absolute top-50 start-50 translate-middle align-middle');

    $("button").first().click(async function() {
      const res = await fetch(`http://localhost:3000/login`, {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({'password': `${$('#InputPassword').val()}`, 'username': `${$('#InputUsername').val()}`})
	});
	
	console.log(await res.text());
  	//const resJSON = await res.json();
    });
}
$(document).ready(init);
