
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
// document.addEventListener('DOMContentLoaded', () => {
//     const gridDiv = document.querySelector('#usersGrid');
//     new agGrid.Grid(gridDiv, gridOptions);
// });

// var selectedRows = document.querySelectorAll(".rowSel");
var selectedRows = document.getElementsByClassName("rowSel");
var tableData = document.getElementById("rowData");

statusList = {
    'Not Verified': 'alert-info',
    Active: 'alert-primary',
    Suspended: 'alert-warning',
    Blocked: 'alert-danger',
    Deleted: 'alert-dark',
    Deactivated: 'alert-dark'

};

publish = {
    'Formula News': 'alert-success'
}
function getSelectedRowData(num) {
    // console.log(num);
    selectedRows[num].addEventListener("click", (eve) => {
        console.log(eve.target);
    }, true);
}

function getData() {
    let rowArr = [];
    fetch("./data.json", { mode: "no-cors" })
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.users.length; i++) {
                let date = new Date(data.users[i].last_login);
                let loginTime = date.getDate() + '.' + date.getMonth() + 1 + '.' + date.getFullYear() + ', ' + date.getHours() + ':' + date.getMinutes();
                let set = data.users[i].publisher == 'Formula News' ? 'Invited' : '';
                let publishData = data.users[i].publisher == 'Formula News' ? 'Formula News' : '-';
                rowArr += '<tr class="rowSel"  onclick="getSelectedRowData('+i+')">' +
                    '<td class="p-3 ms-5"><img src="./assets/images/profile.jpeg" class="img-fluid rounded-5" width="30" height="20"></td>' +
                    '<td class="p-3"><span class="fw-bold">' + data.users[i].name + '</span><p class="color-grey">' + data.users[i].email + '</p></td>' +
                    '<td class="p-3">' + data.users[i].role + '</td>' +
                    '<td class="p-3"><label class="form-check-label alert ' + statusList[data.users[i].status] + '">' + data.users[i].status + '<label></td>' +
                    '<td class="p-3">' + publishData +
                    '<label class="ms-2 form-check-label alert ' + publish[data.users[i].publisher] + '">' + set + '<label></td>' +
                    '<td class="p-3">' + loginTime + '</td>' +
                    '</tr>';
            }

            tableData.innerHTML = rowArr;
        });


}

getData();




