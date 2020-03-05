var remote;

var pListDocument;

var selected;

var elementID;

const debug = true;

const footer = document.getElementsByTagName('footer')[0];

const codeEl = document.createElement('code');

const getUrl = fetch('/getcouchaddress').then(resp => resp.text());

const mainTextInput = document.getElementById('main-text-input');

const saveButton = document.getElementById('save-btn');

const textContainer = document.getElementById('editor');

const mdContainer = document.getElementById('markdown');

// const listLoader = new ListLoading();

const localDB = new PouchDB('doc-store');

const updateMarkdownContainer = () => mdContainer.innerHTML = marked(textContainer.value);
