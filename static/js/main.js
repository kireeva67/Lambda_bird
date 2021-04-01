let results = randomResults(50);
let filtered = JSON.parse(JSON.stringify(results)); //deep copy
let sortTag = null;


function random(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function randomResults(amount){
    let names = ['Michael', 'Christopher', 'Matthew', 'David', 'James', 'Joel', 'Phillip', 'Raymond', 'Luis', 'Larry', 'Alan', 'Jeremiah'];
    let surnames = ['Parkinson', 'Morrison', 'Wallace', 'Jacobson', 'Kendal', 'Gardner', 'Day', 'Clifford', 'Austin', 'Becker', 'Adamson'];
    let results = [];
    for(let ch = 1; ch <= amount; ch++){
        let result = {};
        result['place'] = ch;
        let name = names[random(0, names.length-1)];
        let surname = surnames[random(0, surnames.length-1)];
        result['name'] = `${name} ${surname}`;
        result['accuracy'] = random(0, 100);
        result['fireRapidity'] = random(30, 100);
        results.push(result);
    }
    return results;
}


function showResult(result){
    let line = document.createElement('div');
    line.classList.add('table__line');
    let cellPlace = document.createElement('div');
    cellPlace.classList.add('table__cell');
    cellPlace.innerHTML = result['place'];
    let cellName = document.createElement('div');
    cellName.classList.add('table__cell');
    cellName.innerHTML = result['name'];
    let cellAccuracy = document.createElement('div');
    cellAccuracy.classList.add('table__cell');
    cellAccuracy.innerHTML = result['accuracy'];
    let cellFireRapidity = document.createElement('div');
    cellFireRapidity.classList.add('table__cell');
    cellFireRapidity.innerHTML = result['fireRapidity'];
    line.appendChild(cellPlace);
    line.appendChild(cellName);
    line.appendChild(cellAccuracy);
    line.appendChild(cellFireRapidity);
    let table = document.getElementsByClassName('table')[0];
    table.appendChild(line);
}


function showResults(){
    for(let ch = 0; ch < filtered.length; ch++){
        showResult(filtered[ch]);
    }
}


function onLoadPage(){
    showResults();
    sortTag =  document.getElementsByClassName('icon__img')[0];  // on start sorted by place
}


function clearTable(){
    let lines = document.getElementsByClassName('table__line');
    while(lines.length > 1){
        lines[1].remove();
    }
}


function findByName(tag){
    let name = tag.value.toLowerCase();
    if(!name){
        filtered = JSON.parse(JSON.stringify(results));
        showSortedRecords();
        return false;
    }
    let filteredByName = [];
    for(let ch = 0; ch < results.length; ch++){
        let resultName = results[ch]['name'].toLowerCase().split(' ');
        if(resultName[0].startsWith(name) || resultName[1].startsWith(name)){
            filteredByName.push(results[ch]);
        }
        
    }
    filtered = filteredByName;
    showSortedRecords();
}


function sortFiltered(field){
    if(field === 'name'){
        filtered = filtered.sort((x, y) => x[field].localeCompare(y[field]));
    }
    else{
        filtered = filtered.sort((x, y) => {return x[field] - y[field]});
    }
    
}


function turnArrowsDown(arrowTag){
    let arrowTags = document.getElementsByClassName('icon__img');
    for(let ch = 0; ch < arrowTags.length; ch++){
        let tag = arrowTags[ch];
        if(tag === arrowTag){
            continue;
        }
        tag.name = 'down';
        tag.src = "../static/img/caret-down.png";
    }
}


function showSortedRecords(tag){
    let isClick = Boolean(tag);
    tag = (tag) ? tag : sortTag;
    if(tag.name === 'down'){
        sortFiltered(tag.id);
        if(isClick){
            tag.name = 'up';
            tag.src = "../static/img/sort-up.png";
        }
        else{
            filtered.reverse();
        }
        
    }
    else{
        sortFiltered(tag.id);
        if(isClick){
            tag.name = 'down';
            tag.src = "../static/img/caret-down.png";
            filtered.reverse();
        }
        
    }
    clearTable();
    showResults();
    turnArrowsDown(tag);
    sortTag = tag;
}

window.onload = onLoadPage;