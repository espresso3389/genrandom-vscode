// genrandom - Generate Random Bytes
// (C) 2016 Takashi Kawasaki (@espresso3389)
'use strict';
import * as vscode from 'vscode';
import * as crypto from 'crypto';

function registerGenerator(context: vscode.ExtensionContext, name: string, random: (sel: string) => string) {
    let disposable = vscode.commands.registerCommand(name, () => {
        let editor = vscode.window.activeTextEditor;
        if (editor)
            editor.edit(edit => editor.selections.forEach(v => edit.replace(v, random(editor.document.getText(v)))));
    });
    context.subscriptions.push(disposable);
}

function hex(buf: Buffer, sep: string): string {
    let hs = "0123456789ABCDEF";
    let hex = "";
    for (let i = 0; i < buf.length; i++) {
        let b = buf[i];
        if (i > 0) hex += sep;
        hex += hs[b >> 4] + hs[b & 15];
    }
    return hex;
}

function woop(buf: Buffer, chars: string): string {
    let str = "";
    for (let i = 0; i < buf.length; i++) {
        str += chars[buf[i] % chars.length];
    }
    return str;
}

let randomChars: string = '~!@#$%^&*()_-+=[]\\|;:\'",.<>/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export function activate(context: vscode.ExtensionContext) {
    registerGenerator(context, 'genrandom.generateRandomBytesBase64', () => crypto.pseudoRandomBytes(48).toString('base64'));
    registerGenerator(context, 'genrandom.generateRandomBytesHex', () => hex(crypto.pseudoRandomBytes(32), ''));
    registerGenerator(context, 'genrandom.generateRandomBytesCsvHex', () => hex(crypto.pseudoRandomBytes(32), ','));
    registerGenerator(context, 'genrandom.generateRandomChars', () => woop(crypto.pseudoRandomBytes(32), randomChars));
    registerGenerator(context, 'genrandom.generateRandomWithSelectedChars', sel => woop(crypto.pseudoRandomBytes(32), sel));
}

export function deactivate() {
}