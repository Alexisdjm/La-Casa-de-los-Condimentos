from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, StringRelatedField
from core.models import Product, Collection

class ProductSerializer(ModelSerializer):

    image = serializers.ImageField(
        max_length=None, allow_empty_file=False, allow_null=True, use_url=True, required=False)
    class Meta:
        model = Product
        fields = ['id','name','price','description','available','featured','image','category']

class CollectionSerializer(ModelSerializer):
    collection_products = ProductSerializer(many=True)
    class Meta:
        model = Collection
        fields = ['id','title','discount_percent', 'featured', 'collection_products']

