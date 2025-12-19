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

Looks for the errors, if there is none, then check the creation of the new image:

```shell
docker image ls | grep jenkins
```

You are expecting to see something like this:

```shell
user@server:/opt$ docker image ls | grep jenkins
jenkins-agent                              202512                         c03899654bad   2 minutes ago     707MB
```

Now, we can use it.

### Create a new node on Jenkins side

Agent needs to be registered at Jenkins control node (controller) which is usually a weak machine that does not handle the workload but provides UI and configuration.

1. Go to `/manage/computer/`
2. Create **New node** → Remote root directory `/home/jenkins/agent`
3. Labels is the space separated list of words allowing you to select certain agent based on its capabilities.
   1. I added `python` label to mine.
4. Only build jobs when label expression matching this node.
5. Launch method = Launch agent by connecting it to the controller.
6. Then enter the created agent

What do we need from there?

1. look for `-secret`
2. Look for `-name`
3. Take both values

### Command to run the agent

Update

```shell
docker run -d --name jenkins-agent \
  -e JENKINS_URL="https://real.jenkins.url/" \
  -e JENKINS_AGENT_NAME="just-created-above" \
  -e JENKINS_SECRET=PUT_SECRET_HERE \
  jenkins-agent:202512
```

Then execute the command.

Agent will connect to the controller.

### Using agent in pipelines

To select agent with python you need to use its label in the pipeline as follows:

```groovy
pipeline {
agent {
        label 'python'
    }
// some stuff here

}
```
That's it!
