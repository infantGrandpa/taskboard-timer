from flask import jsonify

def standardize_api_response(app):

    @app.after_request
    def after_request(response):

        print (response)
        # Error, return normal
        if response.status_code < 200 or response.status_code >= 300:
            return response

        # Wrap successful responses
        original_data = response.get_json()

        standardized_response = jsonify({
            "status": "success",
            "data": original_data,
            "message": "Request successful"
        })
        standardized_response.status_code = response.status_code

        return standardized_response

