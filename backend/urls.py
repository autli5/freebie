from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    
    path("api/", include("api.urls")),
    
    path("api/dress-styles/", include("dressstyle.urls")),
    
    # Добавляем reviews
    path("api/reviews/", include("reviews.urls")),

    path("api/cart/", include("cart.urls")),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )