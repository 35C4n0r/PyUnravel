PyUnravel
==============

Description
---------------

`PyUnravel` is a tool that allows you to visualize the dependencies between Python modules or packages in your project.
It generates an interactive graph representation of the dependencies, helping you understand the structure of your code
and identify any potential issues or circular dependencies.


Deployment
-------------------

`pipgrip` library is the core of this project, and it uses multiprocessing queues to resolve dependencies.
Unfortunately because of this I wasn't able to host my backend anywhere, as none of the free hosting platforms supports multithreading.
This is the deployment link for the frontend, **just click the `Unravel` button with or without the file, and it will fetch dummy data from backend,
this is just for displaying purposes**.


Deployment url with dummy data in backend: https://pyunravel.vercel.app/


Alternatively you can run it locally without much hassle using below given instructions::

    cd backend
    pip install -r requirements.txt
    python run.py

In a new terminal::

    cd frontend
    npm i
    npm run dev


Acknowledgments
---------------

This tool is built using the following open-source libraries:

- `FastAPI`: https://github.com/tiangolo/fastapi
- `NEXT`: https://github.com/vercel/next.js
- `Pipgrip`: https://github.com/ddelange/pipgrip
- `TailwindCSS`: https://github.com/tailwindlabs/tailwindcss
- `DaisyUI`: https://github.com/saadeghi/daisyui

Special thanks to the contributors and maintainers of these libraries for their valuable work.


Contact
-------

If you have any questions or inquiries, feel free to contact me at `jaykumar20march@gmail.com`.

Thank you for using the PyUnravel! Happy Unraveling!





