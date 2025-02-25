
async function dataLoad() {
  const response = await fetch('http://localhost:3000/profileView')
    .then(response => response.json())
    .catch(err => console.log("Couldn't fetch data: ", err));
  if(response && response.endsAt) {
    loadProfile(response);
  }else  {
    $('#headline').html('<h4>Profile Data not Found.</h4>')
  }
} 

function loadProfile(data) {
  $("#headline").textContent = "Welcome, " + data.username + "!";
        
    const stats = document.createElement('ul');
    const name = document.createElement('li');
    name.textContent = data.first_name + " " + data.last_name;
        
    const role = document.createElement('li');
    role.textContent = data.role;

    const soc = document.createElement('li');
    soc.textContent = data.name; //idk how this is going to format in the json
        
    stats.appendChild(name);
    stats.appendChild(role);
    stats.appendChild(soc);
        
    $('#profile-stats').appendChild(elecDiv);
}

$(document).ready(dataLoad);