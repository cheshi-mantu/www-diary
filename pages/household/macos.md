---
title: macos
layout: doc
prev: false
next: false
editLink: false
lastUpdated: true
---

# right...

## disable annoying animations in MacOS

Well, 'cause it's really fecking annoying, man.


```shell
defaults write NSGlobalDomain NSWindowResizeTime -float 0.001
defaults write NSGlobalDomain NSAutomaticWindowAnimationsEnabled -bool false
defaults write NSGlobalDomain NSWindowAnimationBehavior -string ""
killall Finder
```

2025-10-24