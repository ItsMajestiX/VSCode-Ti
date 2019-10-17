import * as assert from 'assert';
import { before } from 'mocha';

import * as vscode from 'vscode';

const Module = require("../../tivars_test/tivars_test");

suite('Extension Test Suite', () => {
	before(() => {
		vscode.window.showInformationMessage('Start all tests.');
	});

	//https://github.com/TI-Planet/zText/blob/master/generator.js
	test("libtivars test (ensure module works)", () => {
		const varType = Module.TIVarType.createFromName("Program");
		const model = Module.TIModel.createFromName("84+CE");
		const testItem = Module.TIVarFile.createNew(varType, "test", model);
		vscode.window.showInformationMessage(typeof testItem);
	});
});
