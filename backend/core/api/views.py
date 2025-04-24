from .serializers import ProductSerializer, CollectionSerializer
from django.contrib.sessions.backends.db import SessionStore
from rest_framework.viewsets import ModelViewSet
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from core.models import Product, Collection
from django.http import JsonResponse
from django.core import serializers
from rest_framework import status
from django.conf import settings
from django.db.models import Q
from django.db.models.functions import Lower
from unidecode import unidecode
from django.contrib.sessions.models import Session

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
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response({"detail": "No se encontraron productos."})
        serializer = self.get_serializer(queryset, many=True)
        sessions = Session.objects.all()
        print("Cookies recibidas:", request.COOKIES)
        print("🔍 SESIONES ACTIVAS EN LA BD:")
        for s in sessions:
            print(f"→ SessionKey: {s.session_key} | Datos:", s.get_decoded())
        return Response(serializer.data)

class CartApiViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def get_session(self, request, *args, **kwargs):
        session_key = request.session.session_key
        if not session_key:
            request.session.save()
            session_key = request.session.session_key
        return SessionStore(session_key)

    def list(self, request, *args, **kwargs):
        session = self.get_session(request)
        cart = session.get('cart', {}) 
        return Response({ 'cart': cart, 'session key': session.session_key })
        # for product_id, product in cart.items():
        #     return Response({ 'cart': cart, 'session key': session.session_key })

    def create(self, request, *args, **kwargs):
        session = self.get_session(request)
        cart = session.get('cart', {})
        product_id = request.data.get('product_id')
        cantidad = request.data.get('cantidad')
        medida = request.data.get('medida')

        product = get_object_or_404(Product, id=product_id)

        if product_id not in cart:
            cart[str(product_id)] = {
                'id': product.id, 
                'name': product.name, 
                'description': product.description, 
                'cantidad': cantidad,
                'medida': medida,
                'image': request.build_absolute_uri(settings.MEDIA_URL + str(product.image))
                }
            request.session['cart'] = cart
        
        return Response({'cart': cart})

    def destroy(self, request, *args, **kwargs):
        session = self.get_session(request)
        cart = session.get('cart', {})
        product_id = kwargs.get('pk', None)
        if product_id in cart:
            del cart[product_id]
            request.session['cart'] = cart
        return Response({'cart': cart})

class QueryViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        search_value = self.request.query_params.get('search', '')
        if search_value:
            queryset = queryset.filter(Q(name__icontains=search_value))
        return queryset
