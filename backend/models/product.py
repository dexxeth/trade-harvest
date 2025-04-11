from pydantic import BaseModel
from typing import List

class Product(BaseModel):
    name: str
    category: str
    description: str
    quantity: int
    price: float
    state: str
    city: str
    image_names: List[str]
