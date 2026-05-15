import json

def merge_json(file1, file2, output_file):
    try:
        with open(file1, 'r', encoding='utf-8') as f1:
            data1 = json.load(f1)
        with open(file2, 'r', encoding='utf-8') as f2:
            data2 = json.load(f2)
        
        # Merge dictionaries: data2 updates data1
        # For locks, we might want to keep the one with more information or newer timestamp
        # For simplicity, we merge them and let the last one win for duplicate keys
        merged = {**data2, **data1} # Local priority if we want, or vice versa
        # Actually, let's do a smarter merge for identical keys
        for key in data2:
            if key in data1:
                # If both have it, maybe keep the one that is 'finalized'
                if data2[key].get('finalized') and not data1[key].get('finalized'):
                    merged[key] = data2[key]
                elif data1[key].get('finalized') and not data2[key].get('finalized'):
                    merged[key] = data1[key]
                else:
                    # Otherwise keep the one with the later locked_at if possible
                    merged[key] = data1[key] # Default to local
            else:
                merged[key] = data2[key]

        with open(output_file, 'w', encoding='utf-8') as out:
            json.dump(merged, out, indent=2, ensure_ascii=False)
        print(f"Successfully merged into {output_file}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    merge_json('ours.json', 'theirs.json', 'Excel/qc_locks.json')
