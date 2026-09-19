from rest_framework import serializers
from .models import Review, NewsletterSubscription


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["id", "customer_name", "rating", "comment", "verified", "created_at"]


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscription
        fields = ["email"]