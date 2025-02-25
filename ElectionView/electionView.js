
async function dataLoad() {
    const data = await fetch('http://localhost:3000/electionView');
    return data;
  } 

async function init() {
    const header = $('<div>');
    const placeholderName = "placeholder name";
    const data = await dataLoad();
    data.json();
    console.log(data);
    
        
    $(document.body).append(header);
    $(header).addClass("text-bg-primary p-3").text("Welcome!");
    $(document.body).append(`<form>\
        <h2>Election Statistics</h2>`);

}

$(document).ready(init);