from fastapi import FastAPI

app = FastAPI()


@app.get("/api/python")
def hello_world() -> dict[str, str]:
    return {"message": "Hello World"}
