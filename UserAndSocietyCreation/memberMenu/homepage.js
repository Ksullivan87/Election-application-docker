function init() {
    const header = $('<div>');
    const placeholderName = "placeholder name";
    $(document.body).append(header);
    $(header).addClass("text-bg-primary p-3").text("Welcome! " + placeholderName);
    $(document.body).append('<div class="btn-group-vertical" role="group" aria-label="Vertical button group">');
    //$('div').last().append('<button type="button" class="btn btn-primary">Your Societies</button>');
    $('div').last().append('<button type="button" id="ongoing" class="btn btn-primary">Ongoing Elections</button>');
    //$('div').last().append('<button type="button" class="btn btn-primary">Past Elections</button>');
    //$('div').last().append('<button type="button" class="btn btn-primary">Your Profile</button>');
    $('div').last().append('<button type="button" class="btn btn-primary">Logout</button>');
    $('div').last().addClass('position-absolute top-50 start-50 translate-middle');
    $('#ongoing').on('click',function() {
        window.location.href = '../onGoingElections/index.html';
    });
}
$(document).ready(init);