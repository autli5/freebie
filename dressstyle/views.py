from rest_framework import generics

from .models import DressStyle
from .serializers import DressStyleSerializer


class DressStyleListView(generics.ListAPIView):
    queryset = DressStyle.objects.all()
    serializer_class = DressStyleSerializer