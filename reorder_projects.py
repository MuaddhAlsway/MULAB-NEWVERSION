#!/usr/bin/env python3
import re
import json

# Read the file
with open('src/app/data/projects.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the interface and projects array
interface_match = re.search(r'(export interface Project \{.*?\})', content, re.DOTALL)
interface_code = interface_match.group(1) if interface_match else ""

# Find all project objects
project_pattern = r'\{\s*id:\s*\d+,\s*name:\s*[\'"]([^\'"]+)[\'"].*?\}(?=\s*[,\]])'
projects = re.findall(project_pattern, content, re.DOTALL)

print("Found projects:")
for i, proj in enumerate(projects, 1):
    print(f"{i}. {proj[:50]}")

# The reordering should be done manually since project structure is complex
print("\n✅ Script ready. Projects found. You can now manually reorder them.")
