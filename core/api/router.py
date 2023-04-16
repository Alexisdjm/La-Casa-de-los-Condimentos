from rest_framework.routers import DefaultRouter
from .views import ProductApiViewSet, CollectionApiVIewSet, SingleProductApiViewSet, CartApiViewSet

router = DefaultRouter()

router.register(prefix=r'products/(?P<category>.*)', basename='products', viewset=ProductApiViewSet)
router.register(prefix=r'item/(?P<id>.*)', basename='item', viewset=SingleProductApiViewSet)
router.register(prefix='collections', basename='collections', viewset=CollectionApiVIewSet)
router.register(prefix='cart', basename='cart', viewset=CartApiViewSet)

