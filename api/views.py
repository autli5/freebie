from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView

from .models import Product
from .serializers import ProductSerializer


@api_view(["GET"])
def hello(request):
    return Response({
        "message": "Hello from Freebie API!"
    })


class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer