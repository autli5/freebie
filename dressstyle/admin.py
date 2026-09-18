from django.contrib import admin

from .models import DressStyle


@admin.register(DressStyle)
class DressStyleAdmin(admin.ModelAdmin):
    list_display = ('name', 'image')
    search_fields = ('name',)