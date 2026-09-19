from django.urls import path
from .views import hello, ProductListView
from reviews.views import ReviewListView, LatestReviewsView, NewsletterCreateView

urlpatterns = [
    path("hello/", hello),
    path("products/", ProductListView.as_view()),
    
    # Reviews
    path("reviews/", ReviewListView.as_view()),
    path("reviews/latest/", LatestReviewsView.as_view()),
    
    # Newsletter
    path("newsletter/", NewsletterCreateView.as_view()),
]