PyUnravel Backend
=============================

Overview
----------------------------
The backend is built using FastAPI, a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints.

FastAPI takes in a POST request at the `/unravel` endpoint, which should contain a `requirements.txt` file. This file is then passed to `getTreeLogic()` function, a utility that I developed to generate the dependency tree. This function leverages `pipgrip`, a lightweight pip dependency resolver with deptree preview feature that fetches package metadata from PyPI. `pipgrip` returns a list of dependencies which are then parsed and formatted into a format suitable for our visualization in the frontend.

One of the lessons I learned while building the backend was the significance of asynchronous programming in Python. FastAPI supports asynchronous request handling, which means it can handle multiple requests simultaneously using a single process. This feature is incredibly valuable for improving the performance of I/O-bound applications.


Challenges
----------------------------
One of the most challenging aspects of building the backend was handling the multithreading aspect of `pipgrip`. The package uses multiprocessing Queues to resolve dependencies which caused some issues when trying to deploy the backend on free hosting platforms that didn't support multithreading.


For CORS handling, I used the Starlette middleware. Starlette is a lightweight ASGI framework/toolkit, which is ideal for building high-performance asyncio services. It provided an easy and efficient way to manage Cross-Origin Resource Sharing (CORS) and ensure that the frontend could interact with the backend without any issues.