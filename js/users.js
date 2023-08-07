// let http = new XMLHttpRequest();


// http.open('GET', 'https://cors-anywhere.herokuapp.com/./data.json', true);


// http.onreadystatechange = () => {
//     if (this.readyState = 4 && this.status == 200) {
//         let users = JSON.parse(http.responseText);
//         let usersData = "";
//         console.log(users); 
//     }
// }

// http.onload = () => {
//     if (this.readyState = 4 && this.status == 200) {
//         let users = JSON.parse(this.responseText);
//         let usersData = "";
//         console.log(users); 
//     }
// }

// http.send();
const columnDefs = [
    { field: "name" },
    { field: "role" },
    { field: "status" },
    { field: "publisher" },
    { field: "last_login" }
];

// specify the data
const rowData = [];

// let the grid know which columns and what data to use
const gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    defaultColDef: {
        sortable: true,
        filter: true
    },
    rowSelection: 'multiple',
    animatedRows: true,
    onCellClicked: params => {
        console.log('cell was clicked', params)
    }
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#usersGrid');
    new agGrid.Grid(gridDiv, gridOptions);
});

function getData() {
    fetch("./data.json", {mode: "no-cors"})
        .then(response => response.json())
        .then(data => {
            console.log(data.users);
            // load fetched data into grid
            gridOptions.api.setRowData(data.users);
        });
}

 window.onload = getData;


