from supabase_client import supabase
from models.product import Product

def insert_product(product: Product):
    data = {
        "name": product.name,
        "category": product.category,
        "description": product.description,
        "quantity": product.quantity,
        "price": product.price,
        "state": product.state,
        "city": product.city,
        "images": product.image_names,
    }
    return supabase.table("products").insert(data).execute()
