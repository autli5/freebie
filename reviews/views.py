from rest_framework import generics, status
from rest_framework.response import Response
from .models import Review, NewsletterSubscription
from .serializers import ReviewSerializer, NewsletterSerializer


class ReviewListView(generics.ListAPIView):
    """Все верифицированные отзывы"""
    queryset = Review.objects.filter(verified=True)
    serializer_class = ReviewSerializer


class LatestReviewsView(generics.ListAPIView):
    """Последние 6 отзывов для слайдера"""
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(verified=True).order_by("-created_at")[:6]


class NewsletterCreateView(generics.CreateAPIView):
    """Подписка на newsletter"""
    serializer_class = NewsletterSerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get("email")

        if not email:
            return Response(
                {"error": "Email is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if NewsletterSubscription.objects.filter(email=email).exists():
            return Response(
                {"message": "You are already subscribed!"},
                status=status.HTTP_200_OK,
            )

        serializer = self.get_serializer(data={"email": email})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(
            {"message": "Successfully subscribed to newsletter!"},
            status=status.HTTP_201_CREATED,
        )