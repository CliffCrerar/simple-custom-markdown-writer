

getUrl.then(couchAddress => {
    remote = new PouchDB(couchAddress + 'portfolio-ui', { adapter: 'http' });
    remote.info().then(info=>{
        debug && console.log('info: ', info);
        return setupListeners(async function () {
            await syncDb();
            await populateList();
        });
    }).catch(err=>{
        log('REMOTE INFO ',JSON.stringify(err));
    })
})

function log(what) {
    const toIns = codeEl.cloneNode().innerHTML = what;
    return footer.innerHTML += toIns + '<br><br>';
}


function syncDb() {
    return localDB.sync(remote)
        .then(syncComplete => {
            console.log('syncComplete: ', syncComplete)
            loader().hide();
        })
        .catch(syncErr => console.log('syncErr: ', syncErr));
}


function populateList() {
    var listEl = document.getElementById('entry-list');
    return localDB.get('6cf35dfe4649bc106f6be414da009680').then(doc => {
        pListDocument = doc;
        doc.docs.forEach(e => {
            const [li, a] = [
                document.createElement('li'),
                document.createElement('a')
            ]
            a.onclick = fileListClick;
            a.href = '#';
            a.innerHTML = e.title;
            li.appendChild(a);
            a.id = e.id;
            listEl.appendChild(li);
        })
    })
}

function setupListeners(callback) {

    localDB.changes({
        since: 'now',
        live: true,
        include_docs: true
    }).on('change', function (change) {
        log('LOCAL change: ' + JSON.stringify(change))
    }).on('complete', function (info) {
        log('LOCAL info: ', info)
    }).on('error', function (err) {
        log('LOCAL err: ', err)
    });

    return callback();
}