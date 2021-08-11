"""
Migrates preceeding protocols to v1 via carrying out the following steps:
> Add version attribute to protocols and set a default value of 2
"""

from protocol_migration_procedure import migration_procedure


def add_version(obj):
    if "version" not in obj["protocol"]["metadata"].keys():
        obj["protocol"]["metadata"]["version"] = "2"
    elif obj["protocol"]["metadata"]["version"] == None:
        obj["protocol"]["metadata"]["version"] = "2"


def migrate_protocol_object(obj):
    add_version(obj)


if __name__ == "__main__":
    migration_procedure(migrate_protocol_object)
