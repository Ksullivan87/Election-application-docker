async function dataLoad() {
  const response = await fetch('http://localhost:3000/api/ongoingElections')
    .then(response => response.json())
    .catch(err => console.log("Couldn't fetch data: ", err));
  if(response) {
    displayElections(response);
  }else  {
    $('#electionContent').html('<h4>No ongoing elections found.</h4>')
  }
} 

function displayElections(data) {
  var $listGroup = $("#electionList");
  $listGroup.empty();

  $.each(data.rows, function(index, election) {
    var $listItem = $('<a href="#" class="list-group-item list-group-action" data-id="' + election.id + '">')
    .text("Name: " + election.name + " || Ends at: " + election.endsAt + " || Total Votes" + election.totalVotes)
    .on('click', function(event) {
      event.preventDefault();
    });
    $listGroup.append($listItem)
        
  });
}

$(document).ready(dataLoad);