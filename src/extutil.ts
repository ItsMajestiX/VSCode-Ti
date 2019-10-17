import * as vscode from 'vscode';
const fs = require('fs');

/**
 * Safely convert a vscode.Uri to a platform safe string.
 * @param uri The uri to convert.
 */
export function fileUriToPath(uri: vscode.Uri) {
    if (process.platform === 'win32') {
        //Wish I could just do uri.path[1:] :(
        return uri.path.substr(1, uri.path.length - 1);
    }
    return uri.path;
}

/**
 * Create a file and then write to it.
 * @param uri The vscode.Uri of the file.
 * @param data A Uint8Array with the contents of the file.
 */
export function createAndWrite(uri: vscode.Uri, data: Uint8Array) {
    fs.closeSync(fs.openSync(fileUriToPath(uri), 'w'));
    vscode.workspace.fs.writeFile(uri, data);
}