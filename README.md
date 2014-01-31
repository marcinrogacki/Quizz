Magento Quiz
============

# Installing

1. Check if system detects USB Buzzers

```
> usb-devices
T:  Bus=02 Lev=02 Prnt=02 Port=01 Cnt=01 Dev#=  4 Spd=1.5 MxCh= 0
D:  Ver= 2.00 Cls=00(>ifc ) Sub=00 Prot=00 MxPS= 8 #Cfgs=  1
P:  Vendor=054c ProdID=0002 Rev=11.01
S:  Manufacturer=Logitech
S:  Product=Logitech Buzz(tm) Controller V1
C:  #Ifs= 1 Cfg#= 1 Atr=80 MxPwr=100mA
I:  If#= 0 Alt= 0 #EPs= 1 Cls=03(HID  ) Sub=00 Prot=00 Driver=usbhid
```

2. Install Node.JS and NPM/git

```
> sudo apt-get install nodejs npm git
```

3. Install libusb libraries
```
> sudo apt-get install libusb-dev libusb-1.0-0-dev
```

4. Clone quiz repository and install dependencies

```
> cd /var
> git clone https://github.com/NexwayGroup/Quizz.git quiz
> cd quiz/
> npm install socket.io node-hid
```

5. Test if everything works

```
> sudo nodejs show-devices.js 
devices: [{
    vendorId:     1356,
    productId:    2,
    path:         '0002:0004:00',
    manufacturer: 'Logitech',
    product:      'Logitech Buzz(tm) Controller V1',
    release:      4353,
    interface:    0 
}]
```

6. Execute quiz and play!

```
> sudo nodejs quiz-server.js
```
