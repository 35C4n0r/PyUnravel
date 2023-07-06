from fastapi import FastAPI, UploadFile
from starlette.middleware.cors import CORSMiddleware

from RouterLogic.getTreeLogic import getTreeLogic

tags_metadata = [
    {
        "name": "Create"
    }
]

app = FastAPI(openapi_tags=tags_metadata)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Sanity Checks Passed :)"}


@app.post("/unravel")
async def say_hello(file: UploadFile):
    response = await getTreeLogic(file=file)
    return response
