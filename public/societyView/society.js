function init() {
    const header = $('<div>');
    const placeholderName = "placeholder name";
    $(document.body).append(header);
    $(header).addClass("text-bg-primary p-3").text("Welcome!");
    $(document.body).append('<form>\
        <h2>Log-in</h2>\
        <div class="mb-3">\
          <label for="exampleInputEmail1" class="form-label">Email address</label>\
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">\
        </div>\
        <div class="mb-3">\
          <label for="exampleInputPassword1" class="form-label">Password</label>\
          <input type="password" class="form-control" id="exampleInputPassword1">\
        </div>\
        <button type="submit" class="btn btn-primary">Submit</button>\
      </form>');
    $('form').last().addClass('position-absolute top-50 start-50 translate-middle align-middle')
}
$(document).ready(init);