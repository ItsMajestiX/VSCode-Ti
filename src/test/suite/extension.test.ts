import * as assert from 'assert';
import { before } from 'mocha';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';

import Module from '../../tivars_test/tivars_test.js';

// import * as myExtension from '../extension';

suite('Extension Test Suite', () => {
	before(() => {
		vscode.window.showInformationMessage('Start all tests.');
	});

	test('Sample test', () => {
		assert.equal(-1, [1, 2, 3].indexOf(5));
		assert.equal(-1, [1, 2, 3].indexOf(0));
	});

	//https://github.com/TI-Planet/zText/blob/master/generator.js
	test("WASM test", () => {
		const varType = Module.TIVarType.createFromName("Program");
		const model = Module.TIModel.createFromName("84+CE");
		const testItem = Module.TIVarFile.createNew(varType, "test", model);
		vscode.window.showInformationMessage(typeof testItem);
	});
});
