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
        new_message = "Request made - No message applied to response."
        new_data = None

        if original_data:
            #We can't use the original data as "data" if status or message is in it 
            can_use_original_data = True

            #Get status from data
            if "status" in original_data:
                new_status = original_data["status"]
                can_use_original_data = False
            else:
                new_status = get_status_from_code(response.status_code)

            #Get message from data
            if "message" in original_data:
                new_message = original_data["message"]
                can_use_original_data = False
            else:
                new_message = get_generic_message_from_status(new_status)

            #Get data (original_data has data, status and message - we just want data)
            if "data" in original_data:
                new_data = original_data["data"]
            else:
                new_data = original_data if can_use_original_data else None
        else:
            new_status = get_status_from_code(response.status_code)
            new_message = get_generic_message_from_status(new_status)

        new_status = validate_status(new_status)

        standardized_response = {"status": new_status.lower(), "message": new_message, "data": new_data}

        if not matches_requested_status(new_status, RequestStatus.SUCCESS):
            print(f'{response.status_code} {standardized_response["status"]}: {standardized_response['message']}')

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
            try:
                # If the direct match fails, try converting to int and then matching
                status_enum = get_request_status_from_int(int(status_to_validate))
            except ValueError:
                pass

    elif isinstance(status_to_validate, int):
        status_enum = get_request_status_from_int(status_to_validate)
    
    return status_enum.name

def get_request_status_from_int(status_int):
    status_enum = RequestStatus.WARNING

    for status in RequestStatus:
        if int(status.value) == status_int:
            status_enum = status
            break

    return status_enum

def matches_requested_status(status_variable, requested_status):
    """
    Checks if the provided status_variable matches the requested_status.
    """
    # First, validate and standardize the status_variable to ensure it's a RequestStatus enum.
    validated_status = validate_status(status_variable)
    
    # Convert validated_status to a RequestStatus enum if it's not already one.
    if isinstance(validated_status, str):
        validated_status_enum = RequestStatus[validated_status]
    else:
        validated_status_enum = validated_status
    
    # Now compare the standardized status with the requested_status.
    return validated_status_enum == requested_status
