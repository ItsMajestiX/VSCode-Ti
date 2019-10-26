import * as vscode from 'vscode';
import * as commands from "./commands";

export function activate(context: vscode.ExtensionContext) {
	//Use commonjs, or else crash (maybe)
	//Note that we don't add .js at the end, that also causes crash (maybe)
	//Import here so wasm isn't reloaded every time we run the command
	const Module = require('./tivars_test/tivars_test');
	//Register commands and their variables
	let filesLoaded:string[] = [];
	let disassembleBasic = vscode.commands.registerTextEditorCommand('vscode-ti.disassembleBasic', (textEditor, edit) => {
		vscode.workspace.fs.readFile(textEditor.document.uri).then((result) => {
			filesLoaded = commands.disassembleBasic(result, textEditor.document.uri, Module, filesLoaded);
		});
	});
	let disassembleBasicContext = vscode.commands.registerCommand('vscode-ti.disassembleBasicContext', (fileUri) => {
		vscode.workspace.fs.readFile(fileUri).then((result) => {
			filesLoaded = commands.disassembleBasic(result, fileUri, Module, filesLoaded);
		});
	});
	context.subscriptions.push(disassembleBasic);
	context.subscriptions.push(disassembleBasicContext);
	//Handler to ask user to disassemble files
	let windowChangeHandler = vscode.window.onDidChangeActiveTextEditor((event) => {
		if (typeof event !== "undefined") {
			if (event.document.uri.path.endsWith(".8xp")) {
				let userInput = vscode.window.showInformationMessage("It looks like this file is a raw .8xp. Convert it to Ti-Basic and save?", "Yes", "No");
				userInput.then((value) => {
					if (typeof value !== "undefined") {
						if (value === "Yes") {
							vscode.commands.executeCommand("vscode-ti.disassembleBasic");
						}
					}
				});
			}
		}
	});
	context.subscriptions.push(windowChangeHandler);
}

// this method is called when your extension is deactivated
export function deactivate() {}
