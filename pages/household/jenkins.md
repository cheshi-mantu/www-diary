---
title: jenkins
layout: doc
prev: false
next: false
editLink: false
lastUpdated: false
---

# Jenkins

Is simple automation tool. Sometimes too simple. It is written in Java.

There is no proper python support, the plugin is either deprecated or abandoned.

## Adding python support to Jenkins

### We need

1. Base Jenkins or Jenkins inbound agent image.
2. docker or something that replaces docker installed, 
   - e.g. OrbStack which I personally prefer to have on the local machine.
3. Text editor
4. Terminal

### Docker file

Yes, we are going to build our image with python ;).

In some folder create Dockerfile file. This is a text file called Dockerfile.

Create summat like this:

If we are going to use Jenkins inbound agent (recommended by the developers), then this.

```dockerfile
FROM jenkins/inbound-agent:latest
USER root
RUN apt-get update && apt-get upgrade -y && apt-get install -y python3 python3-pip && apt-get install -y rsync
RUN pip install --break-system-packages pytest allure-pytest
USER jenkins
```

What we've just done:

- we've taken the image Jenkins team builds.
- we've added new layers to the image
  - with python3 and pytest and allure-pytest
  - we use allure for the reporting so I've just added libs to the image and now there is no need to install in the runtime.

That's basically it.

Now, we need to build the image

### Building the image

In the terminal you need to be in the same folder, where you've created the `Dockerfile`.

Run bloody command:

```shell
docker build -t jenkins-agent:202512 .
```
Space and dot at the end are required, this is not a typo. Dot means current directory.

