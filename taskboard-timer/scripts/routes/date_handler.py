from datetime import datetime


def strip_time_from_datetime(datetime_to_strip):
    date_str, _ = datetime_to_strip.split('T')

    stripped_date = datetime.strptime(date_str, '%Y-%m-%d').date()

    return stripped_date
