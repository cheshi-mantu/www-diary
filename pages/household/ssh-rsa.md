---
layout: doc
prev: true
next: true
editLink: true
lastUpdated: true
title: RSA keys, SSH
---


## Using RSA keys for working with remote repos

This is a secure way to work with systems supporting the work with RSA key pairs to establish secure connection.

### Generate RSA key pair

#### Check if any keys are already here

```shell
ls -l ~/.ssh | grep id_rsa
```

If nothing found, then create new

#### Create new private / public key pair

```shell
ssh-keygen -t rsa -b 4096 -C cheshi.mantu@emailserver.server
```

`-C cheshi.mantu@emailserver.server` is generally a comment to the key pair, it allows you to quickly recognise the purpose of your key

The **passphrase** must not be empty. The **passphrase** must not be simple, do not use 1234567890 or “password” or anything equally ridiculous words, otherwise the key pair can be easily compromised and a rogue actor will be able to make some actions as if it you and this could be nasty. You have to be very careful especially with production systems and using an unprotected RSA key pair. Think thrice.

#### Check if keys are generated

```bash
ls -l ~/.ssh | grep id_rsa
```

#### Set correct permissions to RSA files

```bash
chmod 644 id_rsa.pub
```

```bash
chmod 600 id_rsa
```

Secret key must be `600`: With this, you are giving read and write permission to the owner user. Group members and others cannot read, write or execute. Even the owner cannot execute the file with this permission set.

Public key must be `644`: The owner can read and write but cannot execute it. Group members and others can read the file but cannot write or execute it.

#### Provide public key to a remote system

```bash
cat ~/.ssh/id_rsa.pub
```
the output is to be copied fully to a remote system.

### Use an RSA key pair in the scope of current user session

If you won't do this, then the ssh agent will always ask you to provide the password for the RSA secret key (you've protected it with the passphrase, right?).
If you are sure your computer won't be accessed by anyone else, then execute this command:

```shell
ssh-add
```

or specify which key to add to the agent's session

```shell
ssh-add ~/.ssh/id_rsa
```

Enter your password and you'll be able to work in scope of current user session without entering the passphrase.

### Checking if ssh agent is running

```shell
eval $(ssh-agent -s)
```

### Updating the comment of an existing key

```shell
ssh-keygen -c -f ~/.ssh/id_rsa -C "new_comment"
```
