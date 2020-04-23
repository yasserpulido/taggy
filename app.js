"use strict";

var tagsInput = document.getElementsByClassName('tags-input');
var textInput = document.getElementsByClassName('text-input');
var tags = [];
var movies = [
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

tagsInput[0].addEventListener('click', function () {
    let tagList = document.getElementsByClassName('tag-list');
    if (tagList[0] == undefined) {
        GenerateList();
        tagList[0].style.display = 'block';
    } else {
        if (tagList[0].style.display === 'block') {
            tagList[0].style.display = 'none';
            tagList[0].remove();

        } else {
            tagList[0].style.display = 'block';
            GenerateList();
        }
    }
    document.getElementsByClassName('text-input')[0].focus();
});

textInput[0].addEventListener('keypress', function (e) {
    if (e.keyCode == 13) {
        AddTag(e.srcElement.value);
    }
});

function GenerateList() {
    console.log('creating object list...');
    let objList = {
        div: document.createElement('div'),
        ul: document.createElement('ul'),
        li: ''
    };

    console.log('inserting div...');
    objList.div.classList.add('tag-list');
    tagsInput[0].appendChild(objList.div); // tagsInput external class.

    console.log('inserting ul...');
    objList.div.appendChild(objList.ul);

    console.log('inserting li...');
    movies.forEach(element => {
        objList.li = document.createElement('li');
        console.log(element);
        objList.li.textContent = element;
        objList.ul.appendChild(objList.li);
    });
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