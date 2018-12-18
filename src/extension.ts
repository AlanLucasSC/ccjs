import * as vscode from 'vscode';
import { CLEAR_CODE_RULES } from './rules'
import { NO_EXIST } from './utils'

// this method is called when vs code is activated
export function activate(context: vscode.ExtensionContext) {

	console.log('decorator sample is activated');

	let activeEditor = vscode.window.activeTextEditor;
	if (activeEditor) {
		triggerUpdateDecorations();
	}

	vscode.window.onDidChangeActiveTextEditor(editor => {
		activeEditor = editor;
		if (editor) {
			triggerUpdateDecorations();
		}
	}, null, context.subscriptions);

	vscode.workspace.onDidChangeTextDocument(event => {
		if (activeEditor && event.document === activeEditor.document) {
			triggerUpdateDecorations();
		}
	}, null, context.subscriptions);

	var timeout: NodeJS.Timer | null = null;
	function triggerUpdateDecorations() {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(updateDecorations, 100);
	}

	let rightWordStyle = vscode.window.createTextEditorDecorationType({
		backgroundColor: { id: 'myextension.rightWord' }
	});

	let wrongWordStyle = vscode.window.createTextEditorDecorationType({
		backgroundColor: { id: 'myextension.wrongWord' }
	});

	function updateDecorations() {
		if (!activeEditor) {
			return;
		}

		const text = activeEditor.document.getText();
		const rightWords: vscode.DecorationOptions[] = [];
		const wrongWords: vscode.DecorationOptions[] = [];

		CLEAR_CODE_RULES.forEach(
			(item) => {
				let start = 0
				var indexOfWord = item.indexOfWord(text, start)

				while(indexOfWord != NO_EXIST){
					let startPosition = activeEditor.document.positionAt(indexOfWord.start);
					let endPosition = activeEditor.document.positionAt(indexOfWord.end);
					const decoration = { range: new vscode.Range(startPosition, endPosition), hoverMessage: item.hoverMessage() };
					wrongWords.push(decoration);

					start = indexOfWord.end
					indexOfWord = item.indexOfWord(text, start)
				}
			}
		)

		activeEditor.setDecorations(rightWordStyle, rightWords);
		activeEditor.setDecorations(wrongWordStyle, wrongWords);
	}
}
