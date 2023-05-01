from rest_framework.viewsets import ModelViewSet
from core.models import Product, Collection
from .serializers import ProductSerializer, CollectionSerializer
from django.db.models import Q

class ProductApiViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    look_param = 'category'
    def get_queryset(self):
        category = self.kwargs.get(self.look_param)
        if category=='all':
            queryset = Product.objects.all()
        elif category == 'featured':
            queryset = Product.objects.filter(featured=True)
        else:
            queryset = Product.objects.filter(category=category)
        return queryset

class CollectionApiVIewSet(ModelViewSet):
    serializer_class = CollectionSerializer
    queryset = Collection.objects.all()

class SingleProductApiViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    look_param = 'id'
    def get_queryset(self):
        product = self.kwargs.get(self.look_param)
        queryset = Product.objects.filter(id=product)
        return queryset

class CartApiViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.filter(cart=True)


class QueryViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        search_value = self.request.query_params.get('search', '')
        if search_value:
            queryset = queryset.filter(Q(name__icontains=search_value) | Q(description__icontains=search_value))
        return queryset
