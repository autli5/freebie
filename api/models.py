from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='products',
    )
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, null=True, blank=True)  # <-- ДОБАВЛЕНО
    description = models.TextField(blank=True, default='')  # <-- ДОБАВЛЕНО
    image = models.ImageField(upload_to='products/')
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    old_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
    )

    @property
    def discount_percent(self):
        if self.old_price and self.old_price > self.price:
            return round(
                (self.old_price - self.price) / self.old_price * 100
            )
        return None

    @property
    def has_discount(self):
        return self.old_price is not None and self.old_price > self.price

    def save(self, *args, **kwargs):
        # Автоматически генерируем slug из имени, если он пустой
        if not self.slug:
            base_slug = slugify(self.name, allow_unicode=False)
            slug = base_slug
            counter = 1
            # Проверяем уникальность slug
            while Product.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'

    def __str__(self):
        return self.name