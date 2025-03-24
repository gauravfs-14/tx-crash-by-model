import csv
import json

input_file = './data/TX_byVehicleModelY_CY1.csv'
output_file = './data/crash-data.json'

data = []

with open(input_file, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        data.append({
            "Veh_Make_ID": row["Veh_Make_ID"],
            "Veh_Mod_ID": row["Veh_Mod_ID"],
            "Veh_Mod_Year": int(row["Veh_Mod_Year"]) if row["Veh_Mod_Year"].isdigit() else None,
            "CrashYear": int(row["CrashYear"]) if row["CrashYear"].isdigit() else None,
            "crash_count": int(row["crash_count"]) if row["crash_count"].isdigit() else 0
        })

with open(output_file, 'w', encoding='utf-8') as jsonfile:
    json.dump(data, jsonfile, indent=2)

print(f"✅ JSON file created: {output_file}")
