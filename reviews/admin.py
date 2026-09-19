from django.contrib import admin
from .models import Review, NewsletterSubscription


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("customer_name", "rating", "verified", "created_at")
    list_filter = ("verified", "rating", "created_at")
    search_fields = ("customer_name", "comment")
    list_editable = ("verified", "rating")


@admin.register(NewsletterSubscription)
class NewsletterSubscriptionAdmin(admin.ModelAdmin):
    list_display = ("email", "subscribed_at", "is_active")
    list_filter = ("is_active", "subscribed_at")
    search_fields = ("email",)
    readonly_fields = ("subscribed_at",)