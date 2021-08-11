import requests

ROBOT_IP = "192.168.100.244"

endpoint = 'http://{ROBOT_IP}:31950/server/name'
newname = "OT-06 Vulcan"

print(endpoint.format(ROBOT_IP=ROBOT_IP))

r = requests.get(endpoint.format(ROBOT_IP=ROBOT_IP))

print(r.content)

r = requests.post(endpoint.format(ROBOT_IP=ROBOT_IP), json={"name": newname})

print(r.content)
