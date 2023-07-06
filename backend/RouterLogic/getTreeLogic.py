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
    parse_data(tree=unprocessed_deps_tree, nodes=nodes, edges=edges, depth=0, node_id=0)
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


def parse_data(tree, nodes, edges, depth, node_id, parent=None):
    for req in tree:
        node_name = f"{req['name']}-{req['version']}"
        if node_name not in nodes:
            if parent is not None:
                nodes[node_name] = [node_id, depth + 1]
            else:
                nodes[node_name] = [node_id, depth]
            node_id += 1
        parse_data(tree=req.get('dependencies', []), nodes=nodes, edges=edges, parent=nodes[node_name], node_id=node_id,
                   depth=depth + 1)
        if parent is not None:
            edges.append({
                'from': parent[0],
                'to': nodes[node_name][0]
            })
        else:
            edges.append({
                'from': 0,
                'to': nodes[node_name][0]
            })
