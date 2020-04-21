"use strict";

var tagsInput = document.getElementById('tags-input');
var textInput = document.getElementById('text-input');
var popupInput = document.getElementById('popup-activator');
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

tagsInput.addEventListener('click', function () {
    document.getElementById('text-input').focus();
});

textInput.addEventListener('keypress', function (e) {
    if (e.keyCode == 13) {
        AddTag(e.srcElement.value);
    }
});

popupInput.addEventListener('click', function () {
     
});

function AddTag(param) {
    console.log('creating object tag...')
    let objTag = {
        span: document.createElement('span'),
        p: document.createElement('p'),
        a: document.createElement('a'),
        i: document.createElement('i'),
        content: ''
    };

    console.log('inserting span...');
    objTag.span.classList.add('tag');
    tagsInput.insertBefore(objTag.span, textInput);

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
    document.getElementById('text-input').value = '';
}

function DeleteTag(tag) {
    console.log('removing...');
    tags.splice(tags.indexOf(tag), 1);
    tag.span.remove();
}

function EditTag(tag) {
    console.log('editing...');
    DeleteTag(tag);
    textInput.value = tag.p.textContent;
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