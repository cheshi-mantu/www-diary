---
title: Git for an idiot
layout: doc
editLink: true
lastUpdated: true
---

# Here we have git and sometimes GitHub basics for an idiot

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