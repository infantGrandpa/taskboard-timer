from flask import jsonify

def standardize_api_response(app):

    @app.after_request
    def after_request(response):

        standardized_response = {}

        print("response.status_code")
        print(response.status_code)
        # set status
        if response.status_code >= 200 and response.status_code < 300:
            standardized_response["status"] = "success"
        else:
            standardized_response["status"] = "error"

        # get original data
        try:
            original_data = response.get_json()
        except:
            original_data = None

        # set message and original data
        if original_data:
            if "message" in original_data:
                standardized_response["message"] = original_data["message"]
            else:
                # Provide a generic success/error message if none is provided
                if standardized_response["status"] == "success":
                    standardized_response["message"] = "Request successful"
                else:
                    standardized_response["message"] = "An error occurred"

            standardized_response["data"] = original_data

        print(f'{response.status_code} {standardized_response["status"]}: {standardized_response['message']}')

        return jsonify(standardized_response)

