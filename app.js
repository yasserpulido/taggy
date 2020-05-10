"use strict";

// Español: 

const taggy = document.getElementsByClassName('taggy');
const tagsInput = document.getElementsByClassName('input-section');
const textInput = document.getElementsByClassName('text-input');
const tags = [];
const movies = [
    'The Shawshank Redemption',
    'The Godfather',
    'The Godfather: Part II',
    'The Dark Knight',
    '12 Angry Men',
    "Schindler's List",
    'Pulp Fiction',
    'The Lord of the Rings: The Return of the King',
    'The Good, the Bad and the Ugly',
    'Fight Club'
];
const btnArrow = document.getElementsByClassName('btn-arrow');
var dropdownToggle = false;

textInput[0].addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        AddTag(e.srcElement.value);
    }

    let test = DropdownFilter(e.target.value);
    DropdownDisplay(test);
});

textInput[0].addEventListener('focusout', function () {
    DropdownDisplay(false);
    dropdownToggle = false;
})

taggy[0].addEventListener('click', function () {
    document.getElementsByClassName('text-input')[0].focus(); // Immediately when taggy is clicked the text-input receive the focus

    // Puedo retornar un valor true o false despues del metodo dropdrownlist para enviar en el metodo dropdowndisplay.

    if (dropdownToggle == false) {
        let test = DropdownList(movies);
        DropdownDisplay(test);
        dropdownToggle = true;
    } else {
        let test = false;
        DropdownDisplay(test);
        dropdownToggle = false;
    }

});

function DropdownFilter(param) {
    let moviesFilter = movies.filter(function (e) {
        return e.toLowerCase().includes(param.toLowerCase());
    });

    return DropdownList(moviesFilter);
}

function RemoveList() {
    let div = document.getElementsByClassName('tag-list');
    div[0].removeChild(div[0].children[0]);
}

function DropdownList(movieList) {
    if (movieList.length != 0) {

        if (document.getElementsByClassName('tag-list')[0] == undefined) {

            let objList = {
                div: document.createElement('div'),
                ul: document.createElement('ul'),
                li: ''
            };

            objList.div.classList.add('tag-list');
            tagsInput[0].appendChild(objList.div); // tagsInput external class.

            objList.div.appendChild(objList.ul);

            movieList.forEach(element => {
                objList.li = document.createElement('li');
                objList.li.textContent = element;
                objList.ul.appendChild(objList.li);
            });
        } else {

            RemoveList();

            let objList = {
                div: document.getElementsByClassName('tag-list'),
                ul: document.createElement('ul'),
                li: ''
            };

            objList.div[0].appendChild(objList.ul);

            movieList.forEach(element => {
                objList.li = document.createElement('li');
                objList.li.textContent = element;
                objList.ul.appendChild(objList.li);
            });
        }

    } else {
        let objList = {
            div: document.createElement('div'),
            ul: document.createElement('ul'),
            li: document.createElement('li')
        };

        objList.div.classList.add('tag-list');
        tagsInput[0].appendChild(objList.div); // tagsInput external class.

        objList.div.appendChild(objList.ul);

        movieList[0] = 'No options';
        objList.li.textContent = movieList[0];
        objList.ul.appendChild(objList.li);
    }

    return true;
}

function DropdownDisplay(param) {

    if (param == true) {
        let div = document.getElementsByClassName('tag-list');
        div[0].classList.add('tag-list-show');
    } else {
        let div = document.getElementsByClassName('tag-list');
        div[0].remove();
    }
}

function AddTag(param) {
    console.log('creating object tag...');
    let objTag = {
        span: document.createElement('span'),
        p: document.createElement('p'),
        a: document.createElement('a'),
        i: document.createElement('i'),
        content: ''
    };

    console.log('inserting span...');
    objTag.span.classList.add('tag');
    tagsInput[0].insertBefore(objTag.span, textInput[0]);

    console.log('inserting p...');
    objTag.p.addEventListener('click', function () {
        EditTag(objTag);
    });
    objTag.p.textContent = TitleCase(param.trim());
    objTag.content = objTag.p.textContent;
    objTag.span.appendChild(objTag.p);

    console.log('inserting a...');
    objTag.a.classList.add('tag-delete');
    objTag.a.addEventListener('click', function () {
        DeleteTag(objTag);
    });
    objTag.span.appendChild(objTag.a);

    console.log('inserting i...');
    objTag.i.setAttribute('class', 'fas fa-times');
    objTag.a.appendChild(objTag.i);

    RefreshInput();

    tags.push(objTag);
    console.log(tags);
}

function RefreshInput() {
    console.log('refreshing...');
    document.getElementsByClassName('text-input')[0].value = '';
}

function DeleteTag(tag) {
    console.log('removing...');
    tags.splice(tags.indexOf(tag), 1);
    tag.span.remove();
}

function EditTag(tag) {
    console.log('editing...');
    DeleteTag(tag);
    textInput[0].value = tag.p.textContent;
    tag.span.remove();
}

function TitleCase(str) {
    var splitStr = str.toLowerCase().replace(/\s{2,}/ig, ' ').split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}