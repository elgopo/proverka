function accordion () {
var title = document.getElementsByClassName("contact_name"),
    cont = document.getElementsByClassName("contact_card");

    for (var q = 0; q < title.length; q++) {
        var curTitle = title[q];
        title[q].addEventListener("click", function() {
            var classes = this.getAttribute("class"),
                newClasses = "",
                classesArr = classes.split(" "),
                newClassesArr = classes.split(' ');
            for (var j = 0; j < classesArr.length; j++) {
                if (classesArr[j] == "active") {
                    classesArr.splice([j], 1);
                }
            }
            if (classesArr.length === newClassesArr.length) {
                classesArr.push("active");
                newClasses = classesArr.join(" ");
            }
            else {
                newClasses = classesArr.join(" ");
            }

            for (var l = 0; l < title.length; l++) {
                oldClasses = title[l].getAttribute("class");
                oldClassesArr = oldClasses.split(" ");
                for (var k = 0; k < oldClassesArr.length; k++) {
                    if (oldClassesArr[k] == "active") {
                        oldClassesArr.splice([k], 1);
                    }
                    oldClasses = oldClassesArr.join(" ");
                    title[l].setAttribute("class", oldClasses);
                }
            }
            this.setAttribute("class", newClasses);
        })
    }
}
function addBtnContact() {
    document.forms["formAddContact"].reset();
    document.getElementById("formAddContact").setAttribute("onsubmit", " return saveContact(this)");
    document.getElementById("myModal").style.display = "block";
    document.getElementById('addSave').style.display = "block";
    document.getElementById('addSaveEdit').style.display = "none";
}
function closeModal() {
    document.getElementById("myModal").style.display = "none";
    location.reload()
}
window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")){
        document.getElementById("myModal").style.display = "none";
        closeModal();
    }
};
function checkStorageForContacts(){
    var contacts = [ ];
    contacts = JSON.parse(localStorage.getItem("contacts"));
    if((contacts == null) || (contacts.length == 0)){
        document.getElementById("noContacts").style.display="block";
    }
    else{
        fetchContacts();
    }
}
function saveContact(form) {
    var contacts = JSON.parse(localStorage.getItem("contacts"));
    if (contacts == null) {
        var contacts = [];
    }
    var contact = {};
    contact.name = form.name.value;
    contact.lastname = form.lastname.value;
    contact.telephone = [''];
    for (i = 0; i < document.getElementsByClassName("tel_f").length; i++) {
        var telInput = document.getElementById("formTelephone" + i);
        contact.telephone[i] = telInput.value;
    }
    contact.email = [''];
    for (l = 0; l < document.getElementsByClassName("email_f").length; l++) {
        var emailInput = document.getElementById("formEmail"+l);
        contact.email[l] = emailInput.value;
    }
    for(i = 0; i < document.getElementsByClassName("tel_f").length; i++){
        for(j = 0; j < document.getElementsByClassName("tel_f").length; j++){
            var telInput1 = document.getElementById("formTelephone" + i);
            var telInput2 = document.getElementById("formTelephone" + j);
                if(i !== j){
                    if(telInput1.value == telInput2.value){
                        telInput1.style.border = "2px solid #ff6600";
                        telInput2.style.border = "2px solid #ff6600";
                        var w = 1;
                        return false
                }else {
                        telInput1.style.border = "none";
                        telInput2.style.border = "none";
                    }
            }
        }
    }
    for(i = 0; i < document.getElementsByClassName("email_f").length; i++){
        for(j = 0; j < document.getElementsByClassName("email_f").length; j++){
            var emailInput1 = document.getElementById("formEmail" + i);
            var emailInput2 = document.getElementById("formEmail" + j);
            if(i !== j){
                if(emailInput1.value == emailInput2.value){
                    emailInput1.style.border = "2px solid #ff6600";
                    emailInput2.style.border = "2px solid #ff6600";
                    var m = 1;
                    return false
                }else {
                    emailInput1.style.border = "none";
                    emailInput2.style.border = "none";
                }
            }
        }
    }
    var PATTERN = "^((8|\\+3)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{6,8}$";
    var PATTERN_EMAIL = "[A-Za-z0-9._%-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})";
    for (i = 0; i < document.getElementsByClassName("tel_f").length; i++) {
        if ((document.getElementById("formTelephone" + i).value == "") ||
            (!document.getElementById("formTelephone" + i).value.match(PATTERN))){
            var emptyTel = 1;
            document.getElementById("formTelephone" + i).style.border = "2px solid red";
            return false
        }else{
            document.getElementById("formTelephone" + i).style.border = "1px solid #F9B341";
        }
    }
    for (i = 0; i < document.getElementsByClassName("email_f").length; i++) {
        if ((document.getElementById("formEmail" + i).value == "") ||
            (!document.getElementById("formEmail" + i).value.match(PATTERN_EMAIL))){
            var emptyEmail = 1;
            document.getElementById("formEmail" + i).style.border = "2px solid red";
            return false
        }else{
            document.getElementById("formEmail" + i).style.border = "1px solid #F9B341"
        }
    }
    if((w !== 1) && (m !== 1) && (emptyTel !== 1) && (emptyEmail !== 1)){
        contacts.push(contact);
        contacts.sort(compare);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        document.getElementById("myModal").style.display = "none";
        var modal = document.getElementById("myModalCreating");
        modal.style.display = "block";
        return false;
    }
}
function closeMessage() {
    var modal = document.getElementById("myModalCreating");
    modal.style.display = "none";
    location.reload()
}
function removeContact(contact){
    var modal = document.getElementById("myModalRemove");
    modal.style.display = "block";
    document.getElementById("remove_yes").onclick = function () {
        var id = contact.id;
        contacts = JSON.parse(localStorage.getItem("contacts"));
        contacts.splice(id, 1);
        // location.reload();
        document.getElementById("p_change").innerHTML = "Contact was removed";
        var modal2 = document.getElementById("myModalCreating");
        modal2.style.display = "block";
        if (contacts.length == 0) {
            document.getElementById("noContacts").style.display="block";
        }
        localStorage.setItem("contacts", JSON.stringify(contacts));
        var contacts = document.getElementById("contact-" +id);
        contacts.parentNode.removeChild(contacts);
        modal.style.display = "none";
    };
    document.getElementById("remove_no").onclick = function () {
        modal = document.getElementById("myModalRemove");
        modal.style.display = "none";
    };
}
function editContact(editbtn) {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    var id = editbtn.id;
    var contacts = JSON.parse(localStorage.getItem("contacts"));
    var contact = contacts[id];
    var FormAdd = document.getElementById("formAddContact");
    FormAdd.removeAttribute("onsubmit");
    var SaveEditBtn = document.getElementById("addSaveEdit");
    SaveEditBtn.style.display = "block";
    var addSaveBtn = document.getElementById("addSave");
    addSaveBtn.style.display = "none";
    var EditName = document.getElementById('formName');
    EditName.value = contact.name;
    var EditLastname = document.getElementById('formLastname');
    EditLastname.value = contact.lastname;
    var editTel = document.getElementById("formTelephone0")
    editTel.value = contact.telephone[0]
    for (i = 1; i < contact.telephone.length; i++) {
        var pTelInput = document.createElement("p");
        var divTelsForm = document.getElementById("tels_form");
        pTelInput.id = "tel_field" + i;
        pTelInput.className = "tel_f";
        divTelsForm.appendChild(pTelInput);
        var str = '<i class="fa new fa-mobile" aria-hidden="true"></i>';
        str += '<input type="tel" value="' + contact.telephone[i] + '" name="telephone" id="formTelephone' + i + '" required placeholder="enter phone number">';
        str += '<button onclick="minusTel(this)" type="button" id="' + i + '"><i class="fa fa-minus" aria-hidden="true"></i></button>';
        // str += '<p class="error" id="error'+i+'">Enter 6 - 12 numbers</p>';
        pTelInput.innerHTML += str;
    }
    var EditEmail = document.getElementById('formEmail0');
    EditEmail.value = contact.email[0];
    for (i = 1; i < contact.email.length; i++) {
        var pEmailInput = document.createElement("p");
        var divEmailsForm = document.getElementById("emails_form");
        pEmailInput.id = "email_field" + i;
        pEmailInput.className = "email_f";
        divEmailsForm.appendChild(pEmailInput);
        var str = '<i class="fa new fa-envelope" aria-hidden="true"></i>';
        str += '<input type="email" value="' + contact.email[i] + '" name="email" id="formEmail' + i + '" placeholder="enter e-mail address" >';
        str += '<button onclick="minusEmail(this)" type="button" id="' + i + '"><i class="fa fa-minus" aria-hidden="true"></i></button>';
        pEmailInput.innerHTML += str;
    }
    SaveEditBtn.onclick = function () {
        var contacts = JSON.parse(localStorage.getItem("contacts"));
        var contact = contacts[id];
        contact.name = EditName.value;
        contact.lastname = EditLastname.value;
        for (i = 0; i < document.getElementsByClassName("tel_f").length; i++) {
            var telValue = document.getElementById("formTelephone" + i);
            contact.telephone[i] = telValue.value
        }
        for (l = 0; l < document.getElementsByClassName("email_f").length; l++) {
            var emailValue = document.getElementById("formEmail" + l);
            contact.email[l] = emailValue.value
        }
        var emptyName = 0;
        var emptyLastname = 0;
        var emptyTel = 0;
        var emptyEmail = 0;

        var PATTERN = "^((8|\\+3)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{6,8}$";
        var PATTERN_EMAIL = "[A-Za-z0-9._%-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})" ;
        if (contact.name == ""){
            emptyName = 1;
            document.getElementById("formName").style.border = "2px solid red"
        }
        if(contact.lastname == ""){
            emptyLastname = 1;
            document.getElementById("formLastname").style.border = "2px solid red"
        }
        for(i = 0; i < document.getElementsByClassName("tel_f").length; i++){
            for(j = 0; j < document.getElementsByClassName("tel_f").length; j++){
                var telInput1 = document.getElementById("formTelephone" + i);
                var telInput2 = document.getElementById("formTelephone" + j);
                if(i !== j){
                    if(telInput1.value == telInput2.value){
                        telInput1.style.border = "2px solid #ff6600";
                        telInput2.style.border = "2px solid #ff6600";
                        var w = 1;
                        return false
                    }else {
                        telInput1.style.border = "1px solid #F9B341";
                        telInput2.style.border = "1px solid #F9B341";
                    }
                }
            }
        }
        for(i = 0; i < document.getElementsByClassName("email_f").length; i++){
            for(j = 0; j < document.getElementsByClassName("email_f").length; j++){
                var emailInput1 = document.getElementById("formEmail" + i);
                var emailInput2 = document.getElementById("formEmail" + j);
                if(i !== j){
                    if(emailInput1.value == emailInput2.value){
                        emailInput1.style.border = "2px solid #ff6600";
                        emailInput2.style.border = "2px solid #ff6600";
                        var m = 1;
                        return false
                    }else {
                        emailInput1.style.border = "1px solid #F9B341";
                        emailInput2.style.border = "1px solid #F9B341";
                    }
                }
            }
        }
        for (i = 0; i < document.getElementsByClassName("tel_f").length; i++) {
            if ((document.getElementById("formTelephone" + i).value == "") ||
                (!document.getElementById("formTelephone" + i).value.match(PATTERN))){
                emptyTel = 1;
                document.getElementById("formTelephone" + i).style.border = "2px solid red";
            }else{
                document.getElementById("formTelephone" + i).style.border = "1px solid #F9B341";
            }
        }
        for (i = 0; i < document.getElementsByClassName("email_f").length; i++) {
            if ((document.getElementById("formEmail" + i).value == "") ||
            (!document.getElementById("formEmail" + i).value.match(PATTERN_EMAIL))){
                emptyEmail = 1;
                document.getElementById("formEmail" + i).style.border = "2px solid red"
            }else{
                document.getElementById("formEmail" + i).style.border = "1px solid #F9B341"
            }
        }
        if ((emptyName !== 1) && (emptyLastname !== 1) && (emptyTel !== 1) && (emptyEmail !== 1) && (w !== 1) && (m !== 1)) {
            contacts.sort(compare);
            localStorage.setItem("contacts", JSON.stringify(contacts));
            document.getElementById("myModal").style.display = "none";
            document.getElementById("p_change").innerHTML = "Contact was edited";
            var modal = document.getElementById("myModalCreating");
            modal.style.display = "block";
        }
    };
}
function fetchContacts(){
    var contacts = [ ];
    contacts = JSON.parse(localStorage.getItem("contacts"));
    var divContacts = document.getElementById("contacts");
    for(var i = 0; i < contacts.length; i++){
        var divContact = document.createElement("div");
        divContact.id = "contact-" + i;
        divContact.className = "contact";
        divContacts.appendChild(divContact);
        var str =  '<div id="contact_name'+i+'" class="contact_name">';
        str += '<span id="fullname-'+i+'">' + contacts[i].name + ' ' + contacts[i].lastname + '</span><form class="for_edit">';
        // str += '<span id="fullname-'+i+'"><tag id="name'+i+'">'+contacts[i].name+' </tag><tag id="lastname'+i+'">'+contacts[i].lastname+'</tag></span><form class="for_edit">';
        str += '<input class="first_name" type="text" id="firstname-'+i+'" value="' + contacts[i].name + '">';
        str += '<input class="last_name" type="text" id="lastname-'+i+'" value="' + contacts[i].lastname + '"></form></div>';
        str += '<div class="contact_card"><div class="card_actions">';
        str += '<button onclick="removeContact(this)" title="Delete Contact" class="delbtn" id ="'+ i +'"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
        str += '<button id="'+i+'"  onclick="editContact(this)" title="Edit Contact"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></div></button>';
        str += '<div class="card_content"><form><div class="tels" id="tels'+i+'">';
        str += '</div><div class="emails" id="emails'+i+'"></div></form></div></div>';
        divContact.innerHTML += str;

        var telArr = contacts[i].telephone;
        for(l = 0; l < telArr.length; l++) {
            var tels = document.getElementById("tels" + i);
            var pContact = document.createElement("p");
            tels.appendChild(pContact);
            var strq = '<i class="fa fa-mobile" aria-hidden="true"></i>';
            strq += '<input id="tel_card-' + i + '-' + l + '"  type="tel" value="' + contacts[i].telephone[l] + '" readonly>'
            pContact.innerHTML += strq;
        }
        var emailArr = contacts[i].email;
        for(j = 0; j < emailArr.length; j++){
            var emails = document.getElementById("emails"+i);
            var pEmail = document.createElement("p");
            pEmail.id = "email_p" +j;
            emails.appendChild(pEmail);
            var strq = '<i class="fa fa-envelope" aria-hidden="true"></i>';
            strq += '<input id="email_card-'+i+'-'+j+'"  type="email" value="' + contacts[i].email[j] + '" readonly>'
            pEmail.innerHTML += strq;
        }
    }
    accordion();
}
function compare(a,b) {
    var contacts = JSON.parse(localStorage.getItem("contacts"));
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}
function search() {
    var contacts = JSON.parse(localStorage.getItem('contacts'));
    var searchField = document.getElementById("search_field");
    var resetBtn = document.getElementById("reset");
    for (i = 0; i < contacts.length; i++) {
        var filter = searchField.value.toUpperCase();
            if ((contacts[i].name.toUpperCase().indexOf(filter) > -1) ||
                (contacts[i].lastname.toUpperCase().indexOf(filter) > -1)) {
                document.getElementById("contact-" + i).style.display = "";
                var noRes = 1;
            } else {
                document.getElementById("contact-" + i).style.display = "none";
            }
        if(noRes == 1){
            document.getElementById("no_res").style.display = "none"
        }
        else {
            document.getElementById("no_res").style.display = "block"
        }
    }
    resetBtn.onclick = function () {
        searchField.value = '';
    }
}
function minusTel(obj) {
    var id = obj.id;
    var i = document.getElementsByClassName("tel_f").length;
    var fieldToDel = document.getElementById("tel_field" + id);
    fieldToDel.parentNode.removeChild(fieldToDel);
    var o = parseInt(id) + 1;
    for (l = o; l < i; l++) {
        var oldId = document.getElementById("tel_field" + l);
        var newId = parseInt(l) - 1;
        oldId.id = "tel_field" + parseInt(newId);
        var oldId1 = document.getElementById("formTelephone" + l);
        var newId1 = parseInt(l) - 1;
        oldId1.id = "formTelephone" + newId;
        var oldId2 = document.getElementById(l);
        var newId2 = parseInt(l) - 1;
        oldId2.id = newId
    }
    for(j = 0; j < document.getElementsByClassName("contact").length; j++){
        var contId = document.getElementById("contact_name"+j);
        var contacts = JSON.parse(localStorage.getItem("contacts"));
        if(contId.getAttribute("class") == "contact_name active"){
            var del = j
            contacts[del].telephone.splice(id, 1)
            localStorage.setItem("contacts", JSON.stringify(contacts));
        }
    }
}
function minusEmail(obj) {
    var id = obj.id;
    var i = document.getElementsByClassName("email_f").length;
    var fieldToDel = document.getElementById("email_field" + id);
    fieldToDel.parentNode.removeChild(fieldToDel);
    var o = parseInt(id) + 1;
    for (j = o; j < i; j++) {
        var oldId = document.getElementById("email_field" + j);
        var newId = parseInt(j) - 1;
        oldId.id = "email_field" + parseInt(newId);
        var oldId1 = document.getElementById("formEmail" + j);
        var newId1 = parseInt(j) - 1;
        oldId1.id = "formEmail" + newId;
        var oldId2 = document.getElementById(j);
        var newId2 = parseInt(j) - 1;
        oldId2.id = newId
    }
    for(j = 0; j < document.getElementsByClassName("contact").length; j++){
        var contId = document.getElementById("contact_name"+j);
        var contacts = JSON.parse(localStorage.getItem("contacts"));
        if(contId.getAttribute("class") == "contact_name active"){
            var del = j
            contacts[del].email.splice(id, 1)
            localStorage.setItem("contacts", JSON.stringify(contacts));
        }
    }
}

