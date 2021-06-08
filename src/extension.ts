// genrandom - Generate Random Bytes
// (C) 2016 Takashi Kawasaki (@espresso3389)
'use strict';
import * as vscode from 'vscode';
import * as crypto from 'crypto';

function registerGenerator(context: vscode.ExtensionContext, name: string, random: (sel: string) => string) {
    const disposable = vscode.commands.registerCommand(name, () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.edit(edit => editor.selections.forEach(v => edit.replace(v, random(editor.document.getText(v)))));
        }
    });
    context.subscriptions.push(disposable);
}

function hex(buf: Buffer, sep: string): string {
    const hs = "0123456789ABCDEF";
    let hex = "";
    for (let i = 0; i < buf.length; i++) {
        let b = buf[i];
        if (i > 0) {
            hex += sep;
        }
        hex += hs[b >> 4] + hs[b & 15];
    }
    return hex;
}

const randomChars = '~!@#$%^&*()_-+=[]\\|;:\'",.<>/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function woop(buf: Buffer, chars: string): string {
    chars ??= randomChars;
    let str = "";
    for (let i = 0; i < buf.length; i++) {
        str += chars[buf[i] % chars.length];
    }
    return str;
}

function getRandomChars() {
    const config = vscode.workspace.getConfiguration();
    const rand = config.get("genrandom.randomChars", '');
    if (rand === null || rand.length === 0) {
        return randomChars;
    }
    return rand;
}

function getRandomBytesFor(name: string): Buffer {
    const config = vscode.workspace.getConfiguration();
    return crypto.randomBytes(config.get('genrandom.' + name, 48));
}

function urlEscape(str: string): string {
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function activate(context: vscode.ExtensionContext) {
    registerGenerator(context, 'genrandom.generateRandomBytesBase64',
        () => getRandomBytesFor('randomByteLengthBase64').toString('base64'));

    registerGenerator(context, 'genrandom.generateRandomBytesBase64Url',
        () => urlEscape(getRandomBytesFor('randomByteLengthBase64Url').toString('base64')));

    registerGenerator(context, 'genrandom.generateRandomBytesHex',
        () => hex(getRandomBytesFor('randomLength'), ''));

    registerGenerator(context, 'genrandom.generateRandomBytesCsvHex',
        () => hex(getRandomBytesFor('randomLength'), ','));

    registerGenerator(context, 'genrandom.generateRandomChars',
        () => woop(getRandomBytesFor('randomLength'), getRandomChars()));

    registerGenerator(context, 'genrandom.generateRandomWithSelectedChars',
        sel => woop(getRandomBytesFor('randomLength'), sel));
}

export function deactivate() {
}