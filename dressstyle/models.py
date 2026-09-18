from django.db import models


class DressStyle(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='dress_styles/')

    def __str__(self):
        return self.name