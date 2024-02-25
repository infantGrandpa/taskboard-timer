import json
import sys

def increment_count(current_count):
    new_count = current_count + 1
    print(json.dumps({"count": new_count}))

if __name__ == "__main__":
    current_count = int(sys.argv[1])
    increment_count(current_count)
