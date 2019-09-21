import * as vscode from 'vscode';

const Module = require("./tivars_test/tivars_test");

export function onDisassembleBasic() {
    if (vscode.window.activeTextEditor) {
        Module.FS_createDataFile("/", vscode.window.activeTextEditor.document.fileName, vscode.workspace.fs.readFile(vscode.window.activeTextEditor.document.uri), true, true);
    }
}