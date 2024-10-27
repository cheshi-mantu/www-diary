---
title: Git for an idiot
layout: doc
editLink: true
lastUpdated: true
---

# Here we have git and sometimes GitHub basics for an idiot

## Git configuration

Configuration can be local or global. We'll discuss global config.

**Username**

```shell
git config --global user.name "Cheshi Mantu"
```

**Email**

```shell
git config --global user.email cheshi.mantu@emailserver.server
```

**Default code editor**

We'll use VS Code.

```shell
git config --global core.editor code
```

**Check global config**

```shell
git config --list
```

## Using RSA keys for working with remote repos

This is a secure way to work with systems supporting the work with RSA key pairs to establish secure connection.

### Generate RSA keypair



## Start working on a GH project

If all work is done on GH side and there are files, then easy-peasy.

1. Create GH repo (presumably done).
2. Clone the repo.
3. Do stuff.
4. Update GH repo

### Clone repo

```shell
# I'm using SSH not HTTPS
git clone git@github.com:cheshi-mantu/www-diary.git
# for HTTPS (really?) usage you need different link.
git clone https://github.com/cheshi-mantu/www-diary.git
```

### Do suff, Update GH repo

You need add all the changes, create a new commit and then push the stuff to the cloud (GH).

```shell
# collects all the changes
git add .
# creates commit with comment
git commit -m "describe the stuff done"
# pushes the committed changes to GH
git push origin
```