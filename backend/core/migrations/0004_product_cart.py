# Generated by Django 4.1.7 on 2023-04-06 01:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_remove_product_product_collection_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='cart',
            field=models.BooleanField(default=False),
        ),
    ]