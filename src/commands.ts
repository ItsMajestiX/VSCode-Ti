import * as vscode from 'vscode';
import { TextEncoder } from 'util';
import * as extutil from "./extutil";

//Only works commonjs style
const filenamify = require('filenamify');

export function onDisassembleBasic(Module: any, filesLoaded: string[]): string[] {
    //TS checking
    if (vscode.window.activeTextEditor) {
        vscode.workspace.fs.readFile(vscode.window.activeTextEditor.document.uri).then((data) => {
            //More TS checking to make the compiler shut up
            if (vscode.window.activeTextEditor) {
				//Load file into emscripten file system if it doesn't exist (filename could be better, but it works)
				let convName = filenamify(vscode.window.activeTextEditor.document.fileName);
				if (!filesLoaded.includes(convName)) {
					Module.FS_createDataFile("/", filenamify(vscode.window.activeTextEditor.document.fileName), data, true, true);
					filesLoaded.push(convName);
				}
				let file = Module.TIVarFile.loadFromFile("/" + filenamify(vscode.window.activeTextEditor.document.fileName));
                //Check what kind of program the file is.
                let content = file.getReadableContent();
                if (content === "[Error] This is a squished ASM program - cannnot preview it!") {
                    vscode.window.showErrorMessage("Error: This is an ASM program. At the moment, dissassebling ASM is not supported.");
                }
                else {
                    //Write contents (also kind of hacky, but it should work)
                    let uri = vscode.window.activeTextEditor.document.uri;
					let strUri = uri.toString();
					strUri = strUri.replace('.8xp', '.tibasic');
					uri = vscode.Uri.parse(strUri);
                    extutil.createAndWrite(uri, new TextEncoder().encode(content));
                    vscode.window.showTextDocument(uri);
                }
            }
        });
	}
	return filesLoaded;
}