/**
 * List controls
 */



function fileListClick(ev) {
    textContainer.value = pListDocument.docs[ev.target.id].content;
    elementID = ev.target.id;
    updateMarkdownContainer()
    toggleBtn('save-btn', false);
    return;
}

function updateFileObject() {
    return pListDocument.docs[elementID].content = textContainer.value;
}

function saveText() {
    updateFileObject();
    return localDB.upsert('6cf35dfe4649bc106f6be414da009680', ($doc) => {
        debug && console.log('$doc: ', $doc);
        return pListDocument;
    }).then(saveResult=>{
        log(JSON.stringify(saveResult));
        return replicateToServer();
    }).catch(saveErr=>log(JSON.stringify(saveErr)))
}

function replicateToServer() {
    return localDB.replicate.to(remote)
        .on('complete', () => {
            debug && console.log('Saved to remote');
            toggleBtn('save-btn', false);
        })
        .catch(err => log(JSON.stringify(err)))
}

function loader(){
    const loader = document.getElementById('loader');
    this.hide = function(){
        loader.classList.add('no-display');
    }
    this.show = function(){
        loader.classList.remove('no-display');
    }
    return this;
}

function addnew() {
    // not implemented yet
    return;
}

saveButton.addEventListener('click', saveText)
