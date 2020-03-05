

textContainer.onkeyup = function () {
    debug && console.log('keyup');
    ableToSave = true;
    updateMarkdownContainer()
}

function clear() {
    textContainer.innerHTML = '';
    mdContainer.innerHTML = '';
    return;
}
