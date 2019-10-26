import * as vscode from 'vscode';
import { TextEncoder } from 'util';
import * as extutil from "./extutil";

//Only works commonjs style
const filenamify = require('filenamify');

export function disassembleBasic(data: Uint8Array, uri: vscode.Uri, Module: any, filesLoaded: string[]): string[] {
    let convName = filenamify(uri.toString());
	if (!filesLoaded.includes(convName)) {
		Module.FS_createDataFile("/", filenamify(convName), data, true, true);
		filesLoaded.push(convName);
    }
	let file = Module.TIVarFile.loadFromFile("/" + filenamify(convName));
    //Check what kind of program the file is
    let content = file.getReadableContent();
    if (content === "[Error] This is a squished ASM program - cannnot preview it!") {
       vscode.window.showErrorMessage("Error: This is an ASM program. At the moment, dissassebling ASM is not supported.");
    }
    else {
        //Write contents (also kind of hacky, but it should work)
		let strUri = uri.toString();
		strUri = strUri.replace('.8xp', '.tibasic');
		uri = vscode.Uri.parse(strUri);
        extutil.createAndWrite(uri, new TextEncoder().encode(content));
        vscode.window.showTextDocument(uri);
    }
    return filesLoaded;
}