"""
A simple example of sending data from 1 nRF24L01 transceiver to another.
This example was written to be used on 2 devices acting as 'nodes'.
"""
import sys
import time
import struct
from RF24 import RF24, RF24_PA_LOW

import os

import sqlite_uploader

########### USER CONFIGURATION ###########
# See https://github.com/TMRh20/RF24/blob/master/pyRF24/readme.md
# Radio CE Pin, CSN Pin, SPI Speed
# CE Pin uses GPIO number with BCM and SPIDEV drivers, other platforms use
# their own pin numbering
# CS Pin addresses the SPI bus number at /dev/spidev<a>.<b>
# ie: RF24 radio(<ce_pin>, <a>*10+<b>); spidev1.0 is 10, spidev1.1 is 11 etc..

# Generic:
radio = RF24(22, 0)
################## Linux (BBB,x86,etc) #########################
# See http://nRF24.github.io/RF24/pages.html for more information on usage
# See http://iotdk.intel.com/docs/master/mraa/ for more information on MRAA
# See https://www.kernel.org/doc/Documentation/spi/spidev for more
# information on SPIDEV

# using the python keyword global is bad practice. Instead we'll use a 1 item
# list to store our float number for the payloads sent/received
payload = [0.0]

def create_db_connection():
    cwd = os.getcwd()
    database = os.path.join(cwd, '../database/database.sqlite3')
    # create a database connection
    return sqlite_uploader.create_connection(database)

def slave(timeout=6):
    """Listen for any payloads and print the transaction

    :param int timeout: The number of seconds to wait (with no transmission)
        until exiting function.
    """
    db_connection = create_db_connection()

    radio.startListening()  # put radio in RX mode


    start_timer = time.monotonic()
    while (time.monotonic() - start_timer) < timeout:
        has_payload, pipe_number = radio.available_pipe()
        if has_payload:
            # fetch 1 payload from RX FIFO
            buffer = radio.read(radio.payloadSize)
            # use struct.unpack() to convert the buffer into usable data
            # expecting a little endian float, thus the format string "<f"
            # buffer[:4] truncates padded 0s in case payloadSize was not set
            payload[0] = struct.unpack("<f", buffer[:4])[0]
            # print details about the received packet
            print(
                f"Received {radio.payloadSize} bytes",
                f"on pipe {pipe_number}: {payload[0]}",
            )
            sqlite_uploader.create_sensor_value(db_connection, payload[0])
            start_timer = time.monotonic()  # reset the timeout timer

    print("Nothing received in", timeout, "seconds. Leaving RX role")
    # recommended behavior is to keep in TX mode while idle
    radio.stopListening()  # put the radio in TX mode


if __name__ == "__main__":

    # initialize the nRF24L01 on the spi bus
    if not radio.begin():
        raise RuntimeError("radio hardware is not responding")

    # An address need to be a buffer protocol object (bytearray)
    address = b"2Node"
    # It is very helpful to think of an address as a path instead of as
    # an identifying device destination

    # set the Power Amplifier level to -12 dBm since this test example is
    # usually run with nRF24L01 transceivers in close proximity of each other
    radio.setPALevel(RF24_PA_LOW) # RF24_PA_MAX is default

    # set the RX address of the TX node into a RX pipe
    radio.openReadingPipe(1, address)  # using pipe 1

    # To save time during transmission, we'll set the payload size to be only
    # what we need. A float value occupies 4 bytes in memory using
    # struct.pack(); "f" means an unsigned float
    radio.payloadSize = struct.calcsize("f")

    # for debugging, we have 2 options that print a large block of details
    # (smaller) function that prints raw register values
    # radio.printDetails()
    # (larger) function that prints human readable data
    # radio.printPrettyDetails()

    try:
        slave()
    except KeyboardInterrupt:
        print(" Keyboard Interrupt detected. Powering down radio.")
        radio.powerDown()
