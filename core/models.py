from django.db import models

CATEGORY_CHOICES = (
    ('co','Condiments'),
    ('nt','Nuts'),
    ('bk','Bakery'),
    ('gr','Grains'),
    ('gc','Groceries'),
    ('ch', 'Chemical Products')
)

class Product(models.Model):
    name = models.CharField(max_length=256)
    price = models.FloatField()
    Pgramos = models.FloatField(default=0)
    description = models.TextField()
    available = models.BooleanField(default=True)
    featured = models.BooleanField(default=False)
    image = models.ImageField(blank=True, null=True)
    category =  models.CharField(choices=CATEGORY_CHOICES, max_length=2)

    def __str__(self):
        return self.name


class Collection(models.Model):
    title = models.CharField(max_length=256)
    discount_percent = models.IntegerField(default=0)
    collection_products = models.ManyToManyField("Product", blank=True)
    featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title
