import requests
from sys import stdout

API_URL = "https://t245epj8wl.execute-api.eu-north-1.amazonaws.com/api/1"
AUTH_TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc3MjA5MTA0Y2NkODkwYTVhZWRkNjczM2UwMjUyZjU0ZTg4MmYxM2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiOTU5ODkyNTEyMzE0LXVtamM1ZnZoN3U0aDN1ZHMwNWFjdWpqbXEwOTRhdXAxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiOTU5ODkyNTEyMzE0LXVtamM1ZnZoN3U0aDN1ZHMwNWFjdWpqbXEwOTRhdXAxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTExNTE3NTMzOTcwNzk4NDI1MjU2IiwiaGQiOiJlbmdpbnp5bWUuY29tIiwiZW1haWwiOiJ0b2JpQGVuZ2luenltZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkFYUHFHMEp6R09DNFlOMTFmRDB1YVEiLCJuYW1lIjoiVG9iaSBPZ3VuYmF5byIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHaFlSeUhmN2g0Z0ZNUzk1TDdYdy1HNm9ELWJEZ1BhWkNTQ3hmaGQ9czk2LWMiLCJnaXZlbl9uYW1lIjoiVG9iaSIsImZhbWlseV9uYW1lIjoiT2d1bmJheW8iLCJsb2NhbGUiOiJlbiIsImlhdCI6MTYxOTc4ODg2OCwiZXhwIjoxNjE5NzkyNDY4LCJqdGkiOiIyMjM1NzMwZmZhYmEyMmFiMmUwMjc0YjUxMzZhYTRmNDc0YWJjMmUwIn0.P1mQj2_7FmSEDLRyKCVVLIWe4SsckF2yXAERndLb46fjSLrUGKdDSSU6H92324fmTraPOyhbfoqGkgYJlxR-JkzETcpL_VNps42lbWPGiIj0LqKtuZ6Z4aHs54wmAb3MDUkSDXe4kPv-i8T79TgjPagIvJti0JXIwBqFFcbBmCxnK7pyiLQxkX1MAcjEoIbPq--ZKQTusPhDGc8n7NMG1MNhlOxkk6EOfsjNPuAsmIBLVGcNcXwUOxzAfJqn5iJY1l1YcRBKubijQtf5ffeI0YVBckwt8iWch90YCrU28l6StXjHEAuQXHI_wN_9syu5M4A105ow3RfRDvpsABlPyg"


def migration_procedure(migration_func):
    print("Fetching all created protocols...")
    response = requests.get(f"{API_URL}/protocol/",
                            headers={"Authorization": AUTH_TOKEN})

    if response.status_code == 200:
        print("Fetched all created protocols successfully")

    else:
        print(
            f"Failed to fetch created protocols. Error {response.status_code}")
        return

    print("Attempting to migrate fetched protocols...")
    protocol_objects = response.json()
    for i in range(len(protocol_objects)):
        migration_func(protocol_objects[i])
        stdout.write(f"\r{i+1}/{len(protocol_objects)} migrated")
        stdout.flush()
    print("\nMigrated fetched protocols successfully")

    print("Attempting to sync migrated protocols...")
    counter = 0
    for protocol_object in protocol_objects:
        response = requests.put(f'{API_URL}/protocol/{protocol_object["id"]}',
                                json=protocol_object,
                                headers={"Authorization": AUTH_TOKEN})

        if response.status_code == 201:
            counter += 1
            stdout.write(f"\r{counter}/{len(protocol_objects)} synced")
            stdout.flush()
        else:
            print(
                f"\nFailed to sync migrated protocol with id: {protocol_object['id']}. Error {response.status_code}",
                response.text)

    print(
        f"\nSynced {counter}/{len(protocol_objects)} migrated protocols successfully"
    )


if __name__ == "__main__":
    migration_procedure()
