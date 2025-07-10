from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import importlib.util
import sys
import os
from pathlib import Path

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ExecuteRequest(BaseModel):
    filename: str
    parameters: dict = {}

@app.post("/execute/{project_id}")
async def execute_project(project_id: str, request: ExecuteRequest):
    try:
        # Get the absolute path to the script
        script_path = Path(__file__).parent / request.filename
        
        if not script_path.exists():
            raise HTTPException(status_code=404, detail=f"Script {request.filename} not found")

        # Import the script as a module
        spec = importlib.util.spec_from_file_location(project_id, str(script_path))
        if spec is None or spec.loader is None:
            raise HTTPException(status_code=500, detail="Failed to load script specification")
            
        module = importlib.util.module_from_spec(spec)
        sys.modules[project_id] = module
        spec.loader.exec_module(module)

        # Execute the main function if it exists
        if hasattr(module, 'main'):
            result = module.main(**request.parameters)
            return {"success": True, "result": result}
        else:
            raise HTTPException(status_code=500, detail="Script does not have a main function")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 