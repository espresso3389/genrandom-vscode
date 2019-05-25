# genrandom - Generate Random Bytes

![](https://raw.githubusercontent.com/espresso3389/genrandom-vscode/master/images/intro.gif)

This is a Visual Studio Code extension, which generates random bytes and insert them on the current caret positions.
It can generate random character sequence in four forms:

### BASE64
It generates 48 byte random byte sequence encoded in BASE64.
```
6LGCGiYWnqngAl5KslABc3Ki4sRQ/2BHDULglM74j3V15JADG8ivG1T+YapuZGGG
```
### Hexadecimally encoded (HEX) bytes
It generates 32 byte random byte sequence in hexadecimal form.
```
31920EE1AE9E574BA00D55AFEA02CF33AED6C10E9710BB26FD3AB90B80F6E748
```
### Comma-Separated HEX bytes
It generates 32 byte random byte sequence, which is hexed and comma-separated.
```
91,14,5B,55,AB,A0,31,23,FD,3D,A8,FA,C6,14,62,42,F8,F5,78,04,2B,86,84,91,36,E6,C0,F1,E1,26,5E,1A
```
### Random Character Sequence
It generates 32 random character sequence.
It is useful for generating cryptographically strong passwords.
```
<iE/I+V@J>Oq0@Npzr\'fa:_d9-O&B[2
```
### Random Sequence using Selected Characters
It generates 32 random character sequence using the selected characters.
If you select `0123456789abcdef`, it will generate something like `348cc07350cb47cbee7230492d0c0e20`.


## Marketplace URL
https://marketplace.visualstudio.com/items?itemName=espresso3389.genrandom
