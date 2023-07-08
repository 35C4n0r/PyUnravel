import json
import subprocess
import tempfile

from fastapi import UploadFile, HTTPException
import pipgrip


async def getTreeLogic(file: UploadFile):
    data = await file.read()
    data_str = data.decode()
    lines = data_str.splitlines()
    unprocessed_deps_tree = get_pipgrip_output(lines)
    unprocessed_deps_tree = json.loads(unprocessed_deps_tree)
    edges = []
    nodes = {}
    parse_data(tree=unprocessed_deps_tree, nodes=nodes, edges=edges, depth=0, node_id=[1])
    nodes, edges = structurize_data(nodes=nodes, edges=edges)
    return {
        "success": True,
        "nodes": nodes,
        "edges": edges
    }


def get_pipgrip_output(lines):
    arg = ['python', '-m', 'pipgrip', '--tree', '--json']
    for line in lines:
        line = line.strip("\n")
        arg.append(line)
    result = subprocess.run(arg, stdout=subprocess.PIPE, shell=True)
    return result.stdout.decode('utf-8')


def parse_data(tree, nodes, edges, depth, node_id, parent=None):
    for req in tree:
        node_name = f"{req['name']}-{req['version']}"
        if node_name not in nodes:
            if parent is not None:
                nodes[node_name] = [node_id[0], depth + 1]
            else:
                nodes[node_name] = [node_id[0], depth]
            node_id[0] += 1
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


def structurize_data(nodes, edges):
    nodes_dup = [{'id': 0, 'label': 'requirements.txt', 'level': 0}]
    for node in nodes:
        nodes_dup.append({
            'id': nodes[node][0],
            'label': node,
            'level': nodes[node][1]
        })
    new_edges = []
    for edge in edges:
        if edge not in new_edges:
            new_edges.append(edge)

    return nodes_dup, new_edges
