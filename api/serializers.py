from rest_framework import serializers

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    discount_percent = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = (
            'id',
            'name',
            'slug',
            'description',
            'image',
            'rating',
            'price',
            'old_price',
            'discount_percent',
            'category',
        )