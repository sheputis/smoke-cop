An arduino will be used to send smoke-sensor data to the raspberry-pi using
nrf24l01 sensors. Firstly, to test the connection, the following .ino script is
used on the arduino uno https://github.com/nRF24/RF24/blob/master/examples/GettingStarted/GettingStarted.ino.
And on the raspberry-pi, install the following drive https://github.com/nRF24/RF24
for the nrf24l01 sensor.
Now run the GettingStarted.ino script on Arduino and the rf24libs/RF24/examples_linux/getting_started.py
on raspberry-pi to test the connection.
