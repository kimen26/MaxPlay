"""Export all recipes/test_*.py as a JSON consumable by tile-picker.html.

Output: tile-tools/recipes_data.js with window.RECIPES = { 'name.py': {...}, ... }

Each recipe must define a SNIPPET dict {name, cols, rows, ground, objects}.
"""
import os
import sys
import json
import importlib.util


def load_recipe(path: str) -> dict | None:
    try:
        spec = importlib.util.spec_from_file_location("recipe", path)
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        snippet = getattr(mod, 'SNIPPET', None)
        if not snippet:
            return None
        return {
            'name': snippet.get('name', ''),
            'cols': snippet.get('cols', 0),
            'rows': snippet.get('rows', 0),
            'ground': snippet.get('ground', []),
            'objects': snippet.get('objects', []),
        }
    except Exception as e:
        print(f"[skip] {os.path.basename(path)}: {e}", file=sys.stderr)
        return None


def main() -> None:
    recipes_dir = os.path.join(os.path.dirname(__file__), '..', 'recipes')
    recipes_dir = os.path.abspath(recipes_dir)
    output = os.path.join(os.path.dirname(__file__), '..', 'recipes_data.js')
    output = os.path.abspath(output)

    data = {}
    for fname in sorted(os.listdir(recipes_dir)):
        if not fname.startswith('test_') or not fname.endswith('.py'):
            continue
        path = os.path.join(recipes_dir, fname)
        recipe = load_recipe(path)
        if recipe:
            data[fname] = recipe

    with open(output, 'w', encoding='utf-8') as f:
        f.write('window.RECIPES = ')
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write(';\n')

    print(f"OK -> {output}")
    print(f"  {len(data)} recipes exported")


if __name__ == '__main__':
    main()
