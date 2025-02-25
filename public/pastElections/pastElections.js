//const { callElection } = require("../../businessLayer");

async function dataLoad() {
  const response = await fetch('http://localhost:3000/api/pastElections')
    .then(response => response.json())
    .catch(err => console.log("Couldn't fetch data: ", err));
  if(response) {
    //console.log(response);
    displayElections(response);
  }else  {
    $('#electionContent').html('<h4>No previous elections found.</h4>')
  }
  return
} 

function displayElections(data) {
  $('#electionTable').DataTable( {
    paging: true
  });
  var $tableGroup = $("#electionTable");
  $tableGroup.empty();


  $.each(data.rows, function(index, election) {
    var $tableItem = $(` <tr>
                          <td>${election.soc_name}</td>
                          <td>${election.name}</td>
                          <td>${election.id}</td>
                        </tr>`)
    .on('click', function(event) {
      event.preventDefault();
      //callElection(election.id);
    });
    $tableGroup.append($tableItem)

    
        
  });
}

$(document).ready(dataLoad);