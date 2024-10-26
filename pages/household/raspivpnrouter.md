---
layout: doc
title: use Raspberry Pi as VPN router for TV
---

# Using Raspberry Pi as VPN router

## Motivation

We need TV to work not in the local country but be visible as if it's working from another country to overcome certain restrictions.

## What we need

1. Raspberry Pi or Orange Pi or basically any micro-computer with Linux installed.
    * I used Raspberry Pi ver 4 with Gbytes of RAM and Raspbian 64 bits without GUI.
2. Ethernet USB Dongle.
   * Raspberry has only one Ethernet port, so we need to use external Ethernet adaptor. Pi has 4 USB ports so we are safe here.
3. Router with Ethernet ports.
   * You need to understand what is the IP address you router provides to the connected devices for easier identification of the Ethernet network adaptors in the next steps.
   * Login to your router, find DHCP setting and find something like Start IP address in the DHCP settings.
     * in my case that was 192.168.0.10, this means Raspberry Pi will get something like **192.168.0.XXX**, where XXX is something more or equal to 10.
4. 2 Ethernet cables
   * 1 for TV <> Raspberry Pi
   * 2 for Raspberry Pi <> Router
   * yes, yes we can use Wi-Fi for that, but we won't. Still it'll work the same way.
5. VPN provider (you can be one, or you can buy some that supports TUN).
   1. I'll use OpenVPN client with ProtonVPN VPN profiles.

## Target solution diagram

![](/public/raspi-as-vpn.png)

Raspberry Pi is going to wrap our TV's traffic into VPN connection and forbid the direct internet traffic from/to TV.

## Let's get crackin'

### Get all the stuff together

1. Install the OS to Raspberry Pi (use [their tool](https://www.raspberrypi.com/software/) for installing the OS).
2. Connect all the wires as per the image above.
3. Login to Raspberry Pi and start the configuration.

### Gather the names of the Ethernet network cards

The names provided in the picture above can be different from those you have in reality.

There is standard command in Linux OS `ifconfig` that provides the information on the network devices installed in your device. Or mode modern they say `ip`

Let's use ifconfig.

```shell
ifconfig | grep -B 1 -A 1 '192.168.0'
```

Where `| grep -B 1 -A 1 '192.168.0'` allows us filtering the output based on `192.168.0` and outputs 1 line before the match and 1 line after the match.

the output will be something like

```shell
enx000ec6aceaf9: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.0.21  netmask 255.255.255.0  broadcast 192.168.0.255
        inet6 fe80::20e:c6ff:feac:eaf9  prefixlen 64  scopeid 0x20<link>
```

This means Raspberry Pi got the IP address 192.168.0.21 from my router, and the device that is used to connect Raspberry Pi to the router is **enx000ec6aceaf9**.


WIP 2024-10-27