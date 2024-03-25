from flask import jsonify
from enum import Enum, auto

class RequestStatus(str, Enum):
    SUCCESS = auto()
    ERROR = auto()
    INFO = auto()
    WARNING = auto()

    def to_dict(self):
        return self.name

def standardize_api_response(app):

    @app.after_request
    def after_request(response):
        
        # get original data
        try:
            original_data = response.get_json()
        except:
            original_data = None

        new_status = RequestStatus.WARNING
        new_message = ""
        new_data = ""

        if original_data:
            #Get status from data
            if "status" in original_data:
                new_status = original_data["status"]
            else:
                new_status = get_status_from_code(response.status_code)

            #Get message from data
            if "message" in original_data:
                new_message = original_data["message"]
            else:
                new_message = get_generic_message_from_status(new_status)

            new_data = original_data
        else:
            new_status = get_status_from_code(response.status_code)
            new_message = get_generic_message_from_status(new_status)

        new_status = validate_status(new_status)

        standardized_response = {"status": new_status, "message": new_message, "data": new_data}

        # print(f'{response.status_code} {standardized_response["status"]}: {standardized_response['message']}')

        return jsonify(standardized_response)


def get_status_from_code(status_code):
    if status_code >= 200 and status_code < 300:
        return RequestStatus.SUCCESS
    else:
        return RequestStatus.ERROR

def get_generic_message_from_status(status):
    match status:
        case RequestStatus.SUCCESS:
            return "Request successful."
        case RequestStatus.ERROR:
            return "An unknown error occured."
        case RequestStatus.INFO:
            return "Request successful. Additional information missing."
        case RequestStatus.WARNING:
            return "Request successful with unknown warning."
        case _:
            return "Status of request unknown."
        
def validate_status(status_to_validate):
    
    status_enum = RequestStatus.WARNING

    if isinstance(status_to_validate, RequestStatus):
        status_enum = status_to_validate

    elif isinstance(status_to_validate, str):
        try:
            status_enum = RequestStatus[status_to_validate.upper()]        
        except KeyError:
            pass
    
    return status_enum.name
