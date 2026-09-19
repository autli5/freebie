from django.urls import path
from .views import ReviewListView, LatestReviewsView, NewsletterCreateView

urlpatterns = [
    path("", ReviewListView.as_view()),
    path("latest/", LatestReviewsView.as_view()),
    path("newsletter/", NewsletterCreateView.as_view()),
]