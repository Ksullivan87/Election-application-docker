function init() {
    const header = $('<div>');
    const placeholderName = "placeholder name";
    $(document.body).append(header);
    $(header).addClass("text-bg-primary p-3").text("Welcome!");
    const menu = $("<div>").addClass("position-absolute top-50 start-50 d-grid gap-2 w-25 align-middle translate-middle");
    const button = $("<button>").addClass("btn btn-primary");
    var buttons = [button.clone(), button.clone(), button.clone(), button.clone(), button.clone(), button.clone(), button.clone()];
    buttons[0].text("Ballot Creation");
    buttons[0].on('click', function() {
      window.location.href = '../ballotCreation/index.html';
    });

    buttons[1].text("Your Societies");
    buttons[1].on('click', function() {
      window.location.href = '../societyView/index.html';
    });

    buttons[2].text("Ongoing Elections");
    buttons[2].on('click', function() {
      window.location.href = '../onGoingElections/index.html';
    });

    buttons[3].text("Past Elections");
    buttons[3].on('click', function() {
      window.location.href = '../pastElections/index.html';
    });

    buttons[4].text("Manage Societies/Users");
    buttons[4].on('click', function() {
      window.location.href = '../UserAndSocietyCreation/index.html';
    });

    buttons[5].text("View Statistics");
    buttons[5].on('click', function() {
      window.location.href = '../adminStatistics/index.html';
    });

    buttons[6].text("Logout");
    for (var i = 0; i < buttons.length; i++) {
      menu.append(buttons[i]);
    } 
    $(document.body).append(menu);
}
$(document).ready(init);