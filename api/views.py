from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from django.db.models import Q

from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer


@api_view(["GET"])
def hello(request):
    return Response({
        "message": "Hello from Freebie API!"
    })


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        qs = Product.objects.select_related('category').all()

        # ?category=on-sale  or  ?category=new-arrivals  etc.
        category_slug = self.request.query_params.get('category')
        if category_slug:
            # Special virtual filter: "on-sale" = products that have old_price set
            if category_slug == 'on-sale':
                qs = qs.filter(old_price__isnull=False)
            else:
                qs = qs.filter(category__slug=category_slug)

        # ?sale=true  → only products with discount
        sale = self.request.query_params.get('sale')
        if sale == 'true':
            qs = qs.filter(old_price__isnull=False)

        # ?search=jeans
        search = self.request.query_params.get('search')
        if search:
            qs = qs.filter(
                Q(name__icontains=search) | Q(description__icontains=search)
            )

        return qs


class ProductDetailView(generics.RetrieveAPIView):
    """Получить один товар по slug"""
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer