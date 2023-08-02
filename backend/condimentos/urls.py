from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from core.api.router import router

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', TemplateView.as_view(template_name='index.html')),
    path('products/<str:category>', TemplateView.as_view(template_name='index.html')),
    path('product/<int:id>', TemplateView.as_view(template_name='index.html')),
    path('cart/', TemplateView.as_view(template_name='index.html')),
    path('404', TemplateView.as_view(template_name='index.html')),
    path('<str:somme>', TemplateView.as_view(template_name='index.html'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

