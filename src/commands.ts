import * as vscode from 'vscode';
import { TextEncoder, TextDecoder } from 'util';
import * as extutil from "./extutil";

//Only works commonjs style
const filenamify = require('filenamify');

export function disassembleBasic(data: Uint8Array, uri: vscode.Uri, Module: any): void {
    let count = 0;
    let countUsed = true;
    while (countUsed) {
        try {
            Module.FS_writeFile("/" + count.toString(), data, { flags: "wx" });
            countUsed = false;
        } catch (error) {
            count++;
        }
    }
	Module.FS_writeFile("/" + count.toString(), data);
	let file = Module.TIVarFile.loadFromFile("/" + count.toString());
    //Check what kind of program the file is
    let content = file.getReadableContent();
    if (content === "[Error] This is a squished ASM program - cannnot preview it!") {
       vscode.window.showErrorMessage("Error: This is an ASM program. At the moment, disassebling ASM is not supported.");
    }
    else {
        //Write contents (also kind of hacky, but it should work)
		let strUri = uri.toString();
		strUri = strUri.replace('.8xp', '.tibasic');
		uri = vscode.Uri.parse(strUri);
        extutil.createAndWrite(uri, new TextEncoder().encode(content));
        vscode.window.showTextDocument(uri);
    }
}

export function assembleBasic(data: Uint8Array, uri: vscode.Uri, Module: any): void {
    //https://stackoverflow.com/a/17606289/10720080
    let programName = uri.fsPath.replace(new RegExp(/\\/, "g"), "/").split("/").pop()!.split(".")[0];
    let newPrgm = Module.TIVarFile.createNew(Module.TIVarType.createFromName("Program"), programName.toUpperCase());
    newPrgm.setContentFromString(new TextDecoder().decode(data));
    newPrgm.saveVarToFile("/", programName);
    //Do reverse of above
	let strUri = uri.toString();
	strUri = strUri.replace('.tibasic', '.8xp');
    uri = vscode.Uri.parse(strUri);
    extutil.createAndWrite(uri, Module.FS_readFile("/" + programName + ".8xp"));
    vscode.window.showTextDocument(uri);
}