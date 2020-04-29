"use strict";

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

textInput[0].addEventListener('keydown', function (e) {
    // if (e.keyCode == 13) {
    //     AddTag(e.srcElement.value);
    // }
    DropdownFilter(e.target.value);
});

taggy[0].addEventListener('click', function () {
    // document.getElementsByClassName('text-input')[0].focus(); // Immediately when taggy is clicked the text-input receive the focus
    DropdownList(movies);
});

taggy[0].addEventListener('focusout', function () {

});

function DropdownFilter(param) {
    let moviesFilter = movies.filter(function (e) {
        return e.toLowerCase().startsWith(param.toLowerCase());
    })

    DropdownList(moviesFilter);
}

function DropdownList(movieList) {
    let div = document.getElementsByClassName('tag-list');

    if (div != undefined) {
        if (movieList.length != 0) {
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

            div[0].style.display = 'block'

            DropdownDisplay(div);
        }
    } else {
        div[0].style.display = 'none'
        DropdownDisplay(div);
    }
}

function DropdownDisplay(param) {
    if (param[0].style.display === 'none') {
        param[0].style.display = 'block';
        console.log('true');
    } else {
        param[0].style.display = 'none';
        param[0].remove();
        console.log('false');
    }

    if (btnArrow[0].classList.contains('fa-chevron-down')) {
        btnArrow[0].classList.replace('fa-chevron-down', 'fa-chevron-up');
    } else {
        btnArrow[0].classList.replace('fa-chevron-up', 'fa-chevron-down');
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