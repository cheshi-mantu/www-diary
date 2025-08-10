---
layout: doc
prev: true
next: true
editLink: true
lastUpdated: true
title: SSL certificates
---


# Adding SSL certificates to your site

## Why SSL?

SSL certificates encrypt data between the server and client to prevent interception. They also verify the server’s identity, ensuring users connect to the intended site. That's it.

## Options

There are two ways:

1. Free, e.g. Let's encrypt certificates
2. Paid for real money, issued/signed by Certificate Authority (CA).

### Free option

Let’s Encrypt certificates are free, automated, and typically valid for 90 days, requiring regular renewal.

So, you need either to create a schedule and reminders and run commands in terminal to renew these, or create automation, e.g. with help of certbot on your VM to renew the certificates before they expire.

### Paid option

Certificates issues via your domain registrar or via a CA are paid, they usually have longer validity, may include warranty/support, and often allow more customisation like organisation validation.

## Free shit

The most documented, hence the most easy way is to use the combination of [nginx](https://nginx.org) and [certbot.](https://certbot.eff.org)

### Virtual server/machine

You obviously need to have a virtual machine/server with access to the terminal via ssh for example or local-like access provided by the hosting provider. In the vast majority of the cases the console provided by the hosting provider will be almost impossible to use for it'll be web-based clumsy application. There are gems maybe, but I did not see any.

When accessing the remote via SSH, please consider using [RSA keys](./ssh-rsa/), changing the standard SSH port (22) to something that does not look like 22, just for security purposes.

### Domain

Yes, you need a domain name. Something like this one `cheshimantu.lol` (don't ask what does that mean, 'cause it doesn't). Get one from the trustworthy registrar. If you want to go cheap, go to https:\//namecheap.com, it's really cheap. It provides all standard registrar services and additional services like paid SSL certificates.

Namecheap have pretty well documented everything they sell, so you won't be lost. Their support is also great and they would help you very fast and in a professional manner. If this is your first time and you have doubts, then ask support first, consulting is cheaper than troubleshooting.

### Insall