from fastapi import APIRouter, HTTPException
from models.product import Product
from services.product_service import insert_product

router = APIRouter()

@router.post("/upload_product")
def upload_product(product: Product):
    try:
        response = insert_product(product)
        return {"message": "Product uploaded", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
