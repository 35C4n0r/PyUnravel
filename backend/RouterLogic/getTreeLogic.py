import subprocess
import tempfile

from fastapi import UploadFile


async def getTreeLogic(file: UploadFile):
    data = await file.read()
    data_str = data.decode()
    lines = data_str.splitlines()
    unprocessed_deps_tree = get_pipgrip_output(lines)
    edges = []
    nodes = {}
    return {
        "success": True,
        "nodes": unprocessed_deps_tree,
        "edges": edges
    }


def get_pipgrip_output(lines):
    arg = ['pipgrip', '--tree', '--json']
    for line in lines:
        line = line.strip("\n")
        arg.append(line)
    result = subprocess.run(arg, stdout=subprocess.PIPE)
    return result.stdout.decode('utf-8')
