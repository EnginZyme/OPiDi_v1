"""
Migrates preceeding protocols via carrying out the following steps:
> Update the value "labware_type" attribute of slot objects whose "labware_id" attribute has a value
  among the following:
  - 2.0ml_eppendorfs_on_al_rack_on_3000t
  - 24_tuberack_2ml_on_3000t
  - brand_96_vis_wellplate_0.3ml_on_3000t
  - ez_96_glass_tube_on_3000t
  - vwr_96_wellplate_2.0ml_on_3000t
"""

from protocol_migration_procedure import migration_procedure


def update_shaker_labware_type(obj):
    shaker_labware_ids = [
        "2.0ml_eppendorfs_on_al_rack_on_3000t", "24_tuberack_2ml_on_3000t",
        "brand_96_vis_wellplate_0.3ml_on_3000t", "ez_96_glass_tube_on_3000t",
        "vwr_96_wellplate_2.0ml_on_3000t"
    ]
    for key in obj["protocol"]["deck"]["slots"].keys():
        if "labware_id" in obj["protocol"]["deck"]["slots"][key].keys(
        ) and obj["protocol"]["deck"]["slots"][key][
                "labware_id"] in shaker_labware_ids:
            obj["protocol"]["deck"]["slots"][key][
                "labware_type"] = "shakerLabware"


def migrate_protocol_object(obj):
    update_shaker_labware_type(obj)


if __name__ == "__main__":
    migration_procedure(migrate_protocol_object)
