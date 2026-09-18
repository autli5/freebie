from django.urls import path

from .views import hello, ProductListView

urlpatterns = [
    path("hello/", hello),
    path("products/", ProductListView.as_view()),
]