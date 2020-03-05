/**
 * Button controls
 */

function toggleBtn(btnId, boolParam) {
    const btnOperation = document.getElementById(btnId);
    if (boolParam === undefined) {
        btnOperation.disabled = !btnOperation.disabled
    } else if (boolParam) {
        btnOperation.disabled = true;
    } else if (!boolParam) {
        btnOperation.disabled = false;
    }
    return;
}