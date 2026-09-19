from django.urls import path
from .views import hello, ProductListView, ProductDetailView
from reviews.views import ReviewListView, LatestReviewsView, NewsletterCreateView

urlpatterns = [
    path("hello/", hello),
    path("products/", ProductListView.as_view()),
    
    # Reviews
    path("reviews/", ReviewListView.as_view()),
    path("reviews/latest/", LatestReviewsView.as_view()),
    
    # Newsletter
    path("newsletter/", NewsletterCreateView.as_view()),

    path("products/<slug:slug>/", ProductDetailView.as_view()),  
]