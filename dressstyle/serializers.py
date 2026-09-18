from rest_framework import serializers

from .models import DressStyle


class DressStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = DressStyle
        fields = ('id', 'name', 'image')