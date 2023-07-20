# Generated by Django 4.1.7 on 2023-04-05 02:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Collection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256)),
                ('discount_percent', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
                ('price', models.FloatField()),
                ('description', models.TextField()),
                ('available', models.BooleanField(default=True)),
                ('featured', models.BooleanField(default=False)),
                ('category', models.CharField(choices=[('CO', 'Condiments'), ('NT', 'Nuts'), ('BK', 'Bakery'), ('CD', 'Candies'), ('MK', 'Milk'), ('PK', 'Pickles')], max_length=2)),
                ('product_collection', models.ManyToManyField(blank=True, to='core.collection')),
            ],
        ),
        migrations.AddField(
            model_name='collection',
            name='collection_products',
            field=models.ManyToManyField(blank=True, to='core.product'),
        ),
    ]