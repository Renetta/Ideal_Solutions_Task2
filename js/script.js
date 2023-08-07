const body = document.querySelector("body"),
    toggle = body.querySelector(".toggle"),
    sidebar = body.querySelector(".sidebar"),
    header = body.querySelector(".header");
pageContent = body.querySelector(".page-content");


toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    // header.classList.toggle("close");
    pageContent.classList.toggle("alignMainContent");
    console.log(pageContent);
});

var statuscheckboxes = document.getElementById("status");
var rolecheckboxes = document.getElementById("role");
var publishercheckboxes = document.getElementById("publisher");
var filterID = document.getElementById("filter");
var usersID = document.getElementById("users");
var dashboardID = document.getElementById("dashboard");


var statusData = [{
    name: 'Not Verified',
    value: true,
    color: 'alert-info'
}, {
    name: 'Active',
    value: false,
    color: 'alert-primary'
}, {
    name: 'Suspended',
    value: true,
    color: 'alert-warning'
}, {
    name: 'Blocked',
    value: true,
    color: 'alert-danger'
}, {
    name: 'Deleted',
    value: false,
    color: 'alert-dark'
}, {
    name: 'Deactivated',
    value: false,
    color: 'alert-dark'
},]

var roleData = [{
    name: 'Member',
    value: true
}, {
    name: 'Journalist',
    value: true
}, {
    name: 'Writer',
    value: false
}];
var publisherData = [{
    name: 'Publisher Admin',
    value: true
}, {
    name: 'Formula News',
    value: true
}];



function appendStatusData() {
    var checkBoxarr = [];
    var checked = 'flexCheckChecked';

    checkBoxarr = [];
    for (var i = 0; i < roleData.length; i++) {
        if (roleData[i].value) checked = 'flexCheckChecked';
        else checked = 'flexCheckDefault';
        checkBoxarr += '<li><div class="form-check ms-1"> ' +
            '<input class="form-check-input" type="checkbox" value="' + roleData[i].name + '" id="' + checked + '" onclick="getInputValue(this)">' +
            '<label class="form-check-label"  for="' + checked + '">' + roleData[i].name + '</label>' +
            '</div>' +
            '</li>';
    }

    if (rolecheckboxes)
        rolecheckboxes.innerHTML = checkBoxarr;
    checkBoxarr = [];
    for (var i = 0; i < publisherData.length; i++) {
        if (publisherData[i].value) checked = 'flexCheckChecked';
        else checked = 'flexCheckDefault';
        console.log(publisherData[i].name);
        checkBoxarr += '<li><div class="form-check ms-1"> ' +
            '<input class="form-check-input" type="checkbox" value="' + publisherData[i].name + '" id="' + checked + '" onclick="getInputValue(this)">' +
            '<label class="form-check-label"  for="' + checked + '">' + publisherData[i].name + '</label>' +
            '</div>' +
            '</li>';
    }
    if (publishercheckboxes)
        publishercheckboxes.innerHTML = checkBoxarr;

    checkBoxarr = [];
    for (var i = 0; i < statusData.length; i++) {
        if (statusData[i].value) checked = 'flexCheckChecked';
        else checked = 'flexCheckDefault';
        checkBoxarr += '<li><div class="form-check ms-1"> ' +
            '<input class="form-check-input" type="checkbox" value="' + statusData[i].name + '" id="' + checked + '" onclick="getInputValue(this)">' +
            '<label class="form-check-label alert ' + statusData[i].color + '"  for="' + checked + '">' + statusData[i].name + '</label>' +
            '</div>' +
            '</li>';
    }
    if (statuscheckboxes)
        statuscheckboxes.innerHTML = checkBoxarr;
}
var filterArr = [];
var selectedItem = [];
function getInputValue(data) {
    let isTaken = false;
    filterArr.find((item) => {
        if (item.name == data.value) {
            isTaken = true;
        };
    })
    if (data.checked && !isTaken) {
        filterArr.push({
            name: data.value,
            checked: data.checked
        });
    } else if (!data.checked && isTaken) {
        let index = -1;
        filterArr.forEach((item) => {
            if (item.name == data.value)
                index = filterArr.indexOf(item)
        });

        filterArr.splice(index, 1);
    }

    selectedItem = [];
    for (var i = 0; i < filterArr.length; i++) {
        selectedItem += '<div class="col-md-2 mb-2 text-center">' +
            '<label for="" class="form-control filter-color" style="font-size: 10px">' + filterArr[i].name +
            '</label>' +
            '</div>';
    };

    filterID.innerHTML = selectedItem;
}

function clearFilters() {
    filterArr = [];
    filterID.innerHTML = [];

}
var elId;
function activateClass(el) {
    switch (el) {
        case 'users':
            elId = usersID;
            elId.classList.toggle("active");
            break;
        case 'dashboard':
            elId = dashboardID;
            elId.classList.toggle("active");
            break;
        default: break;

    }
}

window.onload = appendStatusData;

