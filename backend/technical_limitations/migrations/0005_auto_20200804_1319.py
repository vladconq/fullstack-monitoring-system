# Generated by Django 3.0.8 on 2020-08-04 10:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('technical_limitations', '0004_limitation_type_of_technological_section'),
    ]

    operations = [
        migrations.AddField(
            model_name='limitation',
            name='date_begin',
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name='limitation',
            name='date_end',
            field=models.DateField(null=True),
        ),
    ]
