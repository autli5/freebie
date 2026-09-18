from django.urls import path

from .views import DressStyleListView


urlpatterns = [
    path('', DressStyleListView.as_view(), name='dressstyle-list'),
]