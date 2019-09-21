// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as commands from "./commands";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let disassembleBasic = vscode.commands.registerCommand('vscode-ti.disassembleBasic', () => {
        commands.onDisassembleBasic();
    });
    context.subscriptions.push(disassembleBasic);
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
