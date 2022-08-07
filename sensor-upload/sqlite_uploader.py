# https://www.sqlitetutorial.net/sqlite-python/insert/

import sqlite3
from sqlite3 import Error

from datetime import timezone
import datetime

import os

def time_utc():
    # Getting the current date
    # and time
    dt = datetime.datetime.now(timezone.utc)
    utc_time = dt.replace(tzinfo=timezone.utc)
    return utc_time.timestamp() * 1000

def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return conn

def create_sensor_value(conn, sensor_value):
    """
    Create a new project into the projects table
    :param conn:
    :param project:
    :return: project id
    """
    sql = ''' INSERT INTO sensor_values(sensor_name,sensor_value,time_utc)
              VALUES(?,?,?) '''
    cur = conn.cursor()
    print(sensor_value)
    sensor_data_point = ('sensor23', int(sensor_value), int(time_utc()));
    cur.execute(sql, sensor_data_point)
    conn.commit()

def main():
    #database = "./pythonsqlite.db"
    cwd = os.getcwd()
    database = os.path.join(cwd, '../../database/database.sqlite3')
    # create a database connection
    conn = create_connection(database)
    with conn:
        # test upload
        sensor = ('sensor23', 200, 1232323312);
        create_sensor_value(conn, sensor)

if __name__ == '__main__':
    main()