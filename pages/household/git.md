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

### Get your RSA public key

See [this article](/household/ssh-rsa) to understand what is it and how to generate the RSA key pair.

### Provide keys to GH

1. On GH side click your avatar in the top right corner an then jump to Settings.
2. In the Settings (on the left hand side) find **SSH and GPG keys**.
3. Click new SSH key
4. Name the key
5. Copy the result of the command `cat ~/.ssh/id_rsa.pub`.
6. Save.


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