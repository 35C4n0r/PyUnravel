PyUnravel Frontend
=============================


Overview
-----------

This project uses NEXT and vis-network library to visualize dependency trees.

The core of this project is the `DepTree` component which utilizes `vis-network` and `vis-data` libraries to visualize dependency graphs. It has been one of the most enlightening and challenging pieces I've tackled in this project.

The function begins by creating instances of `DataSet` for `nodes` and `edges` which will hold our graph data. These are then populated with data fetched from the Redux store. This data represents our dependency graph where nodes are Python packages and edges represent dependencies between them.

The key part of the `DepTree` function is the creation of a `Network` instance. This is where the magic happens. The `Network` is instantiated with our nodes and edges datasets, along with a configuration object that tweaks the graph's appearance and behavior.

The Physics
-------------

In the configuration object, the `physics` property was particularly interesting to work with. It controls the physics simulation that determines the nodes' layout and their behavior during interactions. I employed the `forceAtlas2Based` solver, a force-directed layout algorithm, that treats edges as springs and nodes as particles with forces of attraction and repulsion between them. The parameters within `forceAtlas2Based` such as `gravitationalConstant`, `centralGravity`, `springLength`, `springConstant`, and `avoidOverlap`, are carefully adjusted to achieve a well-distributed, pleasing, and interactive graph layout.

The code also includes event listeners for "click" and "afterDrawing" events. The "click" event listener is used to change the color of the clicked node and its connected nodes, enhancing the interactive user experience.

The color of the dependencies of the selected package turns `green`.

The color of the package dependent on the selected package turns `red`.


Deployment
------------
The project is deployed on Vercel, as they have out of the box support for NEXT.

One of the aspects that enhanced my understanding of deployment and environment configuration was the use of the `NEXT_PUBLIC_API_HOST` environment variable. This variable holds the API host URL, which is crucial for the frontend to make requests to the backend.

While running the application locally during development, `NEXT_PUBLIC_API_HOST` is set to the localhost server. However, during production deployment, it is updated to point to the hosted backend server.

Incorporating this practice was a valuable lesson for me about the significance of environment management in app development, and it's a strategy I will continue to use in future projects.


Conclusion
------------

This project has allowed me to delve into the `NEXT` and `vis-network` library, learning about network graphs, physics simulations, and event handling within the library. I was able to take raw package data and transform it into a dynamic, interactive graph - a truly rewarding experience.

